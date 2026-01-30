import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true
});

const Futura_Medium = localFont({
  src: "./fonts/futuramedium.ttf",
  display: "swap",
  variable: "--font-futura-medium",
  preload: true
});

const Ailerons = localFont({
  src: "./fonts/ailerons-typeface.otf",
  display: "swap",
  variable: "--font-ailerons",
  preload: true
});

export const metadata = {
  title: "WFconnect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"crossOrigin"} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${Futura_Medium.variable} ${Ailerons.variable}`}>
        {children}
      </body>
    </html>
  );
}
