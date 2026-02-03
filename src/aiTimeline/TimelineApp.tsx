// src/App.jsx
import './i18n';
import { Suspense, lazy, useState } from "react";
// import Starfield from "./components/Starfield";
import Starfield from "./components/EmergentBackground";
// import Timeline from "./components/Timeline"; // REMOVE this import
import { useTranslation } from "react-i18next";

// LAZY import for Timeline
const Timeline = lazy(() => import("./components/Timeline"));

export default function App() {
  const { t } = useTranslation();
  const [autoScroll, setAutoScroll] = useState(false);

  const heroImageUrl = `${import.meta.env.BASE_URL}AdobeStock_408281547-1280x1280.jpeg`;

  return (
    <>
      <div className="relative">
        {/* Language switcher removed: site is English-only */}

        {/* Starfield canvas behind everything - DISABLED */}
        <Starfield />

        <div className="relative z-10 w-full">
          {/* Hero Section */}
          <section id="hero" className="relative w-full h-[75vh] pt-16">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={heroImageUrl}
                alt={t("hero.imageAlt", "AI Background")}
                className="w-full h-full object-cover"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Text content positioned above background */}
            <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-16">
              <div className="max-w-3xl text-center">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
                  {t("hero.title", "The Evolution of AI")}
                  <br />
                  {t("hero.dateRange", { year: new Date().getFullYear() })}
                </h1>
                <p className="text-gray-100 font-sans text-lg md:text-xl leading-relaxed mb-8">
                  {t(
                    "hero.description1",
                    "This timeline attempts to tell a brief history of artificial intelligence as we see today, from its conceptual origins in the 1960s to the present day. It highlights key milestones, breakthroughs, and events that have shaped the development and adoption of AI technologies over the decades."
                  )}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => setAutoScroll(!autoScroll)}
                    className="px-6 py-3 rounded-lg font-sans font-medium text-base transition-all duration-300 bg-white hover:bg-gray-100 text-gray-900"
                  >
                    {autoScroll ? "⏸ Pause" : "Explore the timeline"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <div className="overflow-visible">
            <Suspense
              fallback={
                <div className="text-white sans max-w-[1600px] px-20 mx-auto py-70 ">
                  {t("loading")}
                </div>
              }
            >
              <Timeline autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
