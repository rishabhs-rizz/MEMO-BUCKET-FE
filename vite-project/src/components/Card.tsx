import { ShareIcon } from "../icons/shareicon";
import { DeleteIcon } from "../icons/deleteicon";

export type ContentType = "youtube" | "twitter";

export type CardProps = {
  id: number;
  type: ContentType;
  link: string;
  title: String;
};

export const Card = (props: CardProps) => {
  console.log("Card props", props);
  return (
    <>
      <div className="bg-gray-100 max-w-72 rounded-md shadow-md border-gray-200 border">
        <div className="flex justify-between px-2 py-2">
          <span className="text-sm font-medium bg-zinc-500 rounded-lg text-white px-1.5 ">
            {props.type === "youtube" ? "YouTube Video" : "Twitter Content"}
          </span>

          <div className="flex items-center gap-1">
            <a href={props.link} target="_blank">
              {<ShareIcon size="md" />}
            </a>
            {<DeleteIcon size="md" />}
          </div>
        </div>

        <div className="h-40">
          {props.type === "youtube" && (
            <iframe
              src={props.link
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "youtube.com/embed/")}
              //https://www.youtube.com/watch?v=Jqo1BM0TfBY&t=875s
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                width: "100%", // Make it responsive
                height: "150px", // Set a fixed height
                border: "none", // Remove border
              }}
            ></iframe>
          )}

          {props.type === "twitter" && (
            <div className="max-w-80">
              <blockquote className="twitter-tweet">
                <a href={props.link.replace("x.com", "twitter.com")}></a>
              </blockquote>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>
            </div>
          )}
        </div>
        <span className="text-sm bg-zinc-300 m-1 text-black font-bold px-1.5 rounded-md">
          {props.title}
        </span>
      </div>
    </>
  );
};
//https://www.youtube.com/watch?v=uBKIMKx9Sis&t=43s

// <iframe width="560" height="315" src="https://www.youtube.com/embed/uBKIMKx9Sis?si=McvaDhz8IWWFMUsC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>z
