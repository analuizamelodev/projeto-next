import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen space-y-4">
      <div>
        <img src="/404.png" />
      </div>
      <div className="text-white font-bold">
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
