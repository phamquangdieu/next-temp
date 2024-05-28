import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href='/glass-card'>Glass card</Link>
      <Link href='/fall-leaves'>Fall leaves</Link>
      <Link href='/heart-move'>Heart Move</Link>
      <Link href='/horizontal-scroll'>Horizontal</Link>
      <Link href='/horizontal-scroll-2'>Horizontal 2</Link>
      <Link href='/menu-scroll'>Menu scroll</Link>
      <Link href='/split-text'>Split Text</Link>
    </div>
  );
}
