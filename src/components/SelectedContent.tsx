import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardProps } from "./Card";
import { Sidebar } from "./Sidebar";

export default function SelectedContent() {
  const [SelectedContent, setSelectedContent] = useState<CardProps[]>([]);
  const { ContentType } = useParams<{ ContentType: string }>();
  const [SidebarOpen, SetSidebarOpen] = useState(true);
  console.log("ContentType:", ContentType);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchSelectedCards = async () => {
    if (!ContentType) {
      setError("Content type is required.");
      setLoading(false);
      return;
    }
    console.log("Fetching content for type:", ContentType);
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/brain/content/" + ContentType,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data as { content: CardProps[] };
      setSelectedContent(data.content);
      setError(null);
    } catch (error) {
      console.error("Error fetching content:", error);
      setError("Failed to fetch content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedCards();
  }, [ContentType]);

  return (
    <div className="flex h-screen">
      <Sidebar SidebarOpen={SidebarOpen} SetSidebarOpen={SetSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Here are your{" "}
              <span className="text-violet-600">
                {ContentType == "twitter" ? ContentType : "youtube"} Bookmarks
              </span>
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 text-lg text-gray-500">
              Loading brain content...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
              {error}
            </div>
          ) : SelectedContent.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-500">
              You have not bookmarked any {ContentType} content yet.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {SelectedContent.map((item) => (
                <div key={item._id} className="break-inside-avoid mb-4 w-full">
                  <Card
                    _id={item._id}
                    ContentType={item.ContentType}
                    link={item.link}
                    title={item.title}
                    onDelete={(id) => {
                      setSelectedContent((prevItems) =>
                        prevItems.filter((i) => i._id !== id)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
