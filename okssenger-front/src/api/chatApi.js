// 채팅 내역 불러오기
export async function fetchChats(friendName) {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`/api/chats/${encodeURIComponent(friendName)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("채팅 내역 불러오기 실패");
  }
  return res.json();
}

// 새 메시지 전송하기
export async function postChat(friendName, message) {
  const token = localStorage.getItem("jwt");
  const res = await fetch(`/api/chats/${encodeURIComponent(friendName)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    throw new Error("메시지 전송 실패");
  }
  return res.json();
}
