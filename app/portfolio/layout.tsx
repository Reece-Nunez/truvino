import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Truvino",
  description:
    "Explore Truvino's complete portfolio of premium wines and spirits from around the world. From Italian Prosecco to Scottish whisky, discover our curated collection.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
