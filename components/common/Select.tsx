/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, SetStateAction } from "react";
import { Select as MuiSelect, MenuItem, createTheme, ThemeProvider, InputBase } from "@mui/material";
import { twMerge } from "tailwind-merge";
import { DownIcon } from "./iconComponents/DownArrowIcon";
import { styled } from "@mui/material/styles";
import * as React from "react";

interface ISelectProps {
  label?: string;
  after?: string;
  options: any[];
  selected: string | number;
  width?: string;
  height?: string;
  className?: string;
  maxAllowed?: number;
  placeholder?: string;
  setSelected: (selected: any) => void | Promise<void>;
}

export function Select({
  label,
  after,
  options,
  selected,
  setSelected,
  width = "w-17",
  height = "h-9",
  className,
  maxAllowed,
  placeholder,
}: ISelectProps) {
  return (
    <div>
      <label htmlFor="months" className="text-xs">
        {label}
      </label>
      <div className="h-9 flex items-end">
        <MuiSelect
          labelId="months"
          id="months"
          renderValue={(value) => (!value ? placeholder : options.find((op) => op.option === value).label)}
          value={selected}
          onChange={(e: any) => setSelected(e.target.value)}
          className={twMerge("rounded-sm border-1 border-black relative font-light", width, height, className)}
          classes={{ select: "border-black" }}
          IconComponent={() => <DownIcon className="absolute right-2 h-4 w-4 pointer-events-none" />}
        >
          {options?.map((count) => (
            <MenuItem value={count.option} key={count.id} disabled={maxAllowed < Number(count.option)}>
              {count.label}
            </MenuItem>
          ))}
        </MuiSelect>
        <span className="ml-2 text-xs">{after}</span>
      </div>
    </div>
  );
}
