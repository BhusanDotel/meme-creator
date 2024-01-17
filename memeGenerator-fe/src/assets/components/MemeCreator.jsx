import React, { useContext, useEffect, useRef } from "react";
import Nav from "./Nav";
import { StateContext } from "../context/StateContext";
import "../styles/MemeCreator.css";

function MemeCreator() {
  const { selectedMeme } = useContext(StateContext);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    image: "",
  });

  useEffect(() => {
    setMeme({ topText: "", bottomText: "", image: selectedMeme });
  }, [selectedMeme]);

  const canvasRef = useRef(null);

  function handleChange(event) {
    const _meme = { ...meme };
    _meme[event.target.name] = event.target.value;
    setMeme(_meme);
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "anonymous"; // Enable cross-origin requests for the image

    image.onload = () => {
      // Set canvas dimensions to match the image dimensions
      canvas.width = image.width;
      canvas.height = image.height;

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0);

      // Draw top text
      context.font = "2em impact, sans-serif";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textTransform = "uppercase";
      context.letterSpacing = "1px";
      context.textShadow =
        "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000, 2px 2px 5px #000";

      // Include missing CSS properties
      context.width = "80%";
      context.margin = "15px 0";

      context.fillText(meme.topText, canvas.width / 2, 40);

      // Draw bottom text
      context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      // Generate download link
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();
    };

    // Set the source of the image
    image.src = meme.image;
  }

  return (
    <main className="meme-create-root">
      <Nav />
      <div className="meme-create-container">
        <div className="input-div-root">
          <div className="input-div">
            <input
              className="top-text"
              type="text"
              placeholder="Top Text"
              value={meme.topText}
              name="topText"
              onChange={handleChange}
            />

            <input
              className="bottom-text"
              type="text"
              placeholder="Bottom Text"
              value={meme.bottomText}
              name="bottomText"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="display-div">
          <h2 className="top meme--text">{meme.topText}</h2>
          <h2 className="bottom meme--text">{meme.bottomText}</h2>
          <img className="display-image" src={`${meme.image}`} alt="" />
        </div>

        <div className="download-button">
          <button onClick={handleDownload}>Download Meme</button>
        </div>

        {/* Hidden canvas for drawing the meme */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </main>
  );
}

export default MemeCreator;
