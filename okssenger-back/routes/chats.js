import express from "express";
import { db } from "../db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET /api/chats/:friendName
router.get("/:friendName", auth, async (req, res) => {
  const meId = req.userId;
  const { friendName } = req.params;

  // 1) 친구(username) → user_id 조회
  const [users] = await db.execute(
    "SELECT user_id FROM users WHERE username = ?",
    [friendName]
  );
  if (users.length === 0) {
    return res.status(404).json({ message: "친구를 찾을 수 없습니다." });
  }
  const friendId = users[0].user_id;

  // 2) 두 사람 간 채팅 내역 조회
  const [rows] = await db.execute(
    `SELECT
       c.chat_id,
       c.sender_id,
       c.receiver_id,
       c.message,
       c.created_at,
       u.username AS sender_name
     FROM chats c
     JOIN users u ON c.sender_id = u.user_id
     WHERE (c.sender_id = ? AND c.receiver_id = ?)
        OR (c.sender_id = ? AND c.receiver_id = ?)
     ORDER BY c.created_at ASC`,
    [meId, friendId, friendId, meId]
  );

  res.json(rows);
});

// POST /api/chats/:friendName
router.post("/:friendName", auth, async (req, res) => {
  const meId = req.userId;
  const { friendName } = req.params;
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "메시지를 입력하세요." });
  }

  // 친구 user_id 조회
  const [users] = await db.execute(
    "SELECT user_id FROM users WHERE username = ?",
    [friendName]
  );
  if (users.length === 0) {
    return res.status(404).json({ message: "친구를 찾을 수 없습니다." });
  }
  const friendId = users[0].user_id;

  // 메시지 삽입
  const [result] = await db.execute(
    "INSERT INTO chats (sender_id, receiver_id, message) VALUES (?, ?, ?)",
    [meId, friendId, message]
  );

  // 새로 저장된 채팅 정보 응답
  res.status(201).json({
    chat_id: result.insertId,
    sender_id: meId,
    receiver_id: friendId,
    message,
    created_at: new Date(),
  });
});

export default router;
