import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import { SearchIcon } from "./iconComponents/SearchIcon";

interface ISearchProps {
  divClassName?: string;
  className?: string;
  onSubmit?: (any, string) => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export function Search({ className, divClassName, onSubmit, searchTerm, setSearchTerm }: ISearchProps) {
  return (
    <div className={twMerge("relative space-y-1 text-sm", divClassName)}>
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <SearchIcon className="h-6 w-6" />
      </div>
      <input
        name="search"
        className={twMerge("block w-full text-base pl-10 border border-black h-[35px] rounded-[2px]", className)}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search..."
        onKeyPress={(e) => onSubmit(e.key, searchTerm)}
        style={{ margin: 0 }}
      />
    </div>
  );
}
