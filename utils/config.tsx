import { SearchPlusIcon } from "../components/common/iconComponents/SearchPlusIcon";
import { ShoppingBagIcon } from "../components/common/iconComponents/ShoppingBagIcon";
import { WishlistIcon } from "../components/common/iconComponents/LikeIcon";

export const primaryColor = "#6E6EED";
export const forbidColor = "#D6D6D6";
export const dangerColor = "#AF1E1E";
export const backgroundColor = "#E6E6E6";
export const iconColor = "#363636";
export const accioPayEmail = { hello: "hello@acciopay.io", affiliate: "affiliate@acciopay.sg" };
export const monthsOptions = [
  { id: 1, option: 1, label: 1 },
  { id: 2, option: 2, label: 2 },
  { id: 3, option: 3, label: 3 },
  { id: 4, option: 24, label: 24 },
  { id: 5, option: 36, label: 36 },
];

export const countryCodeOptions = [
  {
    countryName: "Singapore",
    countryNameWithIcon: "🇸🇬Singapore",
    phoneCode: "+65",
    phoneCodeWithIcon: "🇸🇬+65",
    code: "sg",
  },
  { countryName: "China", countryNameWithIcon: "🇨🇳China", phoneCode: "+86", phoneCodeWithIcon: "🇨🇳+65", code: "cn" },
  {
    countryName: "Indonesia",
    countryNameWithIcon: "🇮🇩Indonesia",
    phoneCode: "+62",
    phoneCodeWithIcon: "🇮🇩+65",
    code: "id",
  },
  {
    countryName: "Thailand",
    countryNameWithIcon: "🇹🇭Thailand",
    phoneCode: "+6",
    phoneCodeWithIcon: "🇹🇭+66",
    code: "th",
  },
];

export const headerNavigation = [
  { name: "Search beyond", href: "/search-beyond", icon: <SearchPlusIcon className="h-5 w-5" /> },
  { name: "Cart", href: "/shopping-cart", icon: <ShoppingBagIcon className="h-5 w-5" /> },
  { name: "Wishlist", href: "/account/wishlist", icon: <WishlistIcon className="h-5 w-5" /> },
];

export const shippingTime = [
  {
    id: 1,
    option: "8:00",
    label: "8:00",
  },
  {
    id: 2,
    option: "8:30",
    label: "8:30",
  },
  {
    id: 3,
    option: "9:00",
    label: "9:00",
  },
  {
    id: 4,
    option: "9:30",
    label: "9:30",
  },
  {
    id: 5,
    option: "10:00",
    label: "10:00",
  },
  {
    id: 6,
    option: "10:30",
    label: "10:30",
  },
  {
    id: 7,
    option: "11:00",
    label: "11:00",
  },
  {
    id: 8,
    option: "11:30",
    label: "11:30",
  },
  {
    id: 9,
    option: "12:00",
    label: "12:00",
  },
  {
    id: 10,
    option: "12:30",
    label: "12:30",
  },
  {
    id: 11,
    option: "13:00",
    label: "13:00",
  },
  {
    id: 11,
    option: "13:30",
    label: "13:30",
  },
  {
    id: 12,
    option: "14:00",
    label: "14:00",
  },
  {
    id: 13,
    option: "14:30",
    label: "14:30",
  },
  {
    id: 14,
    option: "15:00",
    label: "15:00",
  },
  {
    id: 15,
    option: "15:30",
    label: "15:30",
  },
  {
    id: 16,
    option: "16:00",
    label: "16:00",
  },
  {
    id: 17,
    option: "16:30",
    label: "16:30",
  },
  {
    id: 18,
    option: "17:00",
    label: "17:00",
  },
  {
    id: 19,
    option: "17:30",
    label: "17:30",
  },
  {
    id: 20,
    option: "18:00",
    label: "18:00",
  },
];

