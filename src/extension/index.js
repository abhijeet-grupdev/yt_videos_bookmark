/*global chrome*/
import React, { useEffect, useState } from "react";
import { PopupModel } from "./model";

const Extension = () => {
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [bookmarkPopup,setBookmarkPopup] = useState(false);

  useEffect(() => {
    chrome.storage?.local.get(["bookmarkedVideos"], (result) => {
      const videoList = result.bookmarkedVideos || [];
      setBookmarkedVideos(videoList);
    });
  }, []);

  const openUrl = (e) => {
    e.preventDefault();
    const targetUrl = e.target.href;
    chrome.tabs.update({ url: targetUrl });
  };

  const childNode = (ele) => (
    <div className="yt-video-url" key={ele.url}>
      <a href={ele.url} onClick={openUrl}>{ele.title}</a>
    </div>
  );

  const bookmarkVideo = () => {
    chrome.runtime?.sendMessage({ action: "bookmark" }, (response) => {
      setBookmarkedVideos([...bookmarkedVideos, response]);
    });
  };

  return (
    <div className="text-center">
      <h1 className="p-3 text-[18px] text-[#9f76f3]  font-bold drop-shadow-sm">
        You tube video bookmark extension
      </h1>
      <div className="flex gap-3 flex-wrap">
        <button id="yt-save-btn"  className="bg-[#5c8984] text-white p-2 h-[25%] rounded-full" onClick={()=>{
          bookmarkVideo();
          setBookmarkPopup(true);
        }}>
          Bookmark
          </button>
      </div>
      {bookmarkPopup && <PopupModel setOpenPopup={setBookmarkPopup} bookmarkedVideos={bookmarkedVideos} childNode={childNode}  />}
    </div>
  );
};

export default Extension;