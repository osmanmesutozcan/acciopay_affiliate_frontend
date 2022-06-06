/* This example requires Tailwind CSS v2.0+ */
import { useRouter } from "next/router";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";

import Step from "@mui/material/Step";
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";

const steps = [
  { id: 1, label: "Singpass Verification", key: "verify-singpass" },
  { id: 2, label: "Upload student matriculation card", key: "upload-matriculation-card" },
  { id: 3, label: "Submit email address", key: "email-address" },
  { id: 4, label: "Face verification", key: "verify-identity" },
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  // [`& .${stepConnectorClasses.line}`]: {
  //   borderColor:
  //     theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
  //   borderTopWidth: 3,
  //   borderRadius: 1,
  // },
}));

const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  borderRadius: "50%",
  display: "flex",
  height: 34,
  width: 34,
  border: !(ownerState.active || ownerState.completed) && "1px solid black",
  backgroundColor: ownerState.active || ownerState.completed ? theme.palette.primary.main : "#fff",
  justifyContent: "center",
  alignItems: "center",
  color: ownerState.active || ownerState.completed ? "#fff" : "#000",
}));

const QontoStepLabel = styled(StepLabel)`
  & .${stepLabelClasses.alternativeLabel} {
    margin-top: 6px !important;
  }

  & .${stepLabelClasses.label} {
    margin-top: 6px !important;
  }
`;

function StepIcon(props: any) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {props.icon}
    </QontoStepIconRoot>
  );
}

export function Steps({ stepKey }: { stepKey: string }) {
  const router = useRouter();

  const step = steps.find((s) => stepKey === s.key);

  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <Stepper activeStep={1} alternativeLabel connector={<QontoConnector />}>
        {steps.map((_step) => (
          <Step key={_step.id} active={stepKey === _step.key} completed={_step.id < step?.id || _step.id === 1}>
            <QontoStepLabel StepIconComponent={StepIcon}>
              <p className={`text-[10px] leading-tight ${_step.id > step?.id ? "text-gray-300" : "text-gray-500"}`}>
                {_step.label}
              </p>
            </QontoStepLabel>
          </Step>
        ))}
      </Stepper>

      <button onClick={() => router.push("/")} className="text-sm underline mt-12">
        Skip,I’ll verify later
      </button>
    </div>
  );
}
