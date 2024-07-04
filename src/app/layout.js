import {  Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer/Footer";
import Banner from "@/Components/Banner/Banner";
import NavBar from "@/Components/NavBar/NavBar";
import Contact from "@/Components/Contact/Contact";
import Projects from "@/Components/Projects/Projects";
import About from "@/Components/About/About";

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
      <body className={`${inter.className} min-h-screen max-w-screen-xl mx-auto `}>
        <NavBar></NavBar>
        <Banner></Banner>
        <About></About>
        <Projects></Projects>
        <Contact></Contact>
        {children}
        <Footer></Footer>

     
      </body>
    </html>
  );
}
