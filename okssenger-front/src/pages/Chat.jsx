// src/pages/Chat.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchChats, postChat } from "../api/chatApi.js";

export default function Chat() {
  const { user } = useParams(); // URL 파라미터로 받은 친구 이름
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");

  // 화면에 들어올 때 + user가 바뀔 때마다 채팅 내역 불러오기
  useEffect(() => {
    fetchChats(user).then(setMsgs).catch(console.error);
  }, [user]);

  const send = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      const newChat = await postChat(user, input);
      setMsgs((m) => [...m, { ...newChat, sender_name: "Me" }]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-screen_top">
        <span className="chat-friend_name">{user}</span>
      </div>
      <ul>
        {msgs.map((m) => (
          <li key={m.chat_id}>
            <strong>{m.sender_name}</strong>: {m.message}
          </li>
        ))}
      </ul>
      <form onSubmit={send}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
