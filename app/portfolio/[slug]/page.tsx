import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductDetailClient from "./ProductDetailClient";
import {
  getProductBySlug,
  getAllProducts,
  generateSlug,
} from "../../data/portfolio-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map(({ product }) => ({
    slug: generateSlug(product),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getProductBySlug(slug);
  if (!result) return { title: "Product Not Found | Truvino" };
  const { product } = result;
  return {
    title: `${product.brand} ${product.name} | Truvino`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = getProductBySlug(slug);
  if (!result) notFound();

  const { product, country } = result;

  return (
    <>
      <Header />
      <main>
        <ProductDetailClient product={product} country={country} />
      </main>
      <Footer />
    </>
  );
}
