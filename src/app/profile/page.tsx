"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/src/components/proflie-card";
import PublicationsById from "@/src/components/get-all-publications-by-id-card";
import CreatePublication from "@/src/components/create-publication-card";
import { getPublicationsById } from "@/src/services/publication-service";
import { useAuth } from "@/src/app/context";
import type { Publication } from "../types/type-publication";

export default function PostsPage() {
  const { user } = useAuth();

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPublications = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const response = await getPublicationsById(Number(user.id));

      setPublications(response);
    } catch (error) {
      console.error("Error loading publications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, [user?.id]);

  // 🔥 agora atualiza lista quando cria post
  const handleCreate = async () => {
    await fetchPublications();
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-black text-white">
      <div className="w-full max-w-2xl px-4 space-y-4 mt-6">

        <ProfileCard />

        <CreatePublication onCreate={handleCreate} />

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <PublicationsById publications={publications} />
        )}

      </div>
    </div>
  );
}