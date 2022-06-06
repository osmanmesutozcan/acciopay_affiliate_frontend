import { Header } from "./Header";
import { Footer } from "./Footer";
import { twMerge } from "tailwind-merge";

interface ILayoutProps {
  children: any;
  contentClassname?: string;
  containerClassname?: string;
  back?: boolean;
  title?: string;
}

export function Layout({ children, contentClassname, back, title, containerClassname }: ILayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between max-w-screen-lg mx-auto">
      <div className={twMerge("flex flex-col flex-1", containerClassname)}>
        <Header back={back} title={title} />
        <div className={twMerge("flex flex-col flex-1 relative p-5 h-full", contentClassname)}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}
