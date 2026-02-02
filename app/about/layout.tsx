import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Truvino",
  description: "Learn about Truvino - your trusted partner in premium wine and spirits distribution. Discover our story, mission, values, and commitment to excellence.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
