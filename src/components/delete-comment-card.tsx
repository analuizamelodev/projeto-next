"use client";

import { useState } from "react";
import { deleteByIdComment } from "@/src/services/comment-service";
import type { Comment } from "@/src/app/types/type-comment";

interface Props {
    comment: Comment;
    onDelete: () => void;
}

export default function DeleteComment({ comment, onDelete }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await deleteByIdComment(comment.id);
        setLoading(false);
        onDelete();
    };

    return (
        <button
            className="text-xs text-white hover:text-purple-600 transition-colors font-medium px-2 py-1 rounded-lg"
            onClick={handleDelete}
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}