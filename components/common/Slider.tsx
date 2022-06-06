import * as React from "react";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { backgroundColor } from "../../utils/config";

interface Props {
  children: React.ReactElement;
  value: number;
}

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: backgroundColor,
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    color: theme.palette.primary.main,
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    boxShadow: "2px 2px 7px rgba(91, 89, 100, 0.3)",

    // border: "2px solid currentColor",
    // "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
    //   boxShadow: "inherit",
    // },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-rail": {
    color: backgroundColor,
    opacity: 1,
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    boxShadow: "2px 2px 7px rgba(91, 89, 100, 0.3)",
    borderRadius: "50% 50% 50% 0",
    backgroundColor: backgroundColor,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));
