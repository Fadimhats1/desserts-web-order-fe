import type { Metadata } from "next";
import "./globals.css";
import ProductContextProvider from "@/context/ActiveContextProvider";

export const metadata: Metadata = {
  title: "Product List",
  description: "Product Food List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProductContextProvider>
          {children}
        </ProductContextProvider>
      </body>
    </html>
  );
}
