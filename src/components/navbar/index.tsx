import Link from 'next/link';

export default function Navbar(): JSX.Element {
  return (
    <nav className="py-6 flex justify-between items-center">
      <Link href="/">
        <h1>HOME</h1>
      </Link>
    </nav>
  );
}
