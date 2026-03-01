import Link from "next/link";

export function Header() {
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Next.js App</h1>

        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-gray-400 transition">
                log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
