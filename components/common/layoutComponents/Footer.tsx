import { PrimaryButton } from "../Button";
import { footerNavigation } from "../../../utils/config";
import { textInputClasses } from "../Input";
import { twMerge } from "tailwind-merge";
import { Link } from "@mui/material";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 overflow-hidden sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full">
          <p className="tracking-wider ">Receive exclusive offers and product updates!</p>
          <form className="mt-4 flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className={twMerge(textInputClasses, "h-8 mr-2")}
              // className=" mr-2 h-10 appearance-none min-w-0 w-full bg-white border  rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400"
              placeholder="Enter your email"
            />
            <PrimaryButton type="submit" className="h-8">
              Subscribe
            </PrimaryButton>
          </form>
        </div>
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center divide-x mt-3" aria-label="Footer">
          {footerNavigation.main.map((item) => (
            <div key={item.name} className="px-2 py-2">
              <a href={item.href} className="text-xs text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-4 flex justify-center space-x-6">
          {footerNavigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-4 text-center text-xs">&copy; Acciopay 2020 All rights reserved.</p>
        <div className="mt-3 text-center text-gray-400">
          <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms-of-use">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
