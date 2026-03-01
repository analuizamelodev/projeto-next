"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/src/libs/api";
import { get } from "http";
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

export function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getPublications();
        console.log(response);
        setPublications(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      {publications.map((publication) => (
        <div key={publication.id}>
          <h2>{publication.title}</h2>
          <p>{publication.content}</p>
          <p>Created at: {publication.createdAt}</p>
          <p>Updated at: {publication.updatedAt}</p>
          <p>Author: {publication.author.name}</p>
        </div>
      ))}
    </div>
  );
}
