import Link from 'next/link';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '/start-petition', label: 'Start a petition' },
  { href: '/my-petitions', label: 'My petitions' },
  { href: '/browse', label: 'Browse' },
];

export const Navigation = () => {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-6">
        {/* Logo */}
        <div className="flex-shrink-0 mr-10">
          <Link href="/" className="flex items-center">
            {/* <Image src="/logo.png" alt="ChangeDAO Logo" width={90} height={90} /> */}
            <span className="ml-2 text-xl font-semibold text-gray-700 hover:text-gray-900">ChangeDAO</span>
          </Link>
        </div>

        {/* Navigation Links with Auto Spacing */}
        <div className="flex-grow flex justify-end items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}

          {/* Wallet Button with Extra Spacing */}
          <button
            className="ml-8 px-5 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => console.log('Connect wallet')}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};