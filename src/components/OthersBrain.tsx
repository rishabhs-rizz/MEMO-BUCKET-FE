import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardProps } from "./Card";

export const OthersBrain = () => {
  const { shareLink } = useParams<{ shareLink: string }>();
  const [viewingContentItems, setViewingContentItems] = useState<CardProps[]>(
    []
  );
  const [name, setName] = useState("Unknown User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shareLink) return;

    console.log("Fetching shared brain from link:", shareLink);
    setLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/brain/${shareLink}`)
      .then((res) => {
        const data = res.data as { content: CardProps[]; username?: string };
        console.log("Shared brain fetched successfully:", data);
        setViewingContentItems(data.content);
        setName(data.username || "Unknown User");
      })
      .catch((err) => {
        console.error("Error fetching shared brain:", err);
        setError("Failed to fetch shared brain. Please try again later.");
      })
      .then(() => {
        setLoading(false);
      });
  }, [shareLink]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Brain of <span className="text-violet-600">{name}</span>
        </h1>
        <p className="text-gray-900 text-sm">
          Shared discoveries, inspirations, and bookmarks
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-lg text-gray-500">
          Loading brain content...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
          {error}
        </div>
      ) : viewingContentItems.length === 0 ? (
        <div className="flex justify-center items-center h-64 text-gray-500">
          No content found in this brain.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {viewingContentItems.map((item) => (
            <div key={item._id} className="break-inside-avoid mb-4 w-full">
              <Card
                _id={item._id}
                ContentType={item.ContentType}
                link={item.link}
                title={item.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
