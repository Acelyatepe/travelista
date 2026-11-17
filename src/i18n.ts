import type { Lang, Text } from "./data";
const t = (tr: string, en: string, de: string): Text => ({ tr, en, de });
export const copy = {
  home: {
    eyebrow: t("DÜNYAYI KEŞFET", "DISCOVER THE WORLD", "ENTDECKE DIE WELT"),
    title: t(
      "Her yolculuk yeni bir hikâye.",
      "Every journey is a new story.",
      "Jede Reise ist eine neue Geschichte.",
    ),
    description: t(
      "Yeni şehirler keşfet, farklı kültürlerle tanış ve unutulmaz rotalar oluştur. Travelista; ülkeler, şehirler, gezilecek yerler, yerel lezzetler ve seyahat ipuçlarıyla bir sonraki yolculuğuna ilham verir.",
      "Discover new cities, encounter different cultures and create unforgettable routes. Travelista inspires your next journey with countries, cities, sights, local flavours and practical tips.",
      "Entdecke neue Städte, lerne andere Kulturen kennen und plane unvergessliche Routen. Travelista inspiriert deine nächste Reise mit Ländern, Städten, Sehenswürdigkeiten, lokalen Spezialitäten und Reisetipps.",
    ),
    cta: t("Rotaları keşfet", "Explore routes", "Routen entdecken"),
    introEyebrow: t(
      "YENİ YERLER, YENİ DENEYİMLER",
      "NEW PLACES, NEW EXPERIENCES",
      "NEUE ORTE, NEUE ERLEBNISSE",
    ),
    introTitle: t(
      "Dünyayı kendi ritminde keşfet.",
      "Discover the world at your own pace.",
      "Entdecke die Welt in deinem eigenen Rhythmus.",
    ),
    introText: t(
      "Tarihi şehirlerden sakin sahil kasabalarına, etkileyici doğa rotalarından hareketli metropollere kadar farklı seyahat seçeneklerini bir araya getiriyoruz. Gitmek istediğin yeri seç, yolculuğunu planlamaya başla.",
      "From historic cities and quiet coastal towns to striking nature routes and lively metropolises, we bring together many ways to travel. Choose where you want to go and start planning.",
      "Von historischen Städten und ruhigen Küstenorten bis zu eindrucksvollen Naturrouten und lebendigen Metropolen: Wähle dein Ziel und beginne mit der Planung.",
    ),
    featuredEyebrow: t(
      "İLHAM VEREN DESTİNASYONLAR",
      "INSPIRING DESTINATIONS",
      "INSPIRIERENDE REISEZIELE",
    ),
    featuredTitle: t("Seçili rotalar", "Selected routes", "Ausgewählte Routen"),
    featuredText: t(
      "Tarihi, doğası, mutfağı ve kendine özgü atmosferiyle öne çıkan ülkeleri keşfet. Her rota, farklı bir kültüre ve unutulmaz bir yolculuğa açılır.",
      "Discover countries defined by history, nature, cuisine and a distinct atmosphere. Every route opens onto another culture and an unforgettable journey.",
      "Entdecke Länder, die durch Geschichte, Natur, Küche und ihre besondere Atmosphäre geprägt sind. Jede Route führt zu einer anderen Kultur und einer unvergesslichen Reise.",
    ),
    allDest: t(
      "Tüm destinasyonları gör",
      "View all destinations",
      "Alle Reiseziele ansehen",
    ),
    discover: t("keşfet", "discover", "entdecken"),
    continentsEyebrow: t(
      "DÜNYANIN FARKLI KÖŞELERİ",
      "CORNERS OF THE WORLD",
      "ECKEN DER WELT",
    ),
    continentsTitle: t(
      "Kıtalar boyunca",
      "Across continents",
      "Über Kontinente hinweg",
    ),
    continentsText: t(
      "Avrupa’nın tarihi şehirlerinden Asya’nın renkli kültürlerine, Afrika’nın eşsiz doğasından Amerika’nın hareketli metropollerine kadar dünyayı bölge bölge keşfet.",
      "Explore the world region by region, from Europe’s historic cities and Asia’s vivid cultures to Africa’s unique nature and the Americas’ energetic metropolises.",
      "Entdecke die Welt Region für Region – von Europas historischen Städten und Asiens vielfältigen Kulturen bis zu Afrikas Natur und den Metropolen Amerikas.",
    ),
    journalEyebrow: t(
      "YOLCULUKTAN İLHAM AL",
      "INSPIRED BY THE JOURNEY",
      "VON DER REISE INSPIRIERT",
    ),
    journalTitle: t("Seyahat notları", "Travel notes", "Reisenotizen"),
    journalText: t(
      "Şehir rehberleri, kişisel rota önerileri, görülmesi gereken yerler ve yolculuğunu kolaylaştıracak pratik bilgiler.",
      "City guides, personal route ideas, essential sights and practical information to make your journey easier.",
      "Stadtführer, persönliche Routenvorschläge, sehenswerte Orte und praktische Informationen für deine Reise.",
    ),
    allPosts: t(
      "Tüm yazıları gör",
      "View all stories",
      "Alle Beiträge ansehen",
    ),
    moodTitle: t(
      "Şehrin ritmi. Doğanın sessizliği.",
      "The rhythm of the city. The silence of nature.",
      "Der Rhythmus der Stadt. Die Stille der Natur.",
    ),
    moodText: t(
      "İster kalabalık şehir sokaklarında kaybol, ister doğanın içinde yavaşla. Sana uygun rotayı seç ve yeni hikâyeler biriktirmeye başla.",
      "Lose yourself in busy streets or slow down in nature. Choose the route that suits you and begin collecting new stories.",
      "Verliere dich in belebten Straßen oder werde in der Natur langsamer. Wähle deine Route und sammle neue Geschichten.",
    ),
    moodLinks: [
      t("Şehirleri keşfet", "Explore cities", "Städte entdecken"),
      t("Doğa rotalarını gör", "View nature routes", "Naturrouten ansehen"),
      t("Yolculuğa başla", "Begin the journey", "Reise beginnen"),
    ],
  },
  common: {
    home: t("Ana Sayfa", "Home", "Startseite"),
    explore: t("Destinasyonlar", "Explore", "Reiseziele"),
    journal: t("Gezi Yazıları", "Journal", "Reiseberichte"),
    about: t("Hakkımızda", "About", "Über uns"),
    contact: t("İletişim", "Contact", "Kontakt"),
    readAll: t("Tümünü oku", "Read all", "Alle lesen"),
    read: t("Yazıyı oku", "Read story", "Beitrag lesen"),
    route: t("Rotayı incele", "View route", "Route ansehen"),
    guide: t("Rehberi incele", "View guide", "Reiseführer ansehen"),
    search: t(
      "Ülke, bölge veya seyahat tarzı ara",
      "Search by country, region or travel mood",
      "Nach Land, Region oder Reisestil suchen",
    ),
    all: t("Tümü", "All", "Alle"),
    routes: t("rota", "routes", "Routen"),
    clear: t("Filtreleri temizle", "Reset filters", "Filter zurücksetzen"),
    empty: t(
      "Aramanızla eşleşen bir rota bulunamadı.",
      "No route matches your search.",
      "Keine Route entspricht deiner Suche.",
    ),
    back: t("Atlas’a dön", "Back to atlas", "Zurück zum Atlas"),
    top: t("Sayfanın başına dön", "Back to top", "Nach oben"),
    language: t("Dil seçimi", "Language selection", "Sprachauswahl"),
    menu: t("Menü", "Menu", "Menü"),
    close: t("Galeriyi kapat", "Close gallery", "Galerie schließen"),
    openGallery: t(
      "galeri görselini aç",
      "open gallery image",
      "Galeriebild öffnen",
    ),
    galleryViewer: t(
      "Galeri görüntüleyici",
      "Gallery viewer",
      "Galerieansicht",
    ),
    imageHelp: t(
      "Görsel eklemek için belirtilen yolu kullanın",
      "Use the indicated path to add an image",
      "Verwende den angegebenen Pfad, um ein Bild hinzuzufügen",
    ),
    notFound: t(
      "Bu rota haritada yok.",
      "This route is not on the map.",
      "Diese Route ist nicht auf der Karte.",
    ),
    returnHome: t("Anasayfaya dön", "Return home", "Zur Startseite"),
    privacy: t("Gizlilik Politikası", "Privacy Policy", "Datenschutzerklärung"),
    terms: t("Kullanım Koşulları", "Terms of Use", "Nutzungsbedingungen"),
    cookies: t("Çerez Politikası", "Cookie Policy", "Cookie-Richtlinie"),
    rights: t(
      "© 2026 Travelista. Tüm hakları saklıdır.",
      "© 2026 Travelista. All rights reserved.",
      "© 2026 Travelista. Alle Rechte vorbehalten.",
    ),
    footerText: t(
      "Dünyanın farklı noktalarını keşfetmek, yolculuklarını planlamak ve yeni rotalardan ilham almak isteyenler için hazırlanmış seyahat rehberi.",
      "A travel guide for discovering the world, planning journeys and finding inspiration for new routes.",
      "Ein Reiseführer zum Entdecken der Welt, Planen von Reisen und Finden neuer Inspiration.",
    ),
    exploreLabel: t("KEŞFET", "EXPLORE", "ENTDECKEN"),
    info: t("BİLGİ", "INFORMATION", "INFORMATION"),
  },
  sections: {
    overview: t("Ülke genel bakışı", "Country overview", "Land im Überblick"),
    cities: t(
      "En popüler şehirler",
      "Most popular cities",
      "Beliebteste Städte",
    ),
    places: t("Gezilecek yerler", "Places to visit", "Sehenswürdigkeiten"),
    history: t("Tarihi yerler", "Historical sites", "Historische Orte"),
    nature: t("Doğa", "Nature and landscapes", "Natur und Landschaft"),
    foods: t("Yerel yemekler", "Local food", "Lokale Küche"),
    budget: t(
      "Bütçe ve fiyat seviyesi",
      "Budget and price level",
      "Budget und Preisniveau",
    ),
    bestTime: t("Ne zaman gidilir", "Best time to visit", "Beste Reisezeit"),
    visa: t("Vize bilgisi", "Visa information", "Visainformationen"),
    transport: t("Ulaşım", "Transportation", "Verkehrsmittel"),
    stay: t(
      "Konaklama bölgeleri",
      "Best areas to stay",
      "Empfohlene Stadtteile",
    ),
    arrival: t("Nasıl gidilir", "How to get there", "Anreise"),
    gallery: t("Fotoğraf galerisi", "Photo gallery", "Fotogalerie"),
    articles: t("Gezi yazıları", "Travel stories", "Reiseberichte"),
    tips: t("Seyahat ipuçları", "Travel tips", "Reisetipps"),
  },
  about: {
    kicker: t("HAKKIMIZDA", "ABOUT", "ÜBER UNS"),
    title: t(
      "Merakın peşinde, özenle.",
      "Curiosity, thoughtfully pursued.",
      "Der Neugier mit Sorgfalt folgen.",
    ),
    lead: t(
      "Travelista, bir yeri yalnızca görmenin değil anlamanın da mümkün olduğuna inanır.",
      "Travelista believes a place can be understood, not merely seen.",
      "Travelista glaubt, dass man einen Ort nicht nur sehen, sondern verstehen kann.",
    ),
    p1: t(
      "Hızlı listeler yerine güçlü bağlam, turistik kalabalıklar yerine yerel ritimler öneriyoruz.",
      "We favour meaningful context over quick lists and local rhythms over tourist crowds.",
      "Wir setzen auf echten Kontext statt schneller Listen und auf lokale Rhythmen statt Touristenmassen.",
    ),
    p2: t(
      "Her rehber; kültür, doğa, sofra ve pratik seyahat bilgisini dengeli bir anlatıda buluşturmak için tasarlandı.",
      "Every guide brings culture, nature, food and practical knowledge together in a balanced narrative.",
      "Jeder Reiseführer verbindet Kultur, Natur, Küche und praktische Informationen zu einer ausgewogenen Erzählung.",
    ),
  },
};
export const c = (value: Text, lang: Lang) => value[lang];
export const stories = [
  {
    title: t(
      "Riga’da kuzey ışığı izlenir mi?",
      "Can you see the northern lights in Riga?",
      "Kann man in Riga Nordlichter sehen?",
    ),
    text: t(
      "Letonya’da kuzey ışıklarını görme ihtimalinin arttığı dönemleri, uygun gözlem noktalarını ve yolculuk öncesinde bilmen gerekenleri keşfet.",
      "Discover the best seasons and observation points for seeing the northern lights in Latvia.",
      "Entdecke die besten Zeiten und Beobachtungsorte für Nordlichter in Lettland.",
    ),
    action: "read",
  },
  {
    title: t(
      "İstanbul’da bir hafta sonu",
      "A weekend in Istanbul",
      "Ein Wochenende in Istanbul",
    ),
    text: t(
      "Tarihi yarımadadan Boğaz kıyılarına uzanan, iki güne sığdırabileceğin dengeli bir İstanbul gezi rotası.",
      "A balanced two-day Istanbul route from the historic peninsula to the shores of the Bosphorus.",
      "Eine ausgewogene zweitägige Istanbul-Route von der historischen Halbinsel bis zum Bosporus.",
    ),
    action: "route",
  },
  {
    title: t(
      "Kotor Körfezi boyunca yolculuk",
      "A journey around the Bay of Kotor",
      "Eine Reise entlang der Bucht von Kotor",
    ),
    text: t(
      "Kotor, Perast ve çevresindeki sahil kasabalarını kapsayan manzaralı bir Karadağ rotası.",
      "A scenic Montenegro route through Kotor, Perast and neighbouring coastal towns.",
      "Eine malerische Montenegro-Route durch Kotor, Perast und die umliegenden Küstenorte.",
    ),
    action: "read",
  },
  {
    title: t(
      "Berlin’i yerel biri gibi keşfet",
      "Discover Berlin like a local",
      "Berlin wie ein Einheimischer entdecken",
    ),
    text: t(
      "Berlin’in tarihi noktalarını, yaratıcı mahallelerini, müzelerini ve şehir yaşamını bir araya getiren alternatif gezi rehberi.",
      "An alternative guide combining Berlin’s historic sites, creative neighbourhoods, museums and city life.",
      "Ein alternativer Guide zu Berlins Geschichte, kreativen Vierteln, Museen und Stadtleben.",
    ),
    action: "guide",
  },
  {
    title: t(
      "Kapadokya için en güzel mevsim",
      "The best season for Cappadocia",
      "Die beste Reisezeit für Kappadokien",
    ),
    text: t(
      "Balon manzaraları, vadi yürüyüşleri ve açık hava gezileri için Kapadokya’ya ne zaman gidilmesi gerektiğini öğren.",
      "Learn when to visit Cappadocia for balloons, valley walks and outdoor adventures.",
      "Erfahre, wann sich Kappadokien für Ballons, Talwanderungen und Ausflüge am besten eignet.",
    ),
    action: "read",
  },
];
export const featuredDescriptions: Record<string, Text> = {
  turkiye: t(
    "",
    "A rich route from Istanbul’s historic streets and Cappadocia’s extraordinary valleys to the Aegean coast and Black Sea highlands.",
    "Eine vielfältige Route von Istanbuls historischen Straßen und Kappadokiens Tälern bis zur Ägäis und den Hochebenen am Schwarzen Meer.",
  ),
  germany: t(
    "",
    "One of Europe’s most varied destinations, with historic cities, striking castles, modern metropolises and nature-rich routes.",
    "Eines der vielseitigsten Reiseziele Europas mit historischen Städten, Burgen, modernen Metropolen und naturnahen Routen.",
  ),
  latvia: t(
    "",
    "A peaceful Northern European experience of Riga’s Art Nouveau streets, Baltic shores, quiet towns and vast forests.",
    "Ein ruhiges Nordeuropa-Erlebnis mit Rigas Jugendstil, der Ostseeküste, stillen Orten und weiten Wäldern.",
  ),
  montenegro: t(
    "",
    "A small country full of discovery, with the Bay of Kotor, historic coastal towns and mountain-framed landscapes.",
    "Ein kleines, entdeckungsreiches Land mit der Bucht von Kotor, historischen Küstenorten und Bergen.",
  ),
  italy: t(
    "",
    "A timeless journey from Rome’s heritage and Tuscany’s quiet landscapes to Venice’s canals and the Amalfi coast.",
    "Eine zeitlose Reise von Roms Erbe und der Toskana bis zu Venedigs Kanälen und der Amalfiküste.",
  ),
  japan: t(
    "",
    "Traditional temples, modern cities, cherry blossom and distinctive cuisine bring past and future together.",
    "Traditionelle Tempel, moderne Städte, Kirschblüten und eine eigenständige Küche verbinden Vergangenheit und Zukunft.",
  ),
};
export const tr = (text: Text, lang: Lang) => text[lang];
