import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Futura_Medium = localFont({
  src: "./fonts/FUTURAMEDIUM.ttf",
  display: "swap",
  variable: "--font-futura-medium",
});

const Ailerons = localFont({
  src: "./fonts/Ailerons-Typeface.otf",
  display: "swap",
  variable: "--font-ailerons",
});

export const metadata = {
  title: "WFconnect",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Futura_Medium.variable} ${Ailerons.variable}`}>
        {children}
      </body>
    </html>
  );
}
