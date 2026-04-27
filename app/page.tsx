import { ComingSoonPage } from "@/components/coming-soon-page";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CrickBoss",
    "operatingSystem": "iOS, Android, Web",
    "applicationCategory": "SportsApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "The smartest way to score cricket matches and manage leagues.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "100"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ComingSoonPage />
    </>
  );
}
