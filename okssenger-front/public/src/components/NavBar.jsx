import React from "react";
import { Link } from "react-router-dom"; // react-router-dom Link
import { FaUser, FaComment, FaShoppingCart, FaEllipsisH } from "react-icons/fa";
import "../styles/App.css"; // CSS 파일 경로

export default function NavBar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__btn">
          <Link className="nav__link" to="/friends">
            <FaUser size={30} />
          </Link>
        </li>
        <li className="nav__btn">
          <Link className="nav__link" to="/chats">
            <span className="nav__notification badge">1</span>
            <FaComment size={30} />
          </Link>
        </li>
        <li className="nav__btn">
          <Link className="nav__link" to="/shopping">
            <FaShoppingCart size={30} />
          </Link>
        </li>
        <li className="nav__btn">
          <Link className="nav__link" to="/more">
            <FaEllipsisH size={30} />
            <div className="dot"></div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
