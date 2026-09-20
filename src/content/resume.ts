export const person = {
  name: "Muhammad Haim",
  role: "Quality Engineer",
  discipline: "Senior QA / Test Automation / API & Performance",
  location: "Islamabad, Pakistan",
  email: "muhammadhaim0786@gmail.com",
  phone: "+92 332 6009541",
  phoneHref: "+923326009541",
  linkedin: "https://www.linkedin.com/in/muhammad-haim-7203b11b3/",
  // Every visible sentence on this site maps to a line in the source CV.
  cv: "/Muhammad-Haim-Quality-Engineer.pdf",
  cvName: "Muhammad-Haim-Quality-Engineer.pdf",
  headline: "I find the defects your UI layer hides.",
  subline:
    "Quality Engineer with 4+ years building layered automation and cross-layer verification across healthcare, government, and enterprise systems.",
} as const;

/** Figures below are taken from the CV, not invented. */
export const figures = [
  { value: "4+", unit: "years", label: "In quality engineering" },
  { value: "30+", unit: "per month", label: "Defects filed and triaged at Oasys" },
  { value: "60%", unit: "reduction", label: "Manual regression effort on SASO HERC" },
  { value: "1,000+", unit: "concurrent users", label: "Simulated in JMeter load plans" },
] as const;

export const roles = [
  {
    company: "Oasys",
    title: "Quality Engineer",
    period: "Aug 2026 to present",
    place: "New York, NY (Remote)",
    current: true,
    summary:
      "Built the company's first formal QA function and own release quality across eight product domains.",
    points: [
      "Designed and documented the first formal QA process, covering test strategy, a layered coverage taxonomy, per-PR manual test plans, exploratory testing, and standardized defect intake and triage.",
      "Run cross-layer verification on every release candidate across browser UI, backend logs, database state, and external integrations including payments, calendar, and messaging providers.",
      "Surface session-integrity and permissions defects in authenticated healthcare workflows, including cases where UI access controls behaved correctly but API or persistence-layer behavior did not.",
      "Review PRs for systemic risk beyond functional correctness: N+1 query patterns, client-side filtering that belongs on the server, response schema mismatches, and incomplete cache invalidation.",
      "Own the defect lifecycle end to end in Linear and publish a weekly QA digest on quality trends, open risks, and defect patterns.",
    ],
    stack: ["Playwright", "TypeScript", "SQL", "Linear", "REST APIs"],
  },
  {
    company: "Motive",
    title: "Software Engineer, QA (Manual and Automation)",
    period: "Sep 2025 to Aug 2026",
    place: "New York, NY (Remote)",
    current: false,
    summary:
      "Owned automated UI regression and release validation for a production engineering org.",
    points: [
      "Designed, developed, and maintained automated UI coverage in Playwright with Java on Page Object Model architecture, improving regression efficiency and reuse.",
      "Increased regression coverage while cutting execution time by roughly 30 to 50 percent through suite optimization.",
      "Validated REST APIs in Postman and ran load and stability testing in Apache JMeter to locate bottlenecks.",
      "Integrated automated suites into CI/CD pipelines and maintained test plans and defect records in Jira and TestRail.",
    ],
    stack: ["Playwright", "Java", "Postman", "JMeter", "Jira", "TestRail"],
  },
  {
    company: "AZM Development",
    title: "Test Automation Engineer",
    period: "Mar 2024 to Sep 2025",
    place: "Islamabad, Pakistan",
    current: false,
    summary:
      "Led QA automation for SASO HERC, a Saudi government digital compliance platform.",
    points: [
      "Designed and implemented a scalable Playwright and TypeScript automation framework on Page Object Model architecture.",
      "Reduced manual regression effort by more than 60 percent through reusable coverage and framework improvements.",
      "Performed API validation and performance testing to verify system behavior against compliance requirements, with scenarios aligned to Jira stories and Figma designs.",
      "Mentored two junior QA engineers on automation practice, framework architecture, and maintainable test design.",
    ],
    stack: ["Playwright", "TypeScript", "JMeter", "Jira", "Figma"],
  },
  {
    company: "weRplay",
    title: "Quality Assurance Analyst",
    period: "May 2023 to Mar 2024",
    place: "Islamabad, Pakistan",
    current: false,
    summary: "Multi-platform functional and regression testing across mobile, tablet, and web.",
    points: [
      "Executed 200+ functional and regression test cases across iOS, Android, Kindle, and Web.",
      "Identified and logged 150+ defects, contributing to a reported 40 percent reduction in post-release issues.",
      "Validated backend state and data integrity with SQL queries.",
      "Participated in risk assessment, release validation, and defect verification cycles.",
    ],
    stack: ["SQL", "iOS", "Android", "Web"],
  },
  {
    company: "Care Pvt Ltd",
    title: "Implementation Engineer",
    period: "Aug 2022 to Jun 2023",
    place: "Islamabad, Pakistan",
    current: false,
    summary: "ERP workflow delivery and integration testing in a Scrum environment.",
    points: [
      "Developed and configured ERP workflows on the Joget low-code platform.",
      "Wrote and executed manual test cases for ERP modules using Postman and regression techniques.",
      "Ran system and integration testing with request and response validation against client requirements.",
      "Identified critical defects and supported UAT readiness through to client acceptance.",
    ],
    stack: ["Joget", "Postman", "Git"],
  },
] as const;

