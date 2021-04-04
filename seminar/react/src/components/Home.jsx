import React from "react";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home">
      <img
        className="homeImg"
        src="https://cdn.pixabay.com/photo/2017/11/26/16/36/landscape-2979296_960_720.jpg"
        alt="home"
      />
      <h1 className="homeTitle">Hello world</h1>
    </div>
  );
};

export default Home;
