import { useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { ContentType } from "./Card";
import axios from "axios";

//@ts-ignore
export function CreateContentModal({ open, onClose, onSubmit }) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen m-0 p-0 fixed bg-slate-500 opacity-50 flex justify-center items-center">
          <InputComponent onClose={onClose} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}

//@ts-ignore
function InputComponent({ onClose, onSubmit }) {
  const [ContentType, setContentType] = useState("twitter" as ContentType);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    let updatedLink = link;
    if (ContentType === "youtube") {
      updatedLink = updatedLink.replace("watch?v=", "embed/");
    } else {
      updatedLink = updatedLink.replace("x.com", "twitter.com");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/content",
        {
          title: text,
          link: updatedLink,
          ContentType: ContentType,
        },
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTljMzgxMmI0YTg4OTFiZjk5ZTJlMiIsImlhdCI6MTc0NjUxODkzM30.sWfKuQMcwnYk6EV_8h31_s0YLRE_D4UOq52FoSo4B7c",
          },
        }
      );

      console.log("Content added:", res.data);

      // Call the onSubmit callback with the new content
      onSubmit(res.data);

      // Close the modal
      onClose();
    } catch (err) {
      console.error("Error in inserting content:", err);
    }
  };

  return (
    <>
      <span className="bg-gray-200 rounded-md border-gray-400 border-4">
        <div className="flex justify-end hover:cursor-pointer">
          <div onClick={onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="p-2">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            type="text"
            placeholder="text"
          />
          <br />
          <br />
          <input
            onChange={(e) => {
              setLink(e.target.value);
            }}
            type="text"
            placeholder="Link"
          />
        </div>
        <div className="flex justify-center gap-2">
          <Button
            variant="primary"
            size="md"
            text="youtube"
            onClick={() => {
              setContentType("youtube");
            }}
          />
          <Button
            variant="primary"
            size="md"
            text="twitter"
            onClick={() => {
              setContentType("twitter");
            }}
          />
        </div>
        <div className="flex justify-center pb-2">
          <Button
            variant="primary"
            size="md"
            text="submit"
            onClick={handleSubmit} // Use the handleSubmit function
          />
        </div>
      </span>
    </>
  );
}
