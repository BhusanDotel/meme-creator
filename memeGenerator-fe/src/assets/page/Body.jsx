import React from "react";
import MemeImages from "../components/MemeImages";
import MemeCreator from "../components/MemeCreator";
import "../styles/Body.css";

function Body() {
  return (
    <div className="body-root">
      <MemeImages />
      <MemeCreator />
    </div>
  );
}

export default Body;
