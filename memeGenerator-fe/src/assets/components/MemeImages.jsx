import React, { useContext } from "react";
import "../styles/MemeImages.css";
import { StateContext } from "../context/StateContext";

function MemeImages() {
  const { memeData, setSelectedMeme } = useContext(StateContext);
  const renderArray = memeData.map((meme, index) => {
    return (
      <div
        onClick={() => {
          setSelectedMeme(meme.url);
        }}
        key={index}
        className="memes-img-container"
      >
        <img className="meme-image" src={meme.url} alt="" />;
      </div>
    );
  });

  return <div className="images-container">{renderArray}</div>;
}

export default MemeImages;