export const work = [
  {
    title: "A QA function built from zero",
    client: "Oasys",
    year: "2026",
    kind: "Process design",
    feature: true,
    body:
      "Healthcare product, eight domains, no QA process in place. I wrote the test strategy, defined a layered coverage taxonomy that assigns each behavior to the layer that owns it, and set up per-PR manual test plans, exploratory passes, and a single triage pipeline in Linear that merges QA findings, customer reports, and stage testing.",
    outcome: [
      { k: "Defects triaged", v: "30+ per month" },
      { k: "Domains covered", v: "8" },
      { k: "Verification layers", v: "UI, API, DB, logs, integrations" },
    ],
    tech: ["Playwright", "TypeScript", "SQL", "REST APIs", "Linear"],
  },
  {
    title: "SASO HERC automation framework",
    client: "AZM Development",
    year: "2024",
    kind: "Test automation",
    feature: false,
    body:
      "A scalable Playwright and TypeScript framework on Page Object Model architecture for a Saudi government compliance platform, built for reuse across a wide surface of regulated workflows.",
    outcome: [{ k: "Manual regression effort", v: "down ~60%" }],
    tech: ["Playwright", "TypeScript", "POM"],
  },
  {
    title: "SASO HERC load and stress plans",
    client: "AZM Development",
    year: "2025",
    kind: "Performance",
    feature: false,
    body:
      "JMeter test plans simulating 1,000+ concurrent users against the platform APIs, with bottleneck analysis and proposed optimizations for response time and stability.",
    outcome: [{ k: "Peak concurrency modelled", v: "1,000+ users" }],
    tech: ["Apache JMeter", "REST APIs"],
  },
] as const;

export const capabilities = [
  {
    area: "Automation",
    lead: "Playwright",
    span: "wide",
    body: "UI, API, component, and full-stack browser coverage on Page Object Model architecture.",
    items: ["Playwright", "TypeScript", "Java", "Page Object Model", "CI/CD suites"],
  },
  {
    area: "Quality engineering",
    lead: "Strategy",
    span: "tall",
    body: "Process design and risk-based coverage, not test-case counting.",
    items: [
      "QA process design",
      "Test strategy",
      "Risk-based testing",
      "Exploratory testing",
      "Release readiness",
      "Defect triage",
    ],
  },
  {
    area: "Backend and data",
    lead: "API + SQL",
    span: "normal",
    body: "Contract testing and persistence-layer validation.",
    items: ["REST APIs", "Contract testing", "JSON / HTTP", "SQL", "Backend logs"],
  },
  {
    area: "Performance",
    lead: "JMeter",
    span: "normal",
    body: "Load, stress, and endurance plans with bottleneck analysis.",
    items: ["Apache JMeter", "Load", "Stress", "Endurance"],
  },
  {
    area: "Delivery",
    lead: "Shipping",
    span: "wide",
    body: "PR quality review, regression and UAT cycles, Agile and Scrum.",
    items: ["PR quality reviews", "Regression", "Integration", "UAT", "Smoke and sanity", "CI/CD"],
  },
] as const;

