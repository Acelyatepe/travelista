export interface RichCountryContent {
  name: string;
  short: string;
  overview: string;
  cities: string[];
  places: string[];
  history: string[];
  nature: string[];
  foods: string[];
  budget: string;
  bestTime: string;
  visa: string;
  transport: string;
  stay: string;
  arrival: string;
  gallery: string[];
  tips: string[];
}

const normalizeHeading = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

const headings: Record<string, keyof RichCountryContent> = {
  "ulke genel bakisi": "overview",
  "en populer sehirler": "cities",
  "gezilecek yerler": "places",
  "tarihi yerler": "history",
  doga: "nature",
  "yerel yemekler": "foods",
  "butce fiyat seviyesi": "budget",
  "butce ve fiyat seviyesi": "budget",
  "ne zaman gidilir": "bestTime",
  "vize bilgisi": "visa",
  ulasim: "transport",
  "konaklama bolgeleri": "stay",
  "nasil gidilir": "arrival",
  "fotograf galerisi": "gallery",
  "seyahat ipuclari": "tips",
  // English (content/countries-en.txt)
  "country overview": "overview",
  "most popular cities": "cities",
  "places to visit": "places",
  "historic sites": "history",
  nature: "nature",
  "local food": "foods",
  "budget and price level": "budget",
  "when to go": "bestTime",
  "visa information": "visa",
  "getting around": "transport",
  "where to stay": "stay",
  "getting there": "arrival",
  "photo gallery": "gallery",
  "travel tips": "tips",
  // Deutsch (content/countries-de.txt)
  landeruberblick: "overview",
  "beliebteste stadte": "cities",
  sehenswurdigkeiten: "places",
  "historische orte": "history",
  natur: "nature",
  "lokale kuche": "foods",
  "budget und preisniveau": "budget",
  "beste reisezeit": "bestTime",
  visum: "visa",
  "unterwegs im land": "transport",
  unterkunft: "stay",
  anreise: "arrival",
  fotogalerie: "gallery",
  reisetipps: "tips",
};

const inlineBudgetHeading = /b[üu]t[cç]e\s*(?:\/|ve)?\s*fiyat\s+seviyesi\??/i;

function parseBlock(block: string): RichCountryContent {
  const lines = block.split(/\r?\n/);
  const field = (labels: string[]) => {
    for (const rawLine of lines) {
      const line = rawLine.trim();
      const label = labels.find((item) => line.startsWith(`${item}:`));
      if (label) return line.slice(label.length + 1).trim();
    }
    return "";
  };
  const name = field(["Ülke Adı", "Country Name", "Ländername"]);
  const short = field([
    "Kısa Açıklama",
    "Short Description",
    "Kurzbeschreibung",
  ]);
  const buckets: Partial<Record<keyof RichCountryContent, string[]>> = {};
  let active: keyof RichCountryContent | undefined;

  for (const originalLine of lines) {
    const line = originalLine.trim().replace(/^[-*]\s*/, "");
    const inlineBudget = line.match(inlineBudgetHeading);
    if (inlineBudget?.index && inlineBudget.index > 0) {
      const precedingContent = line.slice(0, inlineBudget.index).trim();
      if (active && precedingContent) buckets[active]!.push(precedingContent);
      active = "budget";
      buckets[active] ||= [];
      const trailingContent = line
        .slice(inlineBudget.index + inlineBudget[0].length)
        .trim();
      if (trailingContent) buckets[active]!.push(trailingContent);
      continue;
    }

    const heading = headings[normalizeHeading(line)];
    if (heading) {
      active = heading;
      buckets[active] ||= [];
      continue;
    }
    if (active && line && !line.startsWith("@@country ")) {
      buckets[active]!.push(line.replace(/^\d+\.\s*/, ""));
    }
  }

  const paragraph = (key: keyof RichCountryContent) =>
    (buckets[key] || []).join("\n");

  return {
    name,
    short,
    overview: paragraph("overview"),
    cities: buckets.cities || [],
    places: buckets.places || [],
    history: buckets.history || [],
    nature: buckets.nature || [],
    foods: buckets.foods || [],
    budget: paragraph("budget"),
    bestTime: paragraph("bestTime"),
    visa: paragraph("visa"),
    transport: paragraph("transport"),
    stay: paragraph("stay"),
    arrival: paragraph("arrival"),
    gallery: buckets.gallery || [],
    tips: buckets.tips || [],
  };
}

/** Aynı `@@country slug` şeması bütün ülkeler için kullanılır. */
export function parseCountryContent(source: string) {
  const content: Record<string, RichCountryContent> = {};
  const blocks = source.split(/^@@country\s+/m).slice(1);
  const requiredFields: (keyof RichCountryContent)[] = [
    "name",
    "short",
    "overview",
    "cities",
    "places",
    "history",
    "nature",
    "foods",
    "budget",
    "bestTime",
    "visa",
    "transport",
    "stay",
    "arrival",
    "gallery",
    "tips",
  ];

  for (const block of blocks) {
    const newline = block.indexOf("\n");
    const slug = block.slice(0, newline).trim();
    if (!slug || content[slug]) continue;
    const parsed = parseBlock(block.slice(newline + 1));
    const missing = requiredFields.filter((field) => !parsed[field].length);
    if (missing.length && import.meta.env.DEV)
      console.warn(
        `${slug} içeriğinde eksik alanlar var: ${missing.join(", ")}`,
      );
    content[slug] = parsed;
  }

  return content;
}
