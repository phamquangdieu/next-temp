import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href='/glass-card'>Glass card</Link>
      <Link href='/fall-leaves'>Fall leaves</Link>
    </div>
  );
}
