import { Dispatch, ReactComponentElement, SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { PrimaryButton } from "./Button";

interface IAlertProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string | ReactComponentElement<any>;
  button: ReactComponentElement<any>;
}

export function Alert({ open, setOpen, text, button }: IAlertProps) {
  return (
    <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "#fff",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 text-sm">
          {text}

          {button}
        </div>
      </Box>
    </Modal>
  );
}
