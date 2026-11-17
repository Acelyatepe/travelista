import type { Country, Lang } from "./data";

export const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/\s+/g, " ")
    .trim();

export const sortCountriesByName = (
  list: readonly Country[],
  lang: Lang,
  getName: (country: Country, lang: Lang) => string = (country, currentLang) =>
    country.name[currentLang],
) =>
  [...list].sort((a, b) =>
    getName(a, lang).localeCompare(
      getName(b, lang),
      lang === "tr" ? "tr-TR" : lang,
    ),
  );
