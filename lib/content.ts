export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "builder", label: "Builder" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "cases", label: "Cases" },
  { id: "contact", label: "Contact" },
] as const;

export const CONTACT = {
  email: "psharmagrg@gmail.com",
  linkedin: "www.linkedin.com/in/piyush-sharma-ps2197",
};

export const ABOUT_TEXT =
  "I've spent the last 4.5+ years in the thick of financial crime compliance — investigating complex money laundering typologies, building quality frameworks, and working across some of the world's most varied regulatory environments. What keeps me going isn't just catching the bad guys — it's finding smarter, cleaner ways to do it. I believe compliance professionals who understand technology have a real edge, and I've made it a point to be one of them.";

export type Stat = { value: number | null; suffix?: string; display?: string; label: string; caption: string };

export const BUILDER_STATS: Stat[] = [
  { value: 50, suffix: "%", label: "Faster", caption: "Average handling time cut vs. manual AHT benchmarks" },
  { value: null, display: "≈0", label: "Near-Zero Errors", caption: "Structured extraction replaced manual copy-paste" },
  { value: null, display: "PA + AI", label: "Power Automate + Copilot AI", caption: "CRM capture pipeline feeding a custom Copilot agent" },
];

export const EXTRACTED_FIELDS = [
  "lifetime_funding",
  "withdrawals",
  "age",
  "occupation",
  "nationality",
  "residence",
] as const;

export const PIPELINE_STEPS = [
  { title: "CRM", detail: "Client data & documents" },
  { title: "Power Automate", detail: "Systematic capture flow" },
  { title: "Copilot Agent", detail: "Key-value extraction" },
  { title: "EDD / SAR", detail: "Template auto-populated" },
] as const;

export type Role = {
  title: string;
  phase: string;
  summary: string;
  points: string[];
  regions?: string[];
  current?: boolean;
};

export const ROLES: Role[] = [
  {
    title: "Transaction Processing Representative / Analyst",
    phase: "The Entry Point",
    summary: "Where it started — learning to read the story behind the transactions.",
    points: ["Transaction monitoring across alert queues", "AML investigations and escalations", "Built the foundation in typologies and red flags", "Star performer"],
  },
  {
    title: "Process Developer",
    phase: "The Optimiser",
    summary: "Moved from prcessing the cases to being a part of it.",
    points: ["Transaction Monitoring for a big 4 Australian Bank", "Analyzing AML typologies based on client's transactional behaviour along with any potential CSE activity", "SAR/SMR/TTR and Disclosure reporting to Austrac", "Report automation via macros"],
    regions: ["Australia"],
    current: true,
  },
  {
    title: "Senior KYC Analyst & QC Reviewer",
    phase: "The Dependable",
    summary: "Complex cases, quality ownership, and bringing new analysts up to speed.",
    points: [
      "Complex EDD / NOB investigations",
      "Quality control reviewer with a 98%+ accuracy rate",
      "Mentored 1–3 new analysts per batch",
      "Escalating unresolved high-risk cases to CEO, Chief Risk Officer, and AMLRO for relationship retention or termination decisions"
    ],
    regions: ["APAC", "MENA", "UK", "UAE", "Nordic", "MER"],
    current: true,
  },
];

export const SKILLS: { name: string; tier: "core" | "tech" | "domain" }[] = [
  { name: "AML", tier: "core" },
  { name: "KYC", tier: "core" },
  { name: "CDD/EDD", tier: "core" },
  { name: "SAR", tier: "core" },
  { name: "KYB", tier: "core" },
  { name: "Transaction Monitoring", tier: "core" },
  { name: "Quality Control", tier: "domain" },
  { name: "Process Development", tier: "domain" },
  { name: "Microsoft Copilot", tier: "tech" },
  { name: "Power Automate", tier: "tech" },
  { name: "Power BI", tier: "tech" },
  { name: "Advanced Excel", tier: "tech" },
  { name: "KX", tier: "domain" },
  { name: "FinScan", tier: "domain" },
  { name: "Crypto Asset Investigations", tier: "domain" },
  { name: "Correspondent Banking", tier: "domain" },
  { name: "Cash-Intensive Businesses", tier: "domain" },
  { name: "Beneficial Ownership", tier: "domain" },
  { name: "Regulatory Compliance", tier: "core" },
  {name:  "Risk Management", tier: "core"},
  {name:  "SMR/TTR/IFTI Reporting", tier: "domain"},
  {name:  "Red Flag Detection", tier: "core"},
  {name:  "AML Typologies", tier: "core"},
  {name:  "Adverse Media Screening", tier: "domain"},
  {name:  "Audit Readiness", tier: "core"},
  {name:  "PEP/Sanctions Screening", tier: "core"},
];

export const CASES = [
  { id: "01", label: "Case File 01", tags: ["Typology", "Jurisdiction", "Outcome"] },
  { id: "02", label: "Case File 02", tags: ["Typology", "Jurisdiction", "Outcome"] },
] as const;
