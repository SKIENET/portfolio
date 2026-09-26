import { describe, expect, it } from "vitest";
import { ABOUT_TEXT, BUILDER_STATS, CASES, CONTACT, NAV_LINKS, ROLES, SKILLS } from "@/lib/content";

describe("portfolio content", () => {
  it("lists roles in career order with regions on the senior role only", () => {
    expect(ROLES.map((r) => r.title)).toEqual([
      "Transaction Processing Representative / Analyst",
      "Process Developer",
      "Senior KYC Analyst & QC Reviewer",
    ]);
    expect(ROLES[2].regions).toEqual(["APAC", "MENA", "UK", "UAE", "Nordic", "MER"]);
    expect(ROLES[0].regions).toBeUndefined();
    expect(ROLES[1].regions).toBeUndefined();
    expect(ROLES[2].points.join(" ")).toMatch(/98%\+/);
    expect(ROLES[2].points.join(" ")).toMatch(/2–5 new analysts/);
  });

  it("includes every requested skill exactly once", () => {
    const expected = [
      "AML", "KYC", "EDD", "SAR", "KYB", "Transaction Monitoring", "Quality Control", "Process Development",
      "Microsoft Copilot", "Power Automate", "Power BI", "Advanced Excel", "KX", "FinScan", "Crypto Asset Investigations",
      "Correspondent Banking", "Cash-Intensive Businesses", "Beneficial Ownership", "Regulatory Compliance",
    ];
    const names = SKILLS.map((s) => s.name);
    expect(names).toEqual(expected);
    expect(new Set(names).size).toBe(names.length);
  });

  it("has the three builder stats and two placeholder cases", () => {
    expect(BUILDER_STATS.map((s) => s.label)).toEqual(["Faster", "Near-Zero Errors", "Power Automate + Copilot AI"]);
    expect(BUILDER_STATS[0]).toMatchObject({ value: 50, suffix: "%" });
    expect(CASES).toHaveLength(2);
  });

  it("uses placeholder contact details and section anchors", () => {
    expect(CONTACT).toEqual({ email: "piyush.sharma@email.com", linkedin: "#" });
    expect(NAV_LINKS.map((l) => l.id)).toEqual(["about", "builder", "experience", "skills", "cases", "contact"]);
    expect(ABOUT_TEXT.startsWith("I've spent the last 4+ years")).toBe(true);
  });
});
