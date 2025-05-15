import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi.js";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // FontAwesome 아이콘 import
import "../styles/App.css"; // 스타일 파일 import

export default function LoginPage() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const [passwordType, setPasswordType] = useState("password");
  const [iconClass, setIconClass] = useState("eye"); // 'eye' 상태로 초기화
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // 로그인 성공 시 친구 페이지로 이동
      navigate("/friends");
    } catch (err) {
      console.error(err);
    }
  };

  // 비밀번호 타입 토글
  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
    setIconClass(
      (prevClass) => (prevClass === "eye" ? "eye-slash" : "eye") // 상태를 'eye' / 'eye-slash'로 관리
    );
  };

  return (
    <main className="login-box">
      <header className="welcom-header">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          className="welcom-header__logo"
          alt="Logo"
        />
        <h1 className="welcom-header__title">옥신저</h1>
      </header>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form__input">
          <span className="login-form__input__icon">
            <FaUser size={20} color="#a58164" />
          </span>
          <input
            name="username"
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-form__input">
          <span className="login-form__input__icon">
            <FaLock size={20} color="#a58164" />
          </span>
          <input
            name="password"
            type={passwordType} // 비밀번호 타입을 상태로 관리
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-form__password">
            <span
              className="toggle-password"
              style={{ color: "#a58164", cursor: "pointer" }}
              onClick={togglePassword}
            >
              {/* 조건부 렌더링으로 아이콘 변경 */}
              {iconClass === "eye" ? (
                <FaEye size={20} />
              ) : (
                <FaEyeSlash size={20} />
              )}
            </span>
          </div>
        </div>

        <input className="login-form__btn" type="submit" value="로그인" />
        <div className="login-form__a">
          <a href="#">회원가입</a>
          <a href="#">비밀번호 찾기</a>
        </div>
      </form>
    </main>
  );
}
