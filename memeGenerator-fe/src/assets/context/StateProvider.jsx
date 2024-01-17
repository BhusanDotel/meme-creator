import React, { useEffect, useState } from "react";
import axios from "axios";
import { StateContext } from "./StateContext";

export const StateProvider = (props) => {
  const [memeData, setMemeData] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(
    "https://i.imgflip.com/1ur9b0.jpg"
  );

  useEffect(() => {
    async function getMemeData() {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      let _memeData = [];
      if (response) {
        const memes = response.data.data.memes;
        memes.forEach((meme) => {
          _memeData.push({ id: meme.id, name: meme.name, url: meme.url });
        });
        setMemeData(_memeData);
      }
    }
    getMemeData();
  }, []);
  return (
    <StateContext.Provider
      value={{
        memeData,
        selectedMeme,
        setSelectedMeme,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
