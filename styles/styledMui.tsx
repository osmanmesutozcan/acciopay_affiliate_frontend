import { InputBase, styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiSelect": {
    padding: "0",
  },
  "& .MuiInputBase-input": {
    marginLeft: "4px",
    position: "relative",
    backgroundColor: "none",
    border: "none",
    fontSize: 12,
    textDecoration: "underline",
    fontWeight: "bold",
    padding: "0",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "&:focus": {
      borderRadius: 0,
      borderColor: "#80bdff",
      boxShadow: "none",
    },
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "12px 8px",
  fontSize: 12,
  fontFamily: "Montserrat",
  [`&.${tableCellClasses.head}`]: {
    color: "#979797",
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
