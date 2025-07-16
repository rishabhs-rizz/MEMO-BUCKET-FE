import { useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { ContentType } from "./Card";
import axios from "axios";

//@ts-ignore
export function CreateContentModal({ open, onClose, onSubmit }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative">
            <InputComponent onClose={onClose} onSubmit={onSubmit} />
          </div>
        </div>
      )}
    </>
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
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/v1/content",
        {
          title: text,
          link: updatedLink,
          ContentType: ContentType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Content added:", res.data);
      onSubmit(res.data);
      onClose();
    } catch (err) {
      console.error("Error in inserting content:", err);
    }
  };

  return (
    <>
      <div className="absolute top-4 right-4 cursor-pointer" onClick={onClose}>
        <CloseIcon />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Add New Content
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Enter Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-center gap-4">
          <Button
            variant="primary"
            size="md"
            text="YouTube"
            onClick={() => {
              setContentType("youtube");
              return ContentType;
            }}
          />
          <Button
            variant="primary"
            size="md"
            text="Twitter"
            onClick={() => {
              setContentType("twitter");
              return ContentType;
            }}
          />
        </div>

        <div className="flex justify-center pt-2">
          <Button
            variant="primary"
            size="md"
            text="Submit"
            onClick={() => {
              handleSubmit;
              return "submit";
            }}
          />
        </div>
      </div>
    </>
  );
}
