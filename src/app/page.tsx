import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import { siteDetails } from "@/data/siteDetails";

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteDetails.siteName,
  url: siteDetails.siteUrl,
  description: siteDetails.metadata.description,
  image: new URL("/images/app-icon.png", siteDetails.siteUrl).toString(),
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 14 or later",
};

const HomePage: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication).replace(/</g, "\\u003c") }} />
      <Hero />
      <Container>
        <div className="pt-24 lg:pt-32">
          <Benefits />
        </div>

        <Section
          id="pricing"
          title="Pricing"
          description="Free for everyday screenshots. Pay once to unlock workflows."
        >
          <Pricing />
        </Section>

        <FAQ />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
