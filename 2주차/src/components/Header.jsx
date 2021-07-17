import React from "react";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.Header}>
      <div className={style.box}>
        <h1 className={style.title}>facebook</h1>
        <button className={style.button}>기존 계정으로 로그인</button>
      </div>
    </div>
  );
};
export default Header;
