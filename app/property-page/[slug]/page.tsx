import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAvailableProperties,
  getPropertyBySlug,
} from "@/lib/properties";
import PropertyDetailClient from "./PropertyDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAvailableProperties().map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Isabella Signature Stays",
    };
  }

  return {
    title: `${property.name} — ${property.city}, ${property.destination} | Isabella Signature Stays`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property || !property.available) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}