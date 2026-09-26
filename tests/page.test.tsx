import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";

vi.mock("next/dynamic", () => ({ default: () => () => null }));

describe("Home page", () => {
  it("renders all sections in order", () => {
    const { container } = render(<Home />);
    const ids = [...container.querySelectorAll("main > section")].map((s) => s.id);
    expect(ids).toEqual(["hero", "about", "builder", "experience", "skills", "cases", "contact"]);
  });

  it("renders hero name, tagline and CTAs", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: "Piyush Sharma" })).toBeTruthy();
    expect(screen.getByLabelText("Financial crime doesn't follow a template. Neither do I.")).toBeTruthy();
    expect(screen.getByRole("button", { name: /View My Work/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Let's Connect/ })).toBeTruthy();
  });

  it("View My Work scrolls to the builder section (native fallback before Lenis loads)", () => {
    render(<Home />);
    const builder = document.getElementById("builder");
    expect(builder).toBeTruthy();
    const spy = vi.spyOn(builder as HTMLElement, "scrollIntoView");
    fireEvent.click(screen.getByRole("button", { name: /View My Work/ }));
    expect(spy).toHaveBeenCalled();
  });

  it("Let's Connect scrolls to contact", () => {
    render(<Home />);
    const contact = document.getElementById("contact") as HTMLElement;
    const spy = vi.spyOn(contact, "scrollIntoView");
    fireEvent.click(screen.getByRole("button", { name: /Let's Connect/ }));
    expect(spy).toHaveBeenCalled();
  });

  it("renders the builder section with label, headline and stats", () => {
    render(<Home />);
    const builder = screen.getByTestId("builder-section");
    expect(within(builder).getByText("Beyond Compliance")).toBeTruthy();
    expect(within(builder).getByRole("heading", { name: "I built the tool my team didn't know they needed." })).toBeTruthy();
    const stats = within(builder).getByTestId("builder-stats");
    expect(within(stats).getByText("Near-Zero Errors")).toBeTruthy();
    expect(within(stats).getByText("Power Automate + Copilot AI")).toBeTruthy();
    expect(within(builder).getByText("Microsoft Power Automate")).toBeTruthy();
  });

  it("renders regional tags on the timeline", () => {
    render(<Home />);
    const tags = [...screen.getByTestId("region-tags").querySelectorAll("li")].map((li) => li.textContent);
    expect(tags).toEqual(["APAC", "MENA", "UK", "UAE", "Nordic", "MER"]);
  });

  it("renders two locked case cards without real content", () => {
    render(<Home />);
    const cards = screen.getByTestId("case-cards");
    expect(within(cards).getAllByRole("button", { name: /Details available on request/ })).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "The Cases That Stay With You" })).toBeTruthy();
  });

  it("renders contact with placeholder email and LinkedIn link", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: "Let's Talk Compliance" })).toBeTruthy();
    expect(screen.getByTestId("contact-email").getAttribute("href")).toBe("mailto:piyush.sharma@email.com");
    expect(screen.getByRole("link", { name: /LinkedIn/ }).getAttribute("href")).toBe("#");
  });
});
