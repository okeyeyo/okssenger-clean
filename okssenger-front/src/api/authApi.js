/**
 * 로그인 요청을 보내고, 받은 JWT 토큰을 localStorage에 저장합니다.
 * @param {string} username – 예: "홍길동"
 * @param {string} password – 예: "honghong8282"
 * @returns {Promise<object>} – { message, token, user } 같은 응답 바디
 */
export async function login(username, password) {
  const res = await fetch("/api/auth/login", {
    // ← 여기를 수정
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "로그인에 실패했습니다.");
  }

  localStorage.setItem("jwt", data.token);
  return data;
}

/**
 * 저장된 토큰을 꺼내고 싶을 때 쓰는 헬퍼
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem("jwt");
}