export const method = [
  {
    title: "Coverage goes to the layer that owns the behavior",
    body: "A rule about persistence gets a database integration test, not a browser test that happens to touch it. This keeps suites fast and keeps failures diagnostic instead of ambiguous.",
  },
  {
    title: "The UI passing is not the system passing",
    body: "Access controls that behave correctly in the browser can still be wrong at the API or in the stored record. Every release candidate gets checked at the layer where the truth lives.",
  },
  {
    title: "PR review looks for systemic risk",
    body: "N+1 query patterns, client-side filtering that belongs on the server, response schema drift, incomplete cache invalidation. Functional correctness is the floor, not the ceiling.",
  },
  {
    title: "Defects carry evidence, not opinions",
    body: "Reproducible steps plus cross-layer evidence: request and response, log line, database state. Triage is faster when the report already answers the first three questions engineering will ask.",
  },
] as const;

export const credentials = {
  education: {
    school: "National University of Computer and Emerging Sciences (FAST-NUCES)",
    degree: "BS, Computer Science",
    year: "2022",
  },
  certifications: [
    { name: "Automation Testing Using Playwright", issuer: "Udemy" },
    { name: "Performance Testing Fundamentals", issuer: "Udemy" },
  ],
  tools: [
    "Linear",
    "Jira",
    "TestRail",
    "AIO Test",
    "Postman",
    "Git",
    "GitHub",
    "GitHub Actions",
    "Confluence",
  ],
} as const;

/**
 * Toolchain strip. Every entry resolves to an official brand mark shipped by
 * the `simple-icons` package. Playwright has no simple-icons mark, so it is
 * given typographic prominence in the Automation capability instead of being
 * hand-drawn here. See README if you want to add a local brand SVG.
 */
export const toolchain = [
  "siTypescript",
  "siOpenjdk",
  "siPostman",
  "siApachejmeter",
  "siGithubactions",
  "siLinear",
  "siJira",
  "siTestrail",
  "siConfluence",
  "siGit",
  "siGithub",
] as const;

/**
 * Engagement paths. Each one maps to something he has actually done, which is
 * why there are three and not five.
 */
export const paths = [
  {
    id: "fulltime",
    title: "Full-time quality engineering",
    forWho: "Teams hiring a QA engineer who owns release quality, not just test execution.",
    youGet:
      "Test strategy, layered automation, cross-layer release verification, and a defect pipeline engineering actually uses.",
    start: "Send the role, the stack, and what is currently breaking in your releases.",
    reply: "Reply within 48 hours.",
  },
  {
    id: "automation",
    title: "Automation build or rescue",
    forWho: "Teams with no suite, or a Playwright suite that is slow, flaky, and ignored.",
    youGet:
      "A Page Object Model framework built for reuse, wired into CI, with coverage assigned to the layer that owns each behavior.",
    start: "Send the repo or a description of the current suite and where it hurts.",
    reply: "Reply within 48 hours.",
  },
  {
    id: "process",
    title: "QA process setup",
    forWho: "Product teams shipping without a formal QA function, where defects arrive from customers first.",
    youGet:
      "Test strategy, a coverage taxonomy, per-PR test plans, standardized defect intake, and a triage pipeline in your tracker.",
    start: "Send how you ship today and where defects are currently getting caught.",
    reply: "Reply within 48 hours.",
  },
] as const;

export const inquiryTopics = [
  { value: "fulltime", label: "Full-time role" },
  { value: "automation", label: "Automation build or rescue" },
  { value: "process", label: "QA process setup" },
  { value: "other", label: "Something else" },
] as const;

export const bio = [
  "I started in ERP implementation, moved into multi-platform functional testing, then into automation, and now spend most of my time on the layer that decides whether a release is actually safe to ship.",
  "The thread through all of it is the same: a feature passing in the browser tells you very little. The interesting defects live in the API response, the stored record, the log line, and the third-party integration that quietly failed. That is where I look first.",
  "Right now I am at Oasys, where I built the first formal QA process and own release quality across eight product domains in a healthcare product. Before that, automation work at Motive and AZM Development, including a Playwright framework for a Saudi government compliance platform.",
] as const;
