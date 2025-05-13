import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // 1) 사용자 조회
  const [rows] = await db.execute(
    "SELECT user_id, username, password FROM users WHERE username = ?",
    [username]
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "가입되지 않은 이름입니다." });
  }
  const user = rows[0];

  // 2) 비밀번호 확인
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  // 3) JWT 생성
  const payload = { userId: user.user_id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });

  // 4) 응답
  res.json({
    message: "로그인 성공",
    token, // 클라이언트 저장용 토큰
    user: {
      user_id: user.user_id,
      username: user.username,
    },
  });
});

export default router;
