import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaComment, FaCog } from "react-icons/fa"; // FontAwesome 아이콘 import
import "../styles/App.css"; // 스타일 파일 import

export default function ChatsPage() {
  return (
    <div className="main-screen">
      <header className="screen-header">
        <h3 className="screen-header__title">친구</h3>
        <div className="screen-header__icons">
          <span>
            <FaSearch size={28} />
          </span>
          <span>
            <FaComment size={28} />
          </span>
          <span>
            <FaCog size={28} />
          </span>
        </div>
      </header>

      <main>
        <Link
          className="link"
          to={`/chat/${encodeURIComponent("坂本太郎")}`}
        >
          <div className="user-component">
            <div className="user-component__column">
              <img
                src="https://data.onnada.com/character/202503/thumb_1994052142_31a1e082__main1.png"
                className="user-component__avatar  user-component__avatar--sm"
                alt="User Avatar"
              />
              <div className="user-component__info">
                <h4 className="user-component__info-name">坂本太郎</h4>
                <h6 className="user-component__introduce">
                  キムさん、お誕生日おめでとうございます。
                </h6>
              </div>
            </div>
            <div className="user-component__column user-component__alarm">
              <span className="user-component__time">07:57</span>
              <div className="badge">1</div>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}
