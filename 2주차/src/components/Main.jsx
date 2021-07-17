import React from "react";
import style from "./Main.module.css";

const Main = (props) => {
  return (
    <div className={style.Main}>
      <h2>새 계정 만들기</h2>
      <h3>빠르고 쉽습니다</h3>
      <div className={style.form}>
        <div className={style.name}>
          <input type="text" placeholder="성" />
          <input type="text" placeholder="이름" />
        </div>
        <input type="text" placeholder="휴대폰 번호 또는 이메일" />
        <input type="text" placeholder="새 비밀번호" />
      </div>
      <h4>생일</h4>
      <input className={style.birth} type="date" placeholder="성" />
      <h4>성별</h4>
      <div className={style.genderSelect}>
        <input type="radio" value="man" name="gender" checked/>
        <label htmlFor="man">남성</label>
        <input type="radio" value="woman" name="gender" />
        <label htmlFor="man">여성</label>
        <input type="radio" value="select" name="gender" />
        <label htmlFor="man">직접 지정</label>
      </div>
      <p>
        가입하기 버튼을 클릭하면 Facebook의 <a href="">약관, 데이터 정책</a> 및{" "}
        <a href="">쿠키 정책에</a>
        동의하게 됩니다. Facebook으로부터 SMS 알림을 받을 수 있으며 알림은
        언제든지 옵트 아웃할 수 있습니다.
      </p>
      <button className={style.buttonStyle}>가입하기</button>
    </div>
  );
};
export default Main;
