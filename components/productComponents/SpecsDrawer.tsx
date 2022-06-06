import { Dispatch, SetStateAction, useState, MouseEvent } from "react";

import { Image } from "../common/Image";
import { ISpecsAttribute, IVariant } from "../../utils/schema";
import { useRouter } from "next/router";
import { Drawer, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import cloneDeep from "lodash/cloneDeep";
import { RadioButton } from "../common/Button";
import { CloseIcon } from "../common/iconComponents/CloseIcon";
import Skeleton from "@mui/material/Skeleton";

interface ISpecsDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  attributes: ISpecsAttribute[];
  title: string;
  price: string;
  image: string;
  variants: IVariant[];
}

export function SpecsDrawer({ open, setOpen, attributes, title, price, image, variants }: ISpecsDrawerProps) {
  const router = useRouter();
  const specs = router.query;

  function attributeIsAttachedToProduct(variants, attribute, code) {
    //
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)} PaperProps={{ style: { height: "50%" } }}>
      <div className="flex flex-col py-4 px-3 sm:px-6">
        <div className="flex items-start justify-end">
          <button
            type="button"
            className="rounded-md bg-white text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close panel</span>
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-end text-lg font-medium text-gray-900">
          <Image src={image} alt={title} divClassName="h-20 w-20 mr-6" />
          <div>
            <p className="text-2xl font-bold">
              {price}
              <span className="text-xs font-normal">/mo</span>
            </p>
            <h2 className="font-normal">{title}</h2>
          </div>
        </div>

        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-4 sm:px-6">
            {attributes ? (
              attributes
                .filter((a) => a.type === "select")
                .map((attribute) => (
                  <div key={attribute.id}>
                    <GroupSelect attribute={attribute} variants={variants} />
                  </div>
                ))
            ) : (
              <Skeleton variant="rectangular" height={200} />
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

interface ISpecGroup {
  attribute: ISpecsAttribute;
  variants: IVariant[];
}

function GroupSelect({ attribute, variants }: ISpecGroup) {
  const router = useRouter();
  const [value, setValue] = useState(null);

  function onGroupChange(value: string | number) {
    setValue(value);
    return router.replace({
      pathname: "/product/[productId]",
      query: { ...router.query, [attribute.code]: value },
    });
  }

  function handleDeselect(e: MouseEvent<HTMLLabelElement>, id: number) {
    if (Number(router.query[attribute.code]) !== id) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    const q = cloneDeep(router.query);
    delete q[attribute.code];

    return router.replace({
      pathname: "/product/[productId]",
      query: q,
    });
  }

  const enabledVariants = new Set(
    variants
      .filter((v) => {
        if (!v.in_stock) {
          return false;
        }

        const attributesToCheck = Object.keys(v.map).filter(
          (attrib) => attrib !== attribute.code && router.query[attrib]
        );

        if (!attributesToCheck) {
          return true;
        }

        return attributesToCheck.every((a) => v.map[a] === Number(router.query[a]));
      })
      .map((v) => v.map[attribute.code])
  );

  const specsInStock = new Set(variants.map((v) => v.map[attribute.code]));

  return (
    <FormControl>
      <FormLabel id={attribute.name} className="block font-bold text-black">
        {attribute.name}
      </FormLabel>

      <RadioGroup value={value} onChange={(e, value) => onGroupChange(value)}>
        <div className="mt-2 flex items-center flex-wrap">
          {attribute.options
            .filter((o) => variants.some((v) => v.map[attribute.code] === o.id))
            .map((option) => (
              <div className="ml-2" key={option.label}>
                <FormControlLabel
                  value={option.id}
                  checked={Number(router.query[attribute.code]) === option.id}
                  onClick={(e) => handleDeselect(e, option.id)}
                  control={
                    <Radio
                      checkedIcon={
                        <RadioButton
                          state="checked"
                          disabled={!specsInStock.has(option.id) || !enabledVariants.has(option.id)}
                          label={option.label}
                        />
                      }
                      icon={
                        <RadioButton
                          state="unchecked"
                          disabled={!specsInStock.has(option.id) || !enabledVariants.has(option.id)}
                          label={option.label}
                        />
                      }
                      sx={{
                        padding: 0,
                        marginBottom: 2,
                      }}
                    />
                  }
                  label={null}
                  disabled={!specsInStock.has(option.id) || !enabledVariants.has(option.id)}
                  sx={{ margin: 0 }}
                />
              </div>
            ))}
        </div>
      </RadioGroup>
    </FormControl>
  );
}
