import * as React from "react";
import { styled } from "@mui/material/styles";
import MUITabs from "@mui/material/Tabs";
import MUITab from "@mui/material/Tab";
interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

export const Tabs = styled(MUITabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiTabs-scroller": {
    height: 34,
  },
  width: "100%",
  height: 34,
}));

export const Tab = styled((props: StyledTabProps) => <MUITab disableRipple {...props} />)(({ theme }) => ({
  textTransform: "none",
  width: 90,
  minHeight: 0,
  margin: "auto",
  padding: 0,
  fontSize: 16,
  fontWeight: theme.typography.fontWeightRegular,
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "Montserrat",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#000000",
    fontWeight: 700,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className="relative flex-1"
    >
      {value === index && children}
    </div>
  );
}
