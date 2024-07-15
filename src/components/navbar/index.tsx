import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="py-6 flex justify-between items-center">
      <Link href="/">
        <h1>HOME</h1>
      </Link>
    </nav>
  );
}
