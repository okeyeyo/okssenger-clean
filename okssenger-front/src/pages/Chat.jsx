// src/pages/Chat.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchChats, postChat } from "../api/chatApi.js";
import { FaArrowUp } from "react-icons/fa"; // FontAwesome 아이콘 import

export default function Chat() {
  const { user } = useParams(); // URL 파라미터로 받은 친구 이름
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");

  // 화면에 들어올 때 + user가 바뀔 때마다 채팅 내역 불러오기
  useEffect(() => {
    fetchChats(user).then(setMsgs).catch(console.error);
  }, [user]);

  // 메시지 전송 함수
  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const newChat = await postChat(user, text);
      setMsgs((prev) => [...prev, { ...newChat, sender_name: "Me" }]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-screen">
      <div className="chat-screen_top">
        <span className="chat-friend_name">{user}</span>
      </div>
      <div className="chat-screen_body">
        <ul>
          {msgs.map((m) => (
            <li key={m.chat_id} className="chat-screen_body__sender">
              <span>{m.sender_name}</span>
              <span>{m.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-send">
        <input
          className="chat-send__comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=" 메시지 입력"
        />

        {/* 전송 아이콘: span + role/button으로 접근성 확보 */}
        <span
          className="chat-send__trans"
          role="button"
          tabIndex={0}
          onClick={handleSend}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          aria-label="메시지 전송"
        >
          전송
        </span>
      </div>
    </div>
  );
}
