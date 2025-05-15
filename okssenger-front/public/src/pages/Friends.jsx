import React, { useState } from "react";
import "../styles/App.css"; // 스타일 파일 import
import FriendItem from "../components/FriendItem.jsx";
import { friends } from "../data/friends";
import {
  FaSearch,
  FaUserPlus,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"; // FontAwesome 아이콘 import

function Friends() {
  const [showChannels, setShowChannels] = useState(true);
  const [showFriends, setShowFriends] = useState(true);

  return (
    <div className="main-screen">
      <header className="screen-header">
        <h3 className="screen-header__title">친구</h3>
        <div className="screen-header__icons">
          <span>
            <FaSearch size={28} />
          </span>
          <span>
            <FaUserPlus size={28} />
          </span>
          <span>
            <FaCog size={28} />
          </span>
        </div>
      </header>

      <main className="friends-screen">
        <div className="user-component">
          <div className="user-component__column">
            <img
              src="http://img.newspim.com/news/2017/01/31/1701311632536400.jpg"
              className="user-component__avatar user-component__avatar--xl"
              alt="User Avatar"
            />
            <div className="user-component__info">
              <h4 className="user-component__info-name">홍길동</h4>
              <h6 className="user-component__info-introduce">
                아버지를 아버지라 부르지 못하다니
              </h6>
            </div>
          </div>
        </div>
        <div className="friends-screen__list">
          <div
            className="friends-screen__list-header"
            onClick={() => setShowChannels((v) => !v)}
          >
            <span className="friends-screen__list-channel">채널</span>
            {showChannels ? (
              <FaChevronDown size={18} color="var(--gray-color)" />
            ) : (
              <FaChevronUp size={18} color="var(--gray-color)" />
            )}
          </div>
          {/* 채널 내용 */}
          {showChannels && (
            <div className="friends-screen__list-content">
              {/* FriendItem으로 채널 리스트도 렌더링 가능 */}
            </div>
          )}

          {/* 친구 토글 */}
          <div
            className="friends-screen__list-header"
            onClick={() => setShowFriends((v) => !v)}
          >
            <span className="friends-screen__friends-list">
              친구 {friends.length}
            </span>
            {showFriends ? (
              <FaChevronDown size={18} color="var(--gray-color)" />
            ) : (
              <FaChevronUp size={18} color="var(--gray-color)" />
            )}
          </div>

          {/* 친구 목록 */}
          {showFriends && (
            <div className="friends-screen__list-content">
              {friends.map((f) => (
                <FriendItem
                  key={f.id}
                  avatar={f.avatar}
                  name={f.name}
                  introduce={f.introduce}
                  musicTitle={f.musicTitle}
                  onClick={() => console.log("클릭:", f.name)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Friends;
