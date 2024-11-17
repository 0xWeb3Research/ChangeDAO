import Link from 'next/link';
import { FooterSection } from '../types';

const footerSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About' },
      { href: '#', label: 'Impact' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Team' },
    ],
  },
  {
    title: 'Community',
    links: [
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Community Guidelines' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '#', label: 'Help' },
      { href: '#', label: 'Guides' },
      { href: '#', label: 'Privacy' },
      { href: '#', label: 'Terms' },
      { href: '#', label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { href: '#', label: 'Twitter' },
      { href: '#', label: 'Facebook' },
      { href: '#', label: 'Instagram' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t mt-32 py-12 px-4 text-gray-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href="#" className="hover:text-red-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};