import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card, CardProps } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/shareicon";
import axios from "axios";

export function MainComponent() {
  const [modalOpen, SetModalOpen] = useState(false);
  const [contentItems, setContentItems] = useState<CardProps[]>([]); // Use state for content items

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ content: CardProps[] }>(
          "http://localhost:3000/api/v1/content",
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTljMzgxMmI0YTg4OTFiZjk5ZTJlMiIsImlhdCI6MTc0NjUxODkzM30.sWfKuQMcwnYk6EV_8h31_s0YLRE_D4UOq52FoSo4B7c",
            },
          }
        );
        console.log("Fetched content:", response.data.content);
        setContentItems(response.data.content); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  const handleAddContent = (newContent: CardProps) => {
    setContentItems((prevItems) => [...prevItems, newContent]);
    console.log("all content items", contentItems);
    console.log("new content", newContent);
  };

  return (
    <>
      <CreateContentModal
        open={modalOpen}
        onClose={() => {
          SetModalOpen(false);
        }}
        onSubmit={handleAddContent}
      />

      <div className="h-screen p-4 bg-gray-100">
        <div className="pb-2 flex justify-end gap-4">
          <Button
            onClick={() => {
              SetModalOpen(true);
            }}
            variant="primary"
            size="sm"
            text="Add content"
            startIcon={<PlusIcon size="md" />}
          ></Button>
          <Button
            onClick={() => {
              SetModalOpen(true);
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
          <div className="flex gap-4">
            {contentItems.map((item) => (
              <div key={item.id}>
                <Card
                  id={item.id}
                  type={item.type}
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
