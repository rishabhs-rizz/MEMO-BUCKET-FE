import { DeleteIcon } from "../icons/deleteicon";
import { useEffect, useState } from "react";
import axios from "axios";
import { GotoLinkIcon } from "../icons/GotoLink";

export type ContentType = "youtube" | "twitter";

export type CardProps = {
  _id: number;
  ContentType: ContentType;
  link: string;
  title: string;
  onDelete?: (id: number) => void;
};

export const Card = (props: CardProps) => {
  const [delButtonClicked, setDelButtonClicked] = useState(false);

  useEffect(() => {
    if (props.ContentType === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [props.ContentType, props.link]);

  async function DelCard() {
    console.log("Delete content with ID:", props._id);
    try {
      const response = await axios.request({
        url: "http://localhost:3000/api/v1/content",
        method: "DELETE",
        data: { contentId: props._id },
      });
      console.log("Content deleted successfully:", response.data);
      if (props.onDelete) props.onDelete(props._id);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  }

  function getYoutubeVideoId(url: string): string | null {
    const pattern =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const matches = url.match(pattern);
    return matches ? matches[1] : null;
  }

  const videoId =
    props.ContentType === "youtube" ? getYoutubeVideoId(props.link) : null;

  return (
    <>
      <div className="relative inline-block w-full bg-zinc-900 text-white rounded-xl overflow-hidden shadow-lg border border-zinc-700 transition-transform hover:scale-105 hover:shadow-2xl">
        <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-700 bg-zinc-800">
          <span className="text-xs font-semibold bg-blue-600 text-white rounded-full px-2 py-0.5">
            {props.ContentType === "youtube" ? "YouTube Video" : "Twitter Post"}
          </span>
          <div className="flex items-center space-x-2">
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              <GotoLinkIcon size="md" />
            </a>
            <span
              onClick={() => setDelButtonClicked(true)}
              className="cursor-pointer"
            >
              <DeleteIcon size="md" />
            </span>
          </div>
        </div>

        <div className="p-3 space-y-2">
          {props.ContentType === "youtube" && videoId && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden border border-zinc-700">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          )}

          {props.ContentType === "twitter" && (
            <div className="max-w-full rounded-md overflow-hidden border border-zinc-700">
              <blockquote className="twitter-tweet" data-theme="dark">
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}

          <p className="text-sm font-semibold text-zinc-300">{props.title}</p>
        </div>
      </div>

      {delButtonClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative animate-fade-in">
            <div className="text-center">
              <p className="text-lg font-semibold mb-4 text-gray-800">
                Are you sure you want to delete this content?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    DelCard();
                    setDelButtonClicked(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDelButtonClicked(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
