import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BedDouble,
  Bus,
  CalendarDays,
  ChevronRight,
  Globe2,
  IdCard,
  Menu,
  Plane,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { continents, countries, type Country, type Lang } from "./data";
import MountainIntro from "./MountainIntro";
import { copy, featuredDescriptions, tr } from "./i18n";
import countryContentSource from "./content/countries-tr.txt?raw";
import countryContentSourceEn from "./content/countries-en.txt?raw";
import countryContentSourceDe from "./content/countries-de.txt?raw";
import { parseCountryContent } from "./homeCountryContent";
import { featuredCountrySlugs } from "./content/homepage";
import { normalizeSearchText, sortCountriesByName } from "./countryUtils";

const turkishCountryContent = parseCountryContent(countryContentSource);
// Ayrıntılı ülke yazıları: Türkçe tüm ülkeler için, İngilizce ve Almanca çevrilen ülkeler için.
// Çevirisi olmayan ülkelerde data.ts içindeki kısa içerik gösterilir.
const richCountryContent: Record<Lang, ReturnType<typeof parseCountryContent>> =
  {
    tr: turkishCountryContent,
    en: parseCountryContent(countryContentSourceEn),
    de: parseCountryContent(countryContentSourceDe),
  };

const countryName = (country: Country, lang: Lang) =>
  lang === "tr"
    ? turkishCountryContent[country.slug]?.name || country.name.tr
    : country.name[lang];
const countryShort = (country: Country, lang: Lang) =>
  lang === "tr"
    ? turkishCountryContent[country.slug]?.short || ""
    : country.short[lang];

const searchLabels = {
  tr: {
    open: "Sitede ara",
    title: "Travelista’da ara",
    placeholder: "Ülke, şehir, yer veya konu ara…",
    results: "sonuç",
    empty: "Bu aramayla eşleşen içerik bulunamadı.",
    close: "Aramayı kapat",
    upcoming: "İçerik yakında eklenecek.",
  },
  en: {
    open: "Search site",
    title: "Search Travelista",
    placeholder: "Search countries, cities, places or topics…",
    results: "results",
    empty: "No content matches this search.",
    close: "Close search",
    upcoming: "Content coming soon.",
  },
  de: {
    open: "Website durchsuchen",
    title: "Travelista durchsuchen",
    placeholder: "Länder, Städte, Orte oder Themen suchen…",
    results: "Ergebnisse",
    empty: "Keine passenden Inhalte gefunden.",
    close: "Suche schließen",
    upcoming: "Inhalt folgt in Kürze.",
  },
};

function countrySearchSections(country: Country, lang: Lang) {
  const rich = richCountryContent[lang][country.slug];
  return [
    [
      "genel",
      tr(copy.sections.overview, lang),
      rich?.overview || country.overview[lang],
    ],
    [
      "sehirler",
      tr(copy.sections.cities, lang),
      rich?.cities || country.cities,
    ],
    [
      "gezilecek",
      tr(copy.sections.places, lang),
      rich?.places || country.places,
    ],
    [
      "tarih",
      tr(copy.sections.history, lang),
      rich?.history || country.history,
    ],
    ["doga", tr(copy.sections.nature, lang), rich?.nature || country.nature],
    ["yemek", tr(copy.sections.foods, lang), rich?.foods || country.foods],
    [
      "butce",
      tr(copy.sections.budget, lang),
      rich?.budget || country.budget[lang],
    ],
    [
      "zaman",
      tr(copy.sections.bestTime, lang),
      rich?.bestTime || country.bestTime[lang],
    ],
    ["vize", tr(copy.sections.visa, lang), rich?.visa || country.visa[lang]],
    [
      "ulasim",
      tr(copy.sections.transport, lang),
      rich?.transport || country.transport[lang],
    ],
    [
      "konaklama",
      tr(copy.sections.stay, lang),
      rich?.stay || country.stay[lang],
    ],
    [
      "gidis",
      tr(copy.sections.arrival, lang),
      rich?.arrival || country.arrival[lang],
    ],
    ["ipuclari", tr(copy.sections.tips, lang), rich?.tips || country.tips],
  ] as const;
}

