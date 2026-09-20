import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/services/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Epoxy Flooring Services in Surrey BC | Pacific Floors and Coatings" },
      {
        name: "description",
        content:
          "Metallic, flake, solid, and clear epoxy flooring systems for garages, warehouses, and showrooms across Surrey, BC and Metro Vancouver.",
      },
      { property: "og:title", content: "Epoxy Flooring Services | Pacific Floors and Coatings" },
      {
        property: "og:description",
        content: "Your go-to custom flooring solutions across Surrey, BC and Metro Vancouver.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://epoxy-clone-pro.lovable.app/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://epoxy-clone-pro.lovable.app/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="eyebrow">Our services</p>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Your go-to custom flooring solutions
          </h1>
          <p className="mt-5 text-muted-foreground">
            From garage floors to industrial warehouses and retail showrooms, Pacific Floors and Coatings installs
            metallic, flake, solid, and clear epoxy systems built for Surrey, BC and the Fraser
            Valley.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={images[s.slug]}
                alt={s.title}
                loading="lazy"
                width={1200}
                height={800}
                className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-5">
                <h2 className="text-lg font-bold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 md:grid-cols-2">
          <h2 className="text-3xl font-extrabold">
            Trusted by home and business owners across Surrey and Metro Vancouver.
          </h2>
          <QuoteForm heading="Get your free quote" />
        </section>
      </main>
      <Footer />
    </>
  );
}
