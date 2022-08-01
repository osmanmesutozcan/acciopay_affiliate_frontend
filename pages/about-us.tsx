import { Layout } from "../components/common/layoutComponents/Layout";
import { PrimaryButton } from "../components/common/Button";

export default function AboutUs() {
  return (
    <Layout title="About us" contentClassname="p-0">
      <div className="relative h-44 bg-[url('/about-us-bg.png')] bg-cover bg-center" />

      <div className="p-4 space-y-4">
        <p>
          Acciopay is Singapore’s only card-free shopping platform built for students and beyond. Summoning the best
          things in life like a charm, Acciopay provides you with bite-sized payments of up to 24 months for the latest
          tech gadgets and more!
        </p>

        <p>All you need to do is to sign up and get verified to start making things happen.</p>

        <a href="https://acciopay.sg" target="_blank" rel="noreferrer">
          <PrimaryButton className="mt-4 w-full">Go shopping</PrimaryButton>
        </a>
      </div>
    </Layout>
  );
}
