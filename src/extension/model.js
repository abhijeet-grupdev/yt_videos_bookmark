/* global chrome */
import React from 'react';

export const PopupModel = ({ setOpenPopup, emoji, joke, bookmarkedVideos, childNode, flag }) => {
    const resetBookmarks = () => {
        chrome.runtime?.sendMessage({ action: "reset" }, (response) => {
            if (response && response.success) {
                setOpenPopup(false);
                console.log("Bookmarked data reset successfully.");
            } else {
                console.error("Failed to reset bookmarked data.");
            }
        });
    };

    return (
        <div className="w-[400px] h-[200px]  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-8">
            <div className="flex">

                <h3 className="text-xl font-semibold mb-4">Bookmark & saved</h3>

                <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setOpenPopup(false)}
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <>
                <div className="overflow-auto w-full h-[80px] ">
                    {bookmarkedVideos.map((item, index) => (
                        <div key={index} className="text-blue-400 bg-gray-200 m-1">
                            {childNode(item)}
                        </div>
                    ))}
                </div>
                <div>
                    <button
                        className="p-1.5 bg-red-400 hover:bg-red-500 text-white rounded-full font-bold"
                        onClick={resetBookmarks}
                    >
                        Reset
                    </button>
                </div>
            </>
        </div>
    );
};
