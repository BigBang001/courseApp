import "@/app/globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="py-24 md:py-28">{children}</div>
      </body>
    </html>
  );
}
