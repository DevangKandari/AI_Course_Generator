import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};
function ChapterContent({ chapter, content }) {
  console.log(content);
  return (
    <div className="p-10">
      <h2 className="font-medium text-2xl">{chapter?.chapterName}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      <div className="flex justify-center my-6">
        <YouTube videoid={content?.videoid} opts={opts} />
      </div>

      <div>
        {content?.content?.sections?.map((item, index) => (
          <div key={index} className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className="font-medium text-lg">{item.title}</h2>
            {<ReactMarkdown>{item?.explanation}</ReactMarkdown>}
            {item.codeExample && (
              <div className="p-4 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChapterContent;
