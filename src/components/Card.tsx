// import { ShareIcon } from "../icons/shareicon";
// import { DeleteIcon } from "../icons/deleteicon";
// import { useEffect } from "react";

// export type ContentType = "youtube" | "twitter";

// export type CardProps = {
//   _id: number;
//   ContentType: ContentType;
//   link: string;
//   title: String;
// };

// export const Card = (props: CardProps) => {
//   useEffect(() => {
//     const embed = getYoutubeEmbedCode(props.link);
//     if (props.ContentType === "twitter") {
//       const script = document.createElement("script");
//       script.src = "https://platform.twitter.com/widgets.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, [props.ContentType]);

//   function getYoutubeEmbedCode(url: string): string {
//     const pattern =
//       /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
//     const matches = url.match(pattern);

//     if (matches && matches[1]) {
//       return `<iframe src="https://www.youtube.com/embed/${matches[1]}" frameborder="0" title="YouTube video player"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               style={{
//                 width: "100%",
//                 height: "150px",
//                 border: "none",
//               }} allowfullscreen></iframe>`;
//     }

//     return "Invalid YouTube URL";
//   }

//   return (
//     <div className="inline-block w-full bg-zinc-900 text-white rounded-xl overflow-hidden shadow-lg border border-zinc-700 transition-transform hover:scale-105 hover:shadow-2xl">
//       <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-700 bg-zinc-800">
//         <span className="text-xs font-semibold bg-blue-600 text-white rounded-full px-2 py-0.5">
//           {props.ContentType === "youtube" ? "YouTube Video" : "Twitter Post"}
//         </span>
//         <div className="flex items-center space-x-2">
//           <a href={props.link} target="_blank" rel="noopener noreferrer">
//             <ShareIcon size="md" />
//           </a>
//           <DeleteIcon size="md" />
//         </div>
//       </div>

//       <div className="p-3 space-y-2">
//         {props.ContentType === "youtube" && (
//           <>
//             <span
//               // src={props.link
//               //   .replace("watch?v=", "embed/")
//               //   .replace("youtu.be/", "youtube.com/embed/")}
//               // //https://www.youtube.com/watch?v=Jqo1BM0TfBY&t=875s
//               // //https://youtu.be/xwFgddaaBXs?si=cQjZ5Rc8fFu64mEH
//               // //"https://www.youtube.com/embed/xwFgddaaBXs?si=Z9RQwt77YlKrGm0R"
//               // title="YouTube video player"
//               // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               // referrerPolicy="strict-origin-when-cross-origin"
//               // allowFullScreen
//               // style={{
//               //   width: "100%",
//               //   height: "150px",
//               //   border: "none",
//               // }}
//             ></span>
//             <span className="text-sm bg-zinc-300 m-2 text-black font-bold px-1.5 rounded-md">
//               {props.title}
//             </span>
//           </>
//         )}

//         {props.ContentType === "twitter" && (
//           <div className="max-w-full rounded-md overflow-hidden border border-zinc-700">
//             <blockquote className="twitter-tweet" data-theme="dark">
//               <a href={props.link.replace("x.com", "twitter.com")}></a>
//             </blockquote>
//           </div>
//         )}

//         <p className="text-sm font-semibold text-zinc-300">{props.title}</p>
//       </div>
//     </div>
//   );
// };

import { ShareIcon } from "../icons/shareicon";
import { DeleteIcon } from "../icons/deleteicon";
import { useEffect } from "react";

export type ContentType = "youtube" | "twitter";

export type CardProps = {
  _id: number;
  ContentType: ContentType;
  link: string;
  title: string;
};

export const Card = (props: CardProps) => {
  useEffect(() => {
    if (props.ContentType === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [props.ContentType, props.link]);

  function getYoutubeVideoId(url: string): string | null {
    const pattern =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    const matches = url.match(pattern);
    return matches ? matches[1] : null;
  }

  const videoId =
    props.ContentType === "youtube" ? getYoutubeVideoId(props.link) : null;

  return (
    <div className="inline-block w-full bg-zinc-900 text-white rounded-xl overflow-hidden shadow-lg border border-zinc-700 transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-700 bg-zinc-800">
        <span className="text-xs font-semibold bg-blue-600 text-white rounded-full px-2 py-0.5">
          {props.ContentType === "youtube" ? "YouTube Video" : "Twitter Post"}
        </span>
        <div className="flex items-center space-x-2">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <ShareIcon size="md" />
          </a>
          <DeleteIcon size="md" />
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
  );
};