export const footerNavigation = {
  main: [
    { name: "Help", href: "/help" },
    { name: "About us", href: "/about-us" },
    { name: "Blog", href: "#" },
    { name: "Affiliate programs", href: "/affiliate" },
    { name: "Site map", href: "/sitemap" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagr",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export const affiliateProgram = {
  description:
    "Acciopay is a next gen shopping webapp that enables youths to shop and pay at a fair pace of up to 24 months for tech products and more, card-free! We are looking for entrepreneurial tertiary students (i.e. in poly, ITE, university) that are keen in a career in the eCommerce and/or fintech industry to join our Student Affiliate Programme.\n" +
    "\n" +
    "As a Student Affiliate, you will:",
  perks: [
    {
      title: "Make extra income",
      description:
        "Earn conversion-based commission with every successful transaction your referee makes with your unique referral code",
      icon: "/affiliate/perk-income.png",
    },
    {
      title: "Work at flexible timings",
      description:
        "Earn a minimum of $35 for each successful referral. No cap on your referral quote- the sky’s your limit!",
      icon: "/affiliate/perk-flexible.png",
    },
    {
      title: "Gain experience",
      description: "Get opportunity to learn and be part of an emerging homegrown start-up",
      icon: "/affiliate/perk-experience.png",
    },
  ],
  thingsToDo: {
    title: "Some things you’ll do",
    list: [
      "Encourage app downloads and successful in-app transaction through word-of-mouth and your social media platforms",
      "Be our on-campus contact point (for students) and assist new signups to make their first purchaseMake Acciopay a safe and vibrant shopping virtual space through assisting in KYC checks and in providing reminders for repayments as our on-campus contact point\n",
      "Provide feedback on user sentiments and market trends",
    ],
  },
  terms: [
    {
      title: "No experience required",
      description: "We will guide you and let you gain on-the-job experience.",
      icon: "/affiliate/term-experience.png",
    },
    {
      title: "Any tertiary student can apply",
      description: "We accept applicants from any ITE, Polytechnic or University in Singapore.",
      icon: "/affiliate/term-tertiary.png",
    },
  ],
  qrCode: {
    title: "Take out Join our telegram group \n" + "and QR code",
    image: "/affiliate/term-tertiary.png",
    description: (
      <p>
        If you have any questions, please write to{" "}
        <span className="font-bold text-primary mr-2">{accioPayEmail.affiliate}</span>
        or chat with us in <span className="font-bold text-primary">telegram</span>, <br />
        and we will get back to you as soon as possible.
      </p>
    ),
  },
  affiliateStudents: [
    {
      name: "Edward Lee",
      institution: "National University of Singapore",
      image: "/affiliate/student-edward.png",
      testimony:
        "Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony",
    },
    {
      name: "Ysanne Khan",
      institution: "National University of Singapore",
      image: "/affiliate/student-ysanne.png",
      testimony:
        "Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony Testimony",
    },
  ],
};

export const helpQuestions = [
  {
    title: "General",
    questions: [
      "How can I ensure my transactions on Acciopay are secure?",
      "Why are there similar products from other ecommerce sites shown on Acciopay?",
    ],
  },
  {
    title: "Payement",
    questions: [
      "What happens if I am running late on my payment schedule?",
      "Is there any late payment fee?",
      "Can I pay everything in advance instead of following my current payment plan if I change my mind midway?",
      "Can I still make purchases even though I have yet to be verified on Acciopay?",
    ],
  },
  {
    title: "Registration",
    questions: [
      "How do I sign up for Acciopay?",
      "What documents do I need to prepare for identity verification?",
      "How long does the verification process take?",
      "How can I be sure that my personal information is kept secure and confidential?",
    ],
  },
  {
    title: "Delivery, Self Collection and Returns",
    questions: [
      "How long does the delivery take?",
      "Where can I check on the delivery status of my order?",
      "What happens if I am not home at time of delivery?",
      "Where can I self-collect my purchases?",
      "My purchase is faulty/ missing some parts/ of the wrong model or colour, how can I submit my request for exchange?",
    ],
  },
  {
    title: "Others",
    questions: [
      "How can I ensure my transactions on Acciopay are secure?",
      "Why are there similar products from other ecommerce sites shown on Acciopay?",
      "Are there any limitations on what I can purchase through the ‘Search Beyond’ function?",
    ],
  },
];

export const genderOptions = [
  { title: "Male", value: "Male" },
  { title: "Female", value: "Female" },
];

export const institutionsOfStudy = [
  { title: "Curtin Singapore", value: "Curtin Singapore" },
  { title: "DigiPen Institute of Technology", value: "DigiPen Institute of Technology" },
  { title: "École hôtelière de Lausanne (EHL)", value: "École hôtelière de Lausanne (EHL)" },
  {
    title: "École Supérieure des Sciences Economiques et Commerciales (ESSEC)",
    value: "École Supérieure des Sciences Economiques et Commerciales (ESSEC)",
  },
  {
    title: "German Institute of Science and Technology - TUM Asia",
    value: "German Institute of Science and Technology - TUM Asia",
  },
  { title: "INSEAD", value: "INSEAD" },
  { title: "ITE College Central", value: "ITE College Central" },
  { title: "ITE College East", value: "ITE College East" },
  { title: "ITE College West", value: "ITE College West" },
  { title: "James Cook University Singapore", value: "James Cook University Singapore" },
  { title: "Kaplan Singapore", value: "Kaplan Singapore" },
  { title: "Nanyang Polytechnic", value: "Nanyang Polytechnic" },
  { title: "Nanyang Technological University", value: "Nanyang Technological University" },
  { title: "National University of Singapore", value: "National University of Singapore" },
  { title: "NgeeAnn Polytechnic", value: "NgeeAnn Polytechnic" },
  { title: "Republic Polytechnic", value: "Republic Polytechnic" },
  { title: "S P Jain School of Global Management", value: "S P Jain School of Global Management" },
  { title: "Singapore Institute of Management", value: "Singapore Institute of Management" },
  { title: "Singapore Institute of Technology", value: "Singapore Institute of Technology" },
  { title: "Singapore Management University", value: "Singapore Management University" },
  { title: "Singapore Polytechnic", value: "Singapore Polytechnic" },
  { title: "Singapore University of Social Sciences", value: "Singapore University of Social Sciences" },
  { title: "Singapore University of Technology and Design", value: "Singapore University of Technology and Design" },
  { title: "Sorbonne-Assas International Law School", value: "Sorbonne-Assas International Law School" },
  { title: "St.Gallen Institute of Management in Asia", value: "St.Gallen Institute of Management in Asia" },
  { title: "Temasek Polytechnic", value: "Temasek Polytechnic" },
];
