export type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Decision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  org: string;
  role: string;
  period: string;
  featured: boolean;
  summary: string;
  problem: string;
  decisions: Decision[];
  outcome: string;
  stack: string[];
  screenshots: Screenshot[];
  liveUrl?: string;
  liveLabel?: string;
};

export type Role = {
  org: string;
  title: string;
  period: string;
  location: string;
  kind: "full-time" | "contract";
  summary: string;
  highlights: string[];
  stack: string[];
};

export type StackGroup = {
  label: string;
  items: string[];
};