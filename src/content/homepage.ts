import type { Text } from "../data";

const text = (tr: string, en: string, de: string): Text => ({ tr, en, de });

// Ana sayfanın 10 saniyelik açılışında görünen bütün metinler bu dosyadan düzenlenir.
export const homepageExperience = {
  phaseOne: {
    wordmark: "TRAVELISTA ATLAS",
    hint: text(
      "KEŞFETMEK İÇİN KAYDIR",
      "SCROLL TO DISCOVER",
      "ZUM ENTDECKEN SCROLLEN",
    ),
  },
  phaseTwo: {
    title: "DISTANCE",
  },
  phaseThree: {
    title: text("YAŞAYAN ROTALAR", "LIVING ROUTES", "LEBENDIGE ROUTEN"),
  },
  phaseFour: {
    statement: text(
      "TRAVELISTA, DÜNYAYI MANZARALARI, KÜLTÜRLERİ VE YEREL RİTİMLERİ ÜZERİNDEN KEŞFETMEK İÇİN TASARLANMIŞ YAŞAYAN BİR ATLASTIR.",
      "TRAVELISTA IS A LIVING ATLAS DESIGNED TO DISCOVER THE WORLD THROUGH LANDSCAPES, CULTURES AND LOCAL RHYTHMS.",
      "TRAVELISTA IST EIN LEBENDIGER ATLAS, DER DIE WELT DURCH LANDSCHAFTEN, KULTUREN UND LOKALE RHYTHMEN ERSCHLIESST.",
    ),
    aside: text(
      "Yavaş yolculuk. Derin keşif. Hatırlanan rotalar.",
      "Slow travel. Deep discovery. Routes worth remembering.",
      "Langsames Reisen. Tiefes Entdecken. Routen, die bleiben.",
    ),
  },
  replay: text(
    "Animasyonu yeniden oynat",
    "Replay animation",
    "Animation wiederholen",
  ),
};

// Ana sayfada gösterilecek ülkeleri slug değerleriyle buradan değiştirebilirsiniz.
export const featuredCountrySlugs = [
  "turkiye",
  "united-states",
  "canada",
  "montenegro",
  "egypt",
  "united-arab-emirates",
];
