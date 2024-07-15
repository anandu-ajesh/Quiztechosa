import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/session";
import { ThemeProvider } from "@/theme";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz app",
  description: "Generated by techosa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Provider>{children}<Toaster position="top-center"/></Provider>
        </ThemeProvider>
        </body>
    </html>
  );
}
