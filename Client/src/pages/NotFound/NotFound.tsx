import React from "react";
import notFoundImg from "../../Assets/Error-404.png";
import { Header } from "../../Components/Header/Header";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import notFoundCSS from "./NotFound.module.css"

export const NotFound = () => {

  return (
    <div className="containerBody">
      <Header title="Inicio" />

      <Sidebar />

      <div className={`content ${notFoundCSS.container}`}>
        <div>
          <img src={notFoundImg} alt="asd" />
        </div>
      </div>
      
    </div>
  );
};
