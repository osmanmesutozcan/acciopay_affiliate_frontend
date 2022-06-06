import useSWR from "swr";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import cloneDeep from "lodash/cloneDeep";

import Drawer from "@mui/material/Drawer";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { ISpecsAttribute } from "../../utils/schema";
import { Loading } from "../common/layoutComponents/Loading";
import { StyledSlider } from "../common/Slider";
import { ColorRadioButton, RadioButton } from "../common/Button";
import { useAsync } from "react-use";
import { CloseIcon } from "../common/iconComponents/CloseIcon";
import { groupBy, uniqBy } from "lodash";

interface ISortFilterDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sortOrFilter: "sort" | "filter";
  page: "search" | "category";
  attributes?: ISpecsAttribute[];
  // title: string;
  // price: string;
  // image: string;
  // variants: IVariant<T>[];
}

export function SortFilterDrawer({ open, setOpen, sortOrFilter, page, attributes }: ISortFilterDrawerProps) {
  return (
    <Drawer className="big-paper" anchor={"right"} open={open} onClose={(e) => setOpen(false)}>
      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
        <div className="px-4 sm:px-6">
          <div className="flex relative items-start justify-between">
            <div />

            <h3 className="absolute left-1/2 transform -translate-x-1/2 text-gray-900 font-bold">
              {sortOrFilter === "sort" ? "Sort" : "Shop by"}
            </h3>

            <div className="flex h-7 items-center relative">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close panel</span>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-4 sm:px-6">
            {sortOrFilter === "sort" ? (
              <Sort setOpen={setOpen} page={page} />
            ) : (
              <Filter attributes={attributes} page={page} />
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

const sortValues = [
  {
    id: "newest",
    name: "Newest first",
    query: { order: "desc", sort: "new" },
  },
  {
    id: "low-to-high",
    name: "Price: low to high",
    query: { order: "asc", sort: "price" },
  },
  {
    id: "high-to-low",
    name: "Prices: high to low",
    query: { order: "desc", sort: "price" },
  },
  {
    id: "most-popular",
    name: "Most popular",
    query: { order: "desc", sort: "product_id" },
  },
  {
    id: "a-z",
    name: "A to Z",
    query: { order: "desc", sort: "name" },
  },
  {
    id: "z-a",
    name: "Z to A",
    query: { order: "asc", sort: "name" },
  },
];

function Sort({ setOpen, page }) {
  const router = useRouter();
  const { sort = "", order = "" } = router.query;

  async function handleSort(param: { order?: string; sort?: string }) {
    await router.replace(
      {
        pathname: page === "search" ? "/search" : "/[category]",
        query: {
          ...router.query,
          ...param,
        },
      },
      undefined,
      { shallow: true }
    );
    setOpen(false);
  }

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">Sort options</legend>
      <div className="space-y-4">
        {sortValues.map((sortItem) => (
          <div key={sortItem.id} className="flex items-center">
            <input
              id={`sort_item_${sortItem.id}`}
              name="notification-method"
              type="radio"
              checked={sortItem.query.sort === sort && sortItem.query.order === order}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              onClick={() => handleSort(sortItem.query)}
            />
            <label htmlFor={`sort_item_${sortItem.id}`} className="ml-3 block text-gray-700">
              {sortItem.name}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function Filter({ page, attributes }: { page: "search" | "category"; attributes: ISpecsAttribute[] }) {
  const router = useRouter();
  const [value, setValue] = useState(((router.query?.price as string)?.split(",") as any[]) ?? [0, 10000]);

  const onSliderChange = (val) => {
    return router.replace(
      {
        pathname: page === "search" ? "/search" : "/[category]",
        query: {
          ...router.query,
          price: `${val[0]},${val[1]}`,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useAsync(async () => {
    await onSliderChange(value);
  }, [value]);

  function isCurrentFilter(filterCategory: string, option: string | string[]) {
    const queryParams = router.query[filterCategory] as string;
    return Array.isArray(option)
      ? option.every((o) => queryParams?.split(",").includes(o))
      : queryParams?.split(",").includes(option);
  }

  function handleCheckbox(filterCategory: string, option: string | string[], checked?: boolean) {
    const newQueryParams = cloneDeep(router.query);
    const values = newQueryParams[filterCategory] as string; // comma separated values.

    // option unchecked.
    if (!checked && newQueryParams[filterCategory]) {
      const newValues = values.split(",").filter((v) => (Array.isArray(option) ? !option.includes(v) : v !== option));

      if (!newValues.length) {
        delete newQueryParams[filterCategory];
      } else {
        newQueryParams[filterCategory] = Array.from(new Set(newValues)).join(",");
      }
    }

    // first option of its category.
    else if (checked && !newQueryParams[filterCategory]) {
      newQueryParams[filterCategory] = option;

      // addition to existing category.
    } else {
      const newValues = values.split(",").concat(Array.isArray(option) ? option : [option]);
      console.log(newValues);
      newQueryParams[filterCategory] = Array.from(new Set(newValues)).join(",");
    }

    return router.replace(
      {
        pathname: page === "search" ? "/search" : "/[category]",
        query: newQueryParams,
      },
      undefined,
      { shallow: true }
    );
  }

  if (!attributes) {
    return <Loading />;
  }

  const colorAttributes = attributes.find((attr) => attr.code === "color") || ({} as any);
  const colors = groupBy(colorAttributes.options, "swatch_value");

  return (
    <div>
      <div>
        <fieldset className="mt-2 mb-8" key="price">
          <legend>Price</legend>
          <StyledSlider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={(e, value) => setValue(value as any)}
            min={0}
            max={10000}
          />
          <div className="flex items-center justify-between w-full">
            <input
              className="w-2/6 text-base border border-black h-[35px] rounded-[2px]"
              id="price-range-min"
              type="number"
              value={value[0]}
              onChange={(e) => setValue([Number(e.target.value), value[1]])}
            />
            <span>to</span>
            <input
              className="w-2/6 text-base border border-black h-[35px] rounded-[2px]"
              id="price-range-max"
              type="number"
              value={value[1]}
              onChange={(e) => setValue([value[0], Number(e.target.value)])}
            />
          </div>
        </fieldset>
      </div>

      {attributes.map((category) =>
        category.options.length > 0 ? (
          <fieldset className="mt-4" key={category.code}>
            <legend>{category.name}</legend>
            <div className="mt-2 flex items-center flex-wrap">
              {category.swatch_type === "color"
                ? Object.keys(colors).map((option) => (
                    <FormControlLabel
                      key={option}
                      value={colors[option].map((opt) => opt.id).join(",")}
                      checked={isCurrentFilter(
                        category.code,
                        colors[option].map((opt) => String(opt.id))
                      )}
                      onChange={(e: any, checked: boolean) =>
                        handleCheckbox(
                          category.code,
                          colors[option].map((opt) => String(opt.id)),
                          checked
                        )
                      }
                      label={null}
                      sx={{ margin: 0, marginRight: "10px" }}
                      control={
                        <Checkbox
                          checkedIcon={<ColorRadioButton state="checked" color={option} />}
                          icon={<ColorRadioButton state="unchecked" color={option} />}
                          sx={{ padding: 0, marginBottom: 2 }}
                        />
                      }
                    />
                  ))
                : category.options?.map((option) => (
                    <FormControlLabel
                      key={option.label}
                      value={option.id}
                      checked={isCurrentFilter(category.code, String(option.id))}
                      onChange={(e: any, checked: boolean) => handleCheckbox(category.code, String(option.id), checked)}
                      label={null}
                      sx={{ margin: 0, marginRight: "10px" }}
                      control={
                        <Checkbox
                          checkedIcon={<RadioButton state="checked" label={option.label} />}
                          icon={<RadioButton state="unchecked" label={option.label} />}
                          sx={{ padding: 0, marginBottom: 2 }}
                        />
                      }
                    />
                  ))}
            </div>
          </fieldset>
        ) : null
      )}
    </div>
  );
}
