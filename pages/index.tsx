import { Layout } from "../components/common/layoutComponents/Layout";
import { PrimaryButton } from "../components/common/Button";
import { accioPayEmail, affiliateProgram } from "../utils/config";
import { useRouter } from "next/router";

export default function AffiliateProgram() {
  const router = useRouter();

  return (
    <Layout title="Affiliate program" contentClassname="px-0">
      <div className="relative">
        <div className="relative h-72 bg-[url('/affiliate.png')] bg-cover bg-center">
          <img src="affiliate-blob1.png" alt="Affiliate program blob" className="absolute left-0 top-0" />
          <img src="affiliate-blob2.png" alt="Affiliate program blob" className="absolute right-0 bottom-0" />
          <div className="absolute bg-gradient-to-b from-black/5 to-black/60 w-full h-full" />
        </div>
        <div className="absolute top-0 w-full flex flex-col items-center justify-center h-full mx-auto">
          <h2
            className="text-4xl font-light text-white text-center mb-6"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            Join our
            <br />
            Student affiliate Program
          </h2>
          <PrimaryButton onClick={() => router.push("/affiliate/description")} className="w-56">
            Sign up now
          </PrimaryButton>
        </div>
      </div>
      <div className="p-5 space-y-6">
        {affiliateProgram.perks.map((perk) => (
          <PerkItem item={perk} key={perk.title} />
        ))}
      </div>
      <div className="bg-gray-light p-5">
        <h3 className="font-bold mb-5 text-xl">{affiliateProgram.thingsToDo.title}</h3>
        <ul className="list-disc text-xs px-5 space-y-5">
          {affiliateProgram.thingsToDo.list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="p-5 space-y-6">
        {affiliateProgram.terms.map((perk) => (
          <TermItem item={perk} key={perk.title} />
        ))}
      </div>
      <div className="bg-gray-light p-5 flex flex-col items-center text-center space-y-6 text-xs">
        {/*<h3 className="font-bold">{affiliateProgram.qrCode.title}</h3>*/}
        {/*<img src={affiliateProgram.qrCode.image} alt={affiliateProgram.qrCode.title} className="h-22 w-22" />*/}
        If you have any questions, please write to{" "}
        <a href={`mailto:${accioPayEmail.hello}`} className="font-bold text-primary">
          {accioPayEmail.hello}
        </a>{" "}
        and we will get back to you as soon as possible
      </div>
      {/*<div className="p-5 flex flex-col items-center text-center space-y-6">*/}
      {/*  <h3>Your Fellow Student Affiliates</h3>*/}
      {/*  <div className="space-y-4">*/}
      {/*    {affiliateProgram.affiliateStudents.map((student, idx) => (*/}
      {/*      <StudentTestimony student={student} key={idx} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Layout>
  );
}

function PerkItem({ item }: { item: { title: string; description: string; icon: string } }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <img src={item.icon} alt={item.title} className="h-10 w-10" />
      <h3 className="text-primary font-bold">{item.title}</h3>
      <p className="text-black text-center">{item.description}</p>
    </div>
  );
}

function TermItem({ item }: { item: { title: string; description: string; icon: string } }) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <img src={item.icon} alt={item.title} className="h-20 w-20" />
      <h3 className="font-bold">{item.title}</h3>
      <p className="text-black text-center">{item.description}</p>
    </div>
  );
}

function StudentTestimony({
  student,
}: {
  student: { name: string; image: string; institution: string; testimony: string };
}) {
  return (
    <div className="flex bg-gray-light h-20">
      <img src={student.image} className="h-20 w-16 object-cover mr-2" />
      <div className="p-2">
        <div className="flex items-end justify-between mb-2">
          <h4 className="text-xs font-bold">{student.name}</h4>
          <span className="text-3xs text-gray-text">{student.institution}</span>
        </div>
        <p className="text-3xs text-left">{student.testimony}</p>
      </div>
    </div>
  );
}
