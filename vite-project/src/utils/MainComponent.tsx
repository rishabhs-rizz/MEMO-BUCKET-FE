import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card, CardProps } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import axios from "axios";
import ShareContentModal from "../components/ShareContentModal";

export function MainComponent() {
  const [CreateContentmodalOpen, SetCreateContentModalOpen] = useState(false);
  const [ShareModalOpen, SetShareModalOpen] = useState(false);
  const [contentItems, setContentItems] = useState<CardProps[]>([]);

  const token = localStorage.getItem("token") || "";
  if (!token) {
    window.location.href = "http://localhost:5173/signin";
  }

  const fetchData = async () => {
    console.log("Fetching data with token:", token);
    try {
      const response = await axios.get<{ content: CardProps[] }>(
        "http://localhost:3000/api/v1/content",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched content:", response.data.content);
      setContentItems(response.data.content); // Update state with fetched data
      console.log("Content items:", contentItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleAddContent = async () => {
    await fetchData();
  };

  return (
    <>
      <CreateContentModal
        open={CreateContentmodalOpen}
        onClose={() => {
          SetCreateContentModalOpen(false);
        }}
        onSubmit={handleAddContent}
      />

      <ShareContentModal
        open={ShareModalOpen}
        onClose={() => {
          SetShareModalOpen(false);
        }}
      />

      <div className="p-4 bg-gray-300 min-h-screen">
        <div className="pb-2 flex justify-end gap-4">
          <Button
            onClick={() => {
              SetCreateContentModalOpen(true);
            }}
            variant="primary"
            size="sm"
            text="Add content"
            startIcon={<PlusIcon size="md" />}
          ></Button>
          <Button
            onClick={() => {
              SetShareModalOpen(true);
            }}
            variant="secondary"
            size="md"
            text="Share Brain"
            startIcon={<ShareIcon size="md" />}
          ></Button>
        </div>

        {contentItems.length === 0 && (
          <div className="flex justify-center items-center w-full h-40 bg-gray-200 rounded-md border-gray-400 border-4">
            <span className="text-gray-500">No content added yet</span>
          </div>
        )}

        {contentItems.length !== 0 && (
          <div className="flex flex-wrap gap-20">
            {contentItems.map((item) => (
              <div key={item._id}>
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
    </>
  );
}
