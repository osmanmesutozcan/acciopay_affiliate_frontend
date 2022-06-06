import { Layout } from "../../components/common/layoutComponents/Layout";
import { PrimaryButton } from "../../components/common/Button";
import { useRouter } from "next/router";

export default function AffiliateDescription() {
  const router = useRouter();

  return (
    <Layout back title="Affiliate Program Application" contentClassname="space-y-3 py-0">
      <p>
        Acciopay is a next gen shopping webapp that enables youths to shop and pay at a fair pace of up to 24 months for
        tech products and more, card-free! We are looking for entrepreneurial tertiary students (i.e. in poly, ITE,
        university) that are keen in a career in the eCommerce and/or fintech industry to join our Student Affiliate
        Programme.
      </p>
      <p>As a Student Affiliate, you will:</p>
      <ul className="list-disc text-xs pl-5">
        <li>
          Encourage app downloads and successful in-app transaction through word-of-mouth and your social media
          platforms
        </li>
        <li>Be our on-campus contact point (for students) and assist new signups to make their first purchase</li>
        <li>Provide feedback on user sentiments and market trends</li>
      </ul>
      <p>
        If you are shortlisted, you will be invited for a short chat with us over the next few weeks so that we can
        learn more about you! This form will take about 5-10 minutes to complete.
      </p>
      <div className="w-full">
        <PrimaryButton onClick={() => router.push("/affiliate/signup")} className="w-full mt-2">
          Next
        </PrimaryButton>
      </div>
    </Layout>
  );
}
