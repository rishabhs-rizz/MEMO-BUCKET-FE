// ShareBrain.tsx
import { useState } from "react";
import axios from "axios";

//@ts-ignore
export default function ShareContentModal({ open, onClose }) {
  return <>{open && <ShareContentComponent onClose={onClose} />}</>;
}

//@ts-ignore
function ShareContentComponent({ onClose }) {
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem("token");
  const handleCopy = () => {
    const input = document.createElement("input");
    input.value = link || "";
    document.body.appendChild(input);
    input.select();
    navigator.clipboard.writeText(input.value);
    alert("Link copied to clipboard!");
    document.body.removeChild(input);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleShareToggle = async () => {
    setLoading(true);
    if (!token) {
      alert("Please log in to share your brain.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post<{ link?: string }>(
        "http://localhost:3000/api/v1/brain/share",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.link) {
        const fullLink = `${window.location.origin}/brain/${response.data.link}`;
        setLink(fullLink);
        console.log("Link created:", fullLink);
      } else {
        setLink(null);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Share Brain</h2>

        {link ? (
          <>
            <p className="text-sm text-gray-700 mb-2">
              Here is your shareable link:
            </p>
            <input
              type="text"
              readOnly
              value={link}
              className="w-full border border-gray-300 px-3 py-2 rounded mb-3 text-sm"
            />
            <div className="flex justify-between items-center space-x-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-md text-gray-700 mb-4">
              You haven't shared your brain yet.
            </p>
            <button
              onClick={handleShareToggle}
              disabled={loading}
              className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700 transition"
            >
              Create Share Link
            </button>
            <div></div>
            <button className="border-black border text-black px-6 py-2 rounded hover:bg-violet-600 hover:text-white transition m-4">
              See Others Brain
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
