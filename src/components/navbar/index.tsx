import Image from 'next/image';
import Link from 'next/link';

export default function Navbar(): JSX.Element {
  return (
    <nav className="py-6 flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.svg" width={40} height={40} priority alt="logo" />
      </Link>
    </nav>
  );
}
