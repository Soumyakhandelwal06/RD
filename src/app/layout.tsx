import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RD Classes — Bank, SSC & Railway Exam Coaching in Ajmer",
  description:
    "Ajmer's trusted coaching institute for Bank (SBI PO, IBPS), SSC (CGL, CHSL, MTS, GD, JE), and Railway (NTPC, Group D, ALP, RPF) exams. Expert faculty, structured courses, regular mock tests. Book a free demo class today.",
  keywords: [
    "RD Classes Ajmer",
    "SSC coaching Ajmer",
    "Bank exam coaching Ajmer",
    "Railway exam coaching Ajmer",
    "IBPS coaching",
    "SBI PO coaching",
    "SSC CGL coaching",
    "government job coaching Ajmer",
    "Adda247 associate partner",
  ],
  authors: [{ name: "RD Classes" }],
  openGraph: {
    title: "RD Classes — Bank, SSC & Railway Exam Coaching in Ajmer",
    description:
      "Ajmer's trusted coaching for Bank, SSC & Railway exams. Expert faculty led by Rakesh Sir. Structured courses, mock tests & doubt-clearing sessions.",
    type: "website",
    locale: "en_IN",
    siteName: "RD Classes",
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
              name: "RD Classes",
              description:
                "Ajmer's trusted coaching institute for Bank, SSC & Railway government exams",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Shanti Pura, Vaishali Road, Opposite Mansingh Hotel, LIC Colony",
                addressLocality: "Ajmer",
                addressRegion: "Rajasthan",
                postalCode: "305001",
                addressCountry: "IN",
              },
              telephone: "+91 8005678034",
              email: "info@rdclasses.in",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
