import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascend Academy — Engineering Tomorrow's Winners | Premier Coaching Centre",
  description:
    "Kerala's premium coaching centre for State Syllabus, CBSE & Entrance Exams (NEET/KEAM/JEE). 1330+ A+ students, 98% result rate, 15+ years of excellence. Book a free demo class today.",
  keywords: [
    "coaching centre Kerala",
    "NEET coaching",
    "KEAM coaching",
    "CBSE tuition",
    "State syllabus coaching",
    "Kochi coaching centre",
    "best coaching institute Kerala",
  ],
  authors: [{ name: "Ascend Academy" }],
  openGraph: {
    title: "Ascend Academy — Engineering Tomorrow's Winners",
    description:
      "Kerala's premium coaching centre. 1330+ A+ students, 98% result rate. NEET, KEAM, JEE, CBSE & State Board.",
    type: "website",
    locale: "en_IN",
    siteName: "Ascend Academy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Clash Display from Fontshare */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Ascend Academy",
              description:
                "Kerala's premium coaching centre for State Syllabus, CBSE & Entrance Exams",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kochi",
                addressRegion: "Kerala",
                addressCountry: "IN",
              },
              telephone: "+91 98765 43210",
              email: "info@ascendacademy.in",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
