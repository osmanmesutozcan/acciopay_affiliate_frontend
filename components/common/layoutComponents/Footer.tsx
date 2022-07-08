import Link from "next/link";
import { footerNavigation } from "../../../utils/config";

export function Footer() {
  return (
    <footer className="bg-gray-detail w-full max-w-7xl mx-auto font-bold">
      <div className="px-10 py-8 overflow-hidden sm:px-6 lg:px-8 flex flex-col items-center">
        <nav className="flex flex-wrap justify-center space-x-5" aria-label="Footer">
          {footerNavigation.main.map((item) => (
            <a href={item.href} key={item.name} className="text-3xs text-white">
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-6 flex justify-center space-x-6">
          {footerNavigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-3xs text-white">Acciopay &copy; 2022</p>

        <div className="mt-6 text-center text-white text-3xs divide-x">
          {footerNavigation.legal.map((item) => (
            <Link href={item.href} key={item.href}>
              <a className="text-white text-3xs px-4">{item.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
