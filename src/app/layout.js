import { Fahkwang, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/NavBar/NavBar";
import Footer from "@/Components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Developer Saif",
  description: "This is saif. Im a MERN Stack developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <head>
      <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body className={`${inter.className} min-h-screen`}>
        <NavBar></NavBar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