const LangContext = ({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) => (
  <div className="langs" aria-label={tr(copy.common.language, lang)}>
    {(["tr", "en", "de"] as Lang[]).map((l) => (
      <button
        className={l === lang ? "active" : ""}
        onClick={() => setLang(l)}
        key={l}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);
function ImageBox({
  src,
  alt,
  className = "",
  lang = "tr",
}: {
  src: string;
  alt: string;
  className?: string;
  lang?: Lang;
}) {
  const [bad, setBad] = useState(false);
  return (
    <div className={`image-box ${className} ${bad ? "missing" : ""}`}>
      {!bad && (
        <img src={src} alt={alt} loading="lazy" onError={() => setBad(true)} />
      )}{" "}
      {bad && (
        <>
          <div className="contours" />
          <span className="image-note">
            {
              {
                tr: "Görsel eklenmedi",
                en: "Image not added",
                de: "Bild nicht vorhanden",
              }[lang]
            }
            {import.meta.env.DEV && <small>{`Dosya: public${src}`}</small>}
          </span>
        </>
      )}
    </div>
  );
}
function VideoHero({
  video,
  poster,
  alt,
  lang,
}: {
  video: string;
  poster: string;
  alt: string;
  lang: Lang;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-hero">
      <ImageBox src={poster} alt={alt} lang={lang} />
      {!failed && (
        <video
          className={ready ? "ready" : ""}
          src={video}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          aria-label={alt}
        />
      )}
    </div>
  );
}

function GlobalSearch({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const labels = searchLabels[lang];

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, [open]);

  const results = useMemo(() => {
    const needle = normalizeSearchText(query);
    if (needle.length < 2) return [];
    const found: {
      country: Country;
      id: string;
      section: string;
      excerpt: string;
    }[] = [];
    for (const country of sortCountriesByName(countries, lang, countryName)) {
      const name = countryName(country, lang);
      const short = countryShort(country, lang);
      if (normalizeSearchText(`${name} ${short}`).includes(needle)) {
        found.push({
          country,
          id: "genel",
          section: tr(copy.sections.overview, lang),
          excerpt: short,
        });
      }
      for (const [id, section, value] of countrySearchSections(country, lang)) {
        const content = Array.isArray(value)
          ? value
              .map((item) => (typeof item === "string" ? item : item[lang]))
              .join(" ")
          : value;
        if (normalizeSearchText(`${section} ${content}`).includes(needle)) {
          if (
            !found.some(
              (item) => item.country.slug === country.slug && item.id === id,
            )
          ) {
            found.push({
              country,
              id,
              section,
              excerpt: content.slice(0, 150),
            });
          }
        }
      }
    }
    return found.slice(0, 16);
  }, [lang, query]);

  const select = (country: Country, id: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/country/${country.slug}#${id}`);
  };

  return (
    <>
      <button
        className="global-search-trigger"
        onClick={() => setOpen(true)}
        aria-label={labels.open}
      >
        <Search /> <span>{labels.open}</span>
      </button>
      {open && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={labels.title}
        >
          <button
            className="search-backdrop"
            onClick={() => setOpen(false)}
            aria-label={labels.close}
          />
          <div className="search-panel">
            <div className="search-panel-head">
              <span>{labels.title}</span>
              <button onClick={() => setOpen(false)} aria-label={labels.close}>
                <X />
              </button>
            </div>
            <label className="global-search-input">
              <Search />
              <span className="sr-only">{labels.open}</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.placeholder}
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label={tr(copy.common.clear, lang)}
                >
                  <X />
                </button>
              )}
            </label>
            {query.length >= 2 && (
              <div className="search-results" aria-live="polite">
                <small>
                  {results.length} {labels.results}
                </small>
                {results.length ? (
                  results.map((result) => (
                    <button
                      key={`${result.country.slug}-${result.id}`}
                      onClick={() => select(result.country, result.id)}
                    >
                      <span>{countryName(result.country, lang)}</span>
                      <strong>{result.section}</strong>
                      <p>{result.excerpt}</p>
                      <ArrowRight />
                    </button>
                  ))
                ) : (
                  <div className="search-empty">
                    <Globe2 />
                    <p>{labels.empty}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function Header({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="site-header revealed">
      <Link to="/" className="logo">
        Travelista<span>.</span>
      </Link>
      <GlobalSearch lang={lang} />
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={tr(copy.common.menu, lang)}
      >
        <Menu />
      </button>
      <nav className={open ? "open" : ""}>
        <NavLink to="/explore">{tr(copy.common.explore, lang)}</NavLink>
        <NavLink to="/about">{tr(copy.common.about, lang)}</NavLink>
        <LangContext lang={lang} setLang={setLang} />
      </nav>
    </header>
  );
}
function Layout({
  lang,
  setLang,
  children,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  children: React.ReactNode;
}) {
  const loc = useLocation();
  useEffect(() => {
    if (!loc.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(loc.hash.slice(1));
    const timer = window.setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      target?.classList.add("search-highlight");
      window.setTimeout(
        () => target?.classList.remove("search-highlight"),
        1800,
      );
    }, 80);
    return () => clearTimeout(timer);
  }, [loc.pathname, loc.hash]);
  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main key={loc.pathname} className="page-enter">
        {children}
      </main>
      <BackToTop lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
function BackToTop({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(scrollY > innerHeight * 0.8);
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={tr(copy.common.top, lang)}
    >
      <ArrowUp />
    </button>
  );
}
function CountryFeature({ c, lang }: { c: Country; lang: Lang }) {
  return (
    <Link to={`/country/${c.slug}`} className="country-feature">
      <ImageBox src={c.images.card} alt={countryName(c, lang)} lang={lang} />
      <div>
        <span>{continents.find((x) => x.id === c.continent)?.name[lang]}</span>
        <h3>{countryName(c, lang)}</h3>
        <p>
          {lang === "tr"
            ? countryShort(c, lang)
            : tr(featuredDescriptions[c.slug] || c.short, lang)}
        </p>
        <ArrowRight />
      </div>
    </Link>
  );
}
function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <MountainIntro lang={lang} />
      <section className="welcome section">
        <span className="eyebrow">{tr(copy.home.eyebrow, lang)}</span>
        <h1>{tr(copy.home.title, lang)}</h1>
        <p>{tr(copy.home.description, lang)}</p>
        <Link to="/explore">
          {tr(copy.home.cta, lang)} <ArrowRight />
        </Link>
      </section>
      <section id="intro" className="intro section">
        <span className="section-index">
          {tr(copy.home.introEyebrow, lang)}
        </span>
        <div>
          <h2>{tr(copy.home.introTitle, lang)}</h2>
          <p>{tr(copy.home.introText, lang)}</p>
        </div>
      </section>
      <section className="section popular">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              {tr(copy.home.featuredEyebrow, lang)}
            </span>
            <h2>{tr(copy.home.featuredTitle, lang)}</h2>
            <p>{tr(copy.home.featuredText, lang)}</p>
          </div>
          <Link to="/explore">
            {tr(copy.home.allDest, lang)}
            <ArrowRight />
          </Link>
        </div>
        <div className="features">
          {sortCountriesByName(
            featuredCountrySlugs
              .map((slug) => countries.find((item) => item.slug === slug))
              .filter((country): country is Country => Boolean(country)),
            lang,
            countryName,
          ).map((country) => (
            <CountryFeature key={country.slug} c={country} lang={lang} />
          ))}
        </div>
      </section>
      <ContinentStrip lang={lang} />
      <section className="moods section">
        <span className="eyebrow">TRAVELISTA</span>
        <h2>{tr(copy.home.moodTitle, lang)}</h2>
        <p>{tr(copy.home.moodText, lang)}</p>
        <div className="mood-links">
          <Link to="/destinasyonlar?mood=coast">
            {tr(copy.home.moodLinks[0], lang)} <ArrowRight />
          </Link>
          <Link to="/destinasyonlar?mood=city">
            {tr(copy.home.moodLinks[1], lang)} <ArrowRight />
          </Link>
          <Link to="/destinasyonlar?mood=nature">
            {tr(copy.home.moodLinks[2], lang)} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
function ContinentStrip({ lang }: { lang: Lang }) {
  return (
    <section className="continent-section section">
      <div className="section-head">
        <div>
          <span className="eyebrow">
            {tr(copy.home.continentsEyebrow, lang)}
          </span>
          <h2>{tr(copy.home.continentsTitle, lang)}</h2>
          <p>{tr(copy.home.continentsText, lang)}</p>
        </div>
      </div>
      <div className="continent-list">
        {continents.map((co) => {
          const count = countries.filter((c) => c.continent === co.id).length;
          return (
            <Link key={co.id} to={`/destinasyonlar?continent=${co.id}`}>
              <h3>{co.name[lang]}</h3>
              <small>
                {count} {tr(copy.common.routes, lang)}
              </small>
              <ChevronRight />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
function Destinations({ lang }: { lang: Lang }) {
  const params = new URLSearchParams(useLocation().search);
  const [continent, setContinent] = useState(params.get("continent") || "all");
  const [q, setQ] = useState("");
  const list = useMemo(
    () =>
      sortCountriesByName(
        countries.filter(
          (c) =>
            (continent === "all" || c.continent === continent) &&
            normalizeSearchText(
              `${Object.values(c.name).join(" ")} ${countryShort(c, lang)} ${c.cities.join(" ")}`,
            ).includes(normalizeSearchText(q)),
        ),
        lang,
        countryName,
      ),
    [continent, lang, q],
  );
  return (
    <div className="inner-page">
      <PageTitle
        kicker="ATLAS"
        title={tr(copy.common.explore, lang)}
        text={tr(copy.home.description, lang)}
      />
      <div className="filters">
        <label>
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tr(copy.common.search, lang)}
          />
        </label>
        <div className="filter-tabs">
          <button
            className={continent === "all" ? "active" : ""}
            onClick={() => setContinent("all")}
          >
            {tr(copy.common.all, lang)} <sup>{countries.length}</sup>
          </button>
          {continents.map((c) => (
            <button
              className={continent === c.id ? "active" : ""}
              onClick={() => setContinent(c.id)}
              key={c.id}
            >
              {c.name[lang]}{" "}
              <sup>{countries.filter((x) => x.continent === c.id).length}</sup>
            </button>
          ))}
        </div>
      </div>
      {list.length ? (
        <div className="country-grid">
          {list.map((c) => (
            <Link to={`/country/${c.slug}`} key={c.slug}>
              <ImageBox
                src={c.images.card}
                alt={`${countryName(c, lang)} görünümü`}
                lang={lang}
              />
              <span>
                {continents.find((x) => x.id === c.continent)?.name[lang]}
              </span>
              <h2>{countryName(c, lang)}</h2>
              <p>{countryShort(c, lang)}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <Globe2 />
          <h2>{tr(copy.common.empty, lang)}</h2>
          <button
            onClick={() => {
              setQ("");
              setContinent("all");
            }}
          >
            {tr(copy.common.clear, lang)}
          </button>
        </div>
      )}
    </div>
  );
}
function PageTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="page-title">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

/** "Başlık: açıklama" biçimindeki satırı kart başlığı ve metnine ayırır. */
function splitItem(text: string) {
  const match = text.match(/^([^:]{2,70}):\s+([\s\S]+)$/);
  return match
    ? { title: match[1].trim(), body: match[2].trim() }
    : { title: "", body: text };
}
function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text
        .split("\n")
        .filter(Boolean)
        .map((line, i) => {
          const m = line.match(/^([^:.!?]{2,42}):\s+(.+)$/);
          return (
            <p key={i} className={className}>
              {m ? <strong>{m[1]}: </strong> : null}
              {m ? m[2] : line}
            </p>
          );
        })}
    </>
  );
}
const factSectionIds = ["butce", "zaman", "vize", "ulasim", "konaklama", "gidis"];
const factIcons: Record<string, React.ReactNode> = {
  butce: <Wallet />,
  zaman: <CalendarDays />,
  vize: <IdCard />,
  ulasim: <Bus />,
  konaklama: <BedDouble />,
  gidis: <Plane />,
};
function CountryPage({ lang }: { lang: Lang }) {
  const { slug } = useParams();
  const c = countries.find((x) => x.slug === slug);
  const rich = slug ? richCountryContent[lang][slug] : undefined;
  useEffect(() => {
    if (!c) return;
    document.title = `${countryName(c, lang)} — Travelista`;
    document
      .querySelector("meta[name=description]")
      ?.setAttribute("content", countryShort(c, lang));
    return () => {
      document.title = "Travelista — Yolculuğun ötesinde";
    };
  }, [c, lang, rich]);
  if (!c) return <NotFound lang={lang} />;
  const trContent = rich;
  const sections = [
    [
      "genel",
      tr(copy.sections.overview, lang),
      trContent?.overview || c.overview[lang],
    ],
    [
      "sehirler",
      tr(copy.sections.cities, lang),
      trContent ? trContent.cities : c.cities,
    ],
    [
      "gezilecek",
      tr(copy.sections.places, lang),
      trContent ? trContent.places : c.places,
    ],
    ["tarih", tr(copy.sections.history, lang), trContent?.history || c.history],
    ["doga", tr(copy.sections.nature, lang), trContent?.nature || c.nature],
    ["yemek", tr(copy.sections.foods, lang), trContent?.foods || c.foods],
    [
      "butce",
      tr(copy.sections.budget, lang),
      trContent?.budget || c.budget[lang],
    ],
    [
      "zaman",
      tr(copy.sections.bestTime, lang),
      trContent?.bestTime || c.bestTime[lang],
    ],
    ["vize", tr(copy.sections.visa, lang), trContent?.visa || c.visa[lang]],
    [
      "ulasim",
      tr(copy.sections.transport, lang),
      trContent?.transport || c.transport[lang],
    ],
    [
      "konaklama",
      tr(copy.sections.stay, lang),
      trContent?.stay || c.stay[lang],
    ],
    [
      "gidis",
      tr(copy.sections.arrival, lang),
      trContent?.arrival || c.arrival[lang],
    ],
    ["ipuclari", tr(copy.sections.tips, lang), trContent?.tips || c.tips],
  ] as const;
  return (
    <article className="country-page">
      <div className="country-hero">
        <VideoHero
          video={c.images.heroVideo}
          poster={c.images.hero}
          alt={countryName(c, lang)}
          lang={lang}
        />
        <Link
          to="/explore"
          className="back"
          aria-label={tr(copy.common.back, lang)}
        >
          <ArrowLeft /> {tr(copy.common.back, lang)}
        </Link>
        <div>
          <span className="eyebrow">
            {continents.find((x) => x.id === c.continent)?.name[lang]} /
            TRAVELISTA
          </span>
          <h1>{countryName(c, lang)}</h1>
          <p>{countryShort(c, lang)}</p>
        </div>
      </div>
      <nav
        className="section-nav"
        aria-label={tr(copy.sections.overview, lang)}
      >
        {sections.slice(0, 8).map((s) => (
          <a key={s[0]} href={`#${s[0]}`}>
            {s[1]}
          </a>
        ))}
      </nav>
      <div className="country-content cards">
        {(() => {
          const upcoming = searchLabels[lang].upcoming;
          const listCard = (s: (typeof sections)[number], index: number) => (
            <section id={s[0]} key={s[0]} className="card-section">
              <div>
                <h2>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {s[1]}
                </h2>
                {Array.isArray(s[2]) && s[2].length ? (
                  <>
                  {(() => {
                    const first = typeof s[2][0] === "string" ? s[2][0] : s[2][0][lang];
                    return !splitItem(first).title && first.length > 100 && s[2].length > 4 ? (
                      <p className="list-intro">{first}</p>
                    ) : null;
                  })()}
                  <ul className="info-cards">
                    {s[2].map((x, lineIndex) => {
                      const text = typeof x === "string" ? x : x[lang];
                      const item = splitItem(text);
                      if (lineIndex === 0 && !item.title && item.body.length > 100 && (s[2] as unknown[]).length > 4) return null;
                      return (
                        <li key={`${item.title}-${lineIndex}`}>
                          {item.title ? <h3>{item.title}</h3> : null}
                          <p>{item.body}</p>
                        </li>
                      );
                    })}
                  </ul>
                  </>
                ) : (
                  <p className="content-upcoming">{upcoming}</p>
                )}
              </div>
            </section>
          );
          const overview = sections.find((s) => s[0] === "genel")!;
          const facts = ["butce", "zaman", "vize", "ulasim", "gidis", "konaklama"]
            .map((id) => sections.find((s) => s[0] === id)!)
            .filter(Boolean);
          const before = sections.filter((s) =>
            ["sehirler", "gezilecek", "tarih", "doga", "yemek"].includes(s[0]),
          );
          const tips = sections.find((s) => s[0] === "ipuclari")!;
          return (
            <>
              <section id="genel" className="card-section overview-card">
                <div>
                  <h2>{overview[1]}</h2>
                  <Paragraphs
                    text={(overview[2] as string) || upcoming}
                    className={overview[2] ? undefined : "content-upcoming"}
                  />
                </div>
              </section>
              {before.map((s, i) => listCard(s, i))}
              <div className="fact-grid">
                {facts.map((s) => (
                  <section id={s[0]} key={s[0]} className="fact-card">
                    <div>
                      <span className="fact-icon" aria-hidden="true">
                        {factIcons[s[0]]}
                      </span>
                      <h2>{s[1]}</h2>
                      <Paragraphs
                        text={(s[2] as string) || upcoming}
                        className={s[2] ? undefined : "content-upcoming"}
                      />
                    </div>
                  </section>
                ))}
              </div>
              {listCard(tips, before.length)}
            </>
          );
        })()}
      </div>
    </article>
  );
}
function About({ lang }: { lang: Lang }) {
  return (
    <div className="inner-page about">
      <PageTitle
        kicker={tr(copy.about.kicker, lang)}
        title={tr(copy.about.title, lang)}
        text={tr(copy.about.lead, lang)}
      />
      <div className="about-copy">
        <p>{tr(copy.about.p1, lang)}</p>
        <p>{tr(copy.about.p2, lang)}</p>
      </div>
    </div>
  );
}
function NotFound({ lang = "tr" }: { lang?: Lang }) {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>{tr(copy.common.notFound, lang)}</h1>
      <Link to="/">{tr(copy.common.returnHome, lang)}</Link>
    </div>
  );
}
function Footer({ lang }: { lang: Lang }) {
  return (
    <footer>
      <div>
        <Link to="/" className="logo">
          Travelista<span>.</span>
        </Link>
        <p>{tr(copy.common.footerText, lang)}</p>
      </div>
      <div>
        <span>{tr(copy.common.exploreLabel, lang)}</span>
        <Link to="/explore">{tr(copy.common.explore, lang)}</Link>
        <Link to="/about">{tr(copy.common.about, lang)}</Link>
      </div>
      <div>
        <span>{tr(copy.common.info, lang)}</span>
        <p>{tr(copy.common.rights, lang)}</p>
        <p>{tr(copy.common.privacy, lang)}</p>
      </div>
    </footer>
  );
}
export default function App() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("travelista-lang") as Lang) || "tr",
  );
  useEffect(() => {
    localStorage.setItem("travelista-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <Layout lang={lang} setLang={setLang}>
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/explore" element={<Destinations lang={lang} />} />
        <Route path="/destinasyonlar" element={<Destinations lang={lang} />} />
        <Route path="/kitalar" element={<Destinations lang={lang} />} />
        <Route path="/ulke/:slug" element={<CountryPage lang={lang} />} />
        <Route path="/country/:slug" element={<CountryPage lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/hakkinda" element={<About lang={lang} />} />
        <Route path="*" element={<NotFound lang={lang} />} />
      </Routes>
    </Layout>
  );
}
