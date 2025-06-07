'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 p-6">
      <Link href="/" className="block">
        <Image
          src="/mi_nombre.svg"
          alt="Portfolio Logo"
          width={120}
          height={40}
          className="hover:opacity-80 transition-opacity duration-300"
        />
      </Link>
    </header>
  );
} 