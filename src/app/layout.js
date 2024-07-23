import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/userProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home:Logo Detector",
  description: "This app can identify any brand by its logo",
  icons: {
    icon: "/gemini.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dim">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
