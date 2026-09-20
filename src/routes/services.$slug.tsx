import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";
import { services } from "@/lib/site";
import metallic from "@/assets/metallic-epoxy.jpg";
import flake from "@/assets/flake-epoxy.jpg";
import solid from "@/assets/solid-epoxy.jpg";
import sealed from "@/assets/sealed-concrete.jpg";

const images: Record<string, string> = {
  "metallic-epoxy": metallic,
  "flake-epoxy": flake,
  "solid-epoxy": solid,
  "sealed-concrete": sealed,
};

const details: Record<string, { intro: string; bullets: string[]; best: string }> = {
  "metallic-epoxy": {
    intro:
      "Metallic epoxy uses pigmented metallic additives that move through the resin as it cures, creating a seamless, high-gloss floor with depth and colour movement that is unique to your space.",
    bullets: [
      "Seamless, non-porous surface that wipes clean",
      "Custom colour blends matched to your space",
      "UV-stable top coats available for bright rooms",
      "Ideal for showrooms and feature garages",
    ],
    best: "Luxury garages, showrooms, retail spaces, and feature basements.",
  },
  "flake-epoxy": {
    intro:
      "Flake systems broadcast vinyl chips into the base coat and lock them in with a clear polyaspartic or epoxy top coat. The result is a textured, forgiving floor that hides dust and small imperfections.",
    bullets: [
      "Slip-resistant texture",
      "Hides dirt and minor slab imperfections",
      "Dozens of flake blends and colours",
      "Fast-return systems available",
    ],
    best: "Family garages, basements, workshops, and utility rooms.",
  },
  "solid-epoxy": {
    intro:
      "A solid-colour epoxy build gives you a tough, uniform surface engineered for traffic, dropped tools, and chemical exposure. We tailor the coating thickness to how hard the floor is worked.",
    bullets: [
      "High compressive and abrasion resistance",
      "Chemical and oil resistant",
      "Line striping and safety markings available",
      "Easy to sweep, scrub, and disinfect",
    ],
    best: "Warehouses, manufacturing floors, mechanic shops, and food facilities.",
  },
  "sealed-concrete": {
    intro:
      "Clear sealers and clear epoxy keep the natural character of your concrete while protecting it from moisture, staining, and dusting. It's the most economical way to upgrade a sound slab.",
    bullets: [
      "Keeps the natural concrete look",
      "Stops dusting and surface staining",
      "Matte, satin, or gloss finishes",
      "Cost-effective for large areas",
    ],
    best: "Driveways, carports, storage areas, and large commercial slabs.",
  },
};

export const Route = createFileRoute("/services/$slug")({
  staticData: { sitemap: true },
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.service.title} in Surrey BC | Pacific Floors and Coatings`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.service.short },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.service.short },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://epoxy-clone-pro.lovable.app/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://epoxy-clone-pro.lovable.app/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: loaderData.service.title,
            description: loaderData.service.short,
            areaServed: "Surrey, British Columbia",
            provider: { "@type": "LocalBusiness", name: "Pacific Floors and Coatings", telephone: "+1-236-878-3386" },
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const detail = details[service.slug];

  if (!detail) return null;

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-4 py-14">
          <Link to="/services" className="text-sm text-primary">← All services</Link>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-extrabold">{service.title}</h1>
              <p className="mt-5 text-muted-foreground">{detail.intro}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {detail.bullets.map((b) => (
                  <li key={b} className="border-l-2 border-primary pl-3">{b}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <span className="eyebrow">Best for</span>
                <span className="mt-1 block text-muted-foreground">{detail.best}</span>
              </p>
            </div>
            <img
              src={images[service.slug]}
              alt={service.title}
              loading="lazy"
              width={1200}
              height={800}
              className="h-full w-full rounded-xl border border-border object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="panel p-7">
              <h2 className="text-xl font-bold">How the installation works</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>1. Free on-site assessment of your slab and goals.</li>
                <li>2. Diamond grinding and dust-free surface preparation.</li>
                <li>3. Crack, spall, and low-spot repairs.</li>
                <li>4. Base coat, colour or flake application.</li>
                <li>5. Clear top coat and cure, then walkthrough.</li>
              </ol>
            </div>
            <QuoteForm heading={`Quote for ${service.title.toLowerCase()}`} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
