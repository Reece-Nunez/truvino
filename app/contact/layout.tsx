import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Truvino",
  description: "Get in touch with Truvino. Contact us for wine and spirits distribution inquiries, partnership opportunities, or general questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
