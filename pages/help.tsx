import { Layout } from "../components/common/layoutComponents/Layout";
import { helpQuestions } from "../utils/config";
import { useRouter } from "next/router";
import { DownIcon } from "../components/common/iconComponents/DownArrowIcon";
import { Collapse } from "@mui/material";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Help() {
  const router = useRouter();
  console.log(router);
  return (
    <Layout title="Help">
      <div className="space-y-3">
        {helpQuestions.map((section, idx) => (
          <Section section={section} key={`${idx}-${section.title}`} />
        ))}
      </div>
    </Layout>
  );
}

function Section({ section }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full">
      <button className="flex items-center justify-between w-full" onClick={() => setExpanded(!expanded)}>
        <h2 className=" font-bold text-xs">{section.title}</h2>
        <DownIcon className={twMerge("", expanded && "rotate-180")} />
      </button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ol className="list-decimal	ml-4 text-xs space-y-3 mt-3">
          {section.questions.map((question, idx) => (
            <li key={idx}>{question}</li>
          ))}
        </ol>
      </Collapse>
    </div>
  );
}
