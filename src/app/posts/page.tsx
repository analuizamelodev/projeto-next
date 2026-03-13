"use client";

import Header from "@/src/components/header";
import Publications from "@/src/components/publications";
import SearchUsers from "@/src/components/search-users";

export default function PostsPage() {
  return (
    <div>
      <Header />
      <SearchUsers />
      <br />
      <Publications />
    </div>
  );
}
