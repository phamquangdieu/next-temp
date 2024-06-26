import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Col, Row } from "antd";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const data = [
  {
    link: '/glass-card',
    title: 'Glass card'
  },
  {
    link: '/fall-leaves',
    title: 'Fall leaves'
  },
  {
    link: '/heart-move',
    title: 'Hearts Move'
  },
  {
    link: '/horizontal-scroll',
    title: 'Horizontal Scroll'
  },
  {
    link: '/horizontal-scroll-2',
    title: 'Horizontal Scroll 2',
  },
  {
    link: '/menu-scroll',
    title: 'Menu Scroll',
  },
  {
    link: '/split-text',
    title: 'Splite Text',
  },
  {
    link: '/observer-1',
    title: 'Observer 1',
  },
  {
    link: '/observer-2',
    title: 'Observer 2',
  },
  {
    link: '/timeline-1',
    title: 'Timeline 1',
  },
  {
    link: '/opener-text',
    title: 'Opener Text',
  },
  {
    link: '/scroll-zoom',
    title: 'Scroll Zoom',
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></Script>
      {/* <Script src="/test.js" type="text/javascript"></Script> */}
      {/* <Script src="/test2.js" type="text/javascript"></Script>  */}
      <body className={inter.className}>
        {children}
        {/* <div className="bg-blue-900 text-white p-12">
          <Row gutter={[32, 32]}>
            {data.map(item => (
              <Col span={6} key={item.link}>
                <Link  href={item.link} className="text-lg">{item.title}</Link>
              </Col>
            ))}
          </Row>
        </div> */}
      </body>
    </html>
  );
}
