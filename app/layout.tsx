import { FCMInitializer } from "@/components/FCMInitializer";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
           <FCMInitializer />
            <Toaster position="top-right" richColors />
           {children}</QueryProvider>
      </body>
    </html>
  );
}