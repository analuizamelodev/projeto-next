"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/src/libs/api";

type User = {
  id: number;
  name: string;
  username?: string;
};

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await apiClient.get("/users", {
          params: { search: query },
          signal: controller.signal,
        });

        setUsers(response.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full border rounded-lg p-2"
      />

      <div className="mt-4 space-y-2">
        {loading && <p className="text-sm text-gray-500">Searching...</p>}

        {users.map((user) => (
          <div
            key={user.id}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <p className="font-medium">{user.name}</p>
            {user.username && (
              <p className="text-xs text-gray-500">@{user.username}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
