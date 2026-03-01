import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-black flex flex-col items-center justify-center h-screen space-y-4">
      <div>
        <img src="/404.png" alt="page not found" />
      </div>
      <div>
        <h1 className="text-white text-3xl font-bold">Page Not Found</h1>
      </div>
      <div className="text-white font-bold">
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
