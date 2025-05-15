import React from "react";
import PropTypes from "prop-types";
import { FaPlayCircle } from "react-icons/fa";

FriendItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  introduce: PropTypes.string,
  musicTitle: PropTypes.string, // 음악 URL
  onClick: PropTypes.func,
};

FriendItem.defaultProps = {
  introduce: "",
  musicTitle: null,
  onClick: () => {},
};

export default function FriendItem({
  avatar,
  name,
  introduce,
  musicTitle,
  onClick,
}) {
  return (
    <div className="user-component" onClick={onClick}>
      <div className="user-component__column">
        <img
          src={avatar}
          className="user-component__avatar user-component__avatar--sm"
          alt={`${name} Avatar`}
        />
        <div className="user-component__text">
          <div className="user-component__info">
            <h4 className="user-component__info-name">{name}</h4>
            <h6 className="user-component__info-introduce">{introduce}</h6>
          </div>
          <div className="user-component__music">
            {musicTitle && (
              <div className="user-component__music-title">
                {musicTitle}
                <FaPlayCircle color="#d65838" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="user-component__column">{/* 추가 UI */}</div>
    </div>
  );
}
