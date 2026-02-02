import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Truvino",
  description: "Explore Truvino's comprehensive wine and spirits services including distribution, warehousing, customs clearing, and logistics solutions.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
