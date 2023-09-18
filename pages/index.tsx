import Link from "next/link";

export default function Home() {
  return (
    <ul>
        <li><Link href="/borrow">Borrow</Link></li>
        <li><Link href="/borrow/collateral">Collateral</Link></li>
        <li><Link href="/claim">Claim</Link></li>
    </ul>
  );
}
