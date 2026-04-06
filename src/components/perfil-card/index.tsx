"use client";

import { useAuth } from "@/src/app/context";

export default function PerfilCard() {
    const { user } = useAuth();

    return (
        <div className="w-full max-w-md bg-black text-white overflow-hidden border border-purple-900 rounded-2xl ">
            <div className="h-24 bg-zinc-800 w-full" />
            <div className="px-4 pb-6">
                <div className="flex justify-between items-end -mt-10 mb-3">
                    <div className="w-20 h-20 rounded-full border-4 border-black bg-white flex items-center justify-center text-2xl font-bold text-black">
                        {user?.name?.charAt(0) || "A"}
                    </div>
                    <button className="border border-zinc-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-zinc-900 transition-colors">
                        Edit profile
                    </button>
                </div>
                <div className="space-y-3">
                    <div>
                        <h2 className="text-xl font-bold leading-tight">{user?.name || "Nome do Usuário"}</h2>
                        <p className="text-zinc-500 text-sm">@{user?.name?.toLowerCase().replace(/\s/g, "") || "user"}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <p><span className="font-bold">1</span> <span className="text-zinc-500">Following</span></p>
                        <p><span className="font-bold">1</span> <span className="text-zinc-500">Follower</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}