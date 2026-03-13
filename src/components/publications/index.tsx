"use client";

import { useEffect, useState } from "react";
import Comments from "../comments";
import { getPublications } from "@/src/services/publication-service";

type Publication = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
  };
};

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [openComments, setOpenComments] = useState<number | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getPublications();
        setPublications(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 px-4">
      {publications.map((publication) => (
        <div
          key={publication.id}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Avatar fake */}
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                {publication.author.name.charAt(0)}
              </div>

              <span className="text-sm font-semibold text-gray-700">
                {publication.author.name}
              </span>
            </div>

            <span className="text-xs text-gray-400">
              {new Date(publication.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {publication.title}
          </h3>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed mb-4">
            {publication.content}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-xs text-gray-400">
            <button
              onClick={() =>
                setOpenComments(
                  openComments === publication.id ? null : publication.id,
                )
              }
              className="text-gray-500 hover:text-blue-500"
            >
              {openComments === publication.id
                ? "Close comments"
                : "Open comments"}
            </button>

            <span>
              Updated on{" "}
              {new Date(publication.updatedAt).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {/* Comments */}
          {openComments === publication.id && (
            <div className="mt-4 border-t pt-4">
              <Comments publicationId={publication.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
