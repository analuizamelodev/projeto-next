"use client";

import { useState } from "react";
import { useAuth } from "@/src/app/context";
import type { Publication } from "@/src/app/types/type-publication";
import Comments from "./get-all-comments-card";
import UpdatePublication from "./update-publication-card";
import DeletePublication from "./delete-publication-card";

type PublicationsProps = {
  publications: Publication[];
};

type PublicationCardProps = {
  publication: Publication;
};

export default function Publications({ publications }: PublicationsProps) {
  return (
    <div className="mx-auto flex flex-col gap-4 w-full">
      {[...publications]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
    </div>
  );
}

function PublicationCard({ publication }: PublicationCardProps) {
  const { user } = useAuth();
  const [openComments, setOpenComments] = useState<Publication["id"] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [localPublication, setLocalPublication] = useState<Publication>(publication);

  const isAuthor = user?.id === publication.author.id;

  const handleClose = (updatedTitle: Publication["title"], updatedContent: Publication["content"]) => {
    setLocalPublication((prev) => ({
      ...prev,
      title: updatedTitle,
      content: updatedContent,
      updatedAt: new Date().toISOString(),
    }));
    setIsEditing(false);
  };

  if (isDeleted) return null;

  return (
    <div className="bg-black rounded-2xl border border-purple-900 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            {localPublication.author.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-white">
            {localPublication.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAuthor && (
            <>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-xs text-white hover:text-purple-600 transition-colors font-medium px-2 py-1 rounded-lg"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <DeletePublication
                publication={localPublication}
                onDelete={() => setIsDeleted(true)}
              />
            </>
          )}
          <span className="text-xs text-white">
            {new Date(localPublication.createdAt).toLocaleDateString("en-US")}
          </span>
        </div>
      </div>

      {isEditing ? (
        <UpdatePublication publication={localPublication} onClose={handleClose} />
      ) : (
        <>
          <h3 className="text-lg font-bold text-white mb-2">
            {localPublication.title}
          </h3>
          <p className="text-white leading-relaxed mb-4">
            {localPublication.content}
          </p>
        </>
      )}

      <div className="flex justify-between items-center text-xs text-white mt-2">
        <button
          onClick={() =>
            setOpenComments(openComments === localPublication.id ? null : localPublication.id)
          }
          className="text-white font-medium hover:text-purple-600 transition-colors"
        >
          {openComments === localPublication.id ? "Close comments" : "Open Comment"}
        </button>
        <span>
          Updated on {new Date(localPublication.updatedAt).toLocaleDateString("en-US")}
        </span>
      </div>

      {openComments === localPublication.id && (
        <Comments publication={localPublication} />
      )}
    </div>
  );
}