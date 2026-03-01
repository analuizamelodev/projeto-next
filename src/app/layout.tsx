import "./globals.css";

import { AuthProvider } from "./context";

export const metadata = {
  title: "Home - My Next.js App",
  description: "Welcome to my Next.js app!",
  openGraph: {
    title: "Home - My Next.js App",
    description: "Welcome to my Next.js app!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
