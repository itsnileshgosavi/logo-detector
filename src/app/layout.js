import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home:Logo Detector",
  description: "This app can identify any brand by its logo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dim">
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
