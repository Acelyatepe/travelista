# Travelista içerik düzenleme rehberi

Kod bileşenlerine dokunmadan içerik değiştirmek için:

- Ana sayfanın 10 saniyelik açılış metinleri ve seçili ülkeler: `homepage.ts`
- Menü, buton, başlık ve üç dildeki genel metinler: `../i18n.ts`
- Ülke adları, slug, kıta, görsel/video yolları ve üç dilli temel içerik: `../data.ts`
- Ayrıntılı Türkçe ülke yazılarının tek kaynağı: `countries-tr.txt`
- Ayrıntılı İngilizce ve Almanca ülke yazıları: `countries-en.txt` ve `countries-de.txt`. Bu dosyalarda yalnızca çevrilmiş ülkeler bulunur; çevirisi olmayan ülkelerde `data.ts` içindeki kısa içerik gösterilir. Yeni bir ülke çevirisi eklemek için aynı `@@country ulke-slug` düzeniyle bir blok ekleyin (başlıklar o dilde yazılır; mevcut Türkiye bloğunu örnek alın).
- Ayrıntılı metinleri sayfalara bağlayan bölüm ayrıştırıcısı: `../homeCountryContent.ts`

## Yeni ülke ekleme

`data.ts` içindeki `raw` listesine mevcut satırlarla aynı biçimde ülkeyi ekleyin. Slug küçük harfli ve URL uyumlu olmalıdır.

Tüm ayrıntılı Türkçe ülke metinlerini `countries-tr.txt` dosyasından doğrudan düzenleyebilirsiniz. Başlıkları değiştirmeden yalnızca başlıkların altındaki metinleri düzenlemeniz yeterlidir. Vite bu dosyayı kaynak olarak içe aktardığı için `npm run dev` açıkken kaydettiğiniz değişiklikler otomatik olarak sayfaya yansır.

Her ülke `@@country ulke-slug` satırıyla başlar. Bu satırı ve bölüm başlıklarını koruyun. `Ülke Adı`, `Kısa Açıklama` ve bütün detay bölümleri aynı bloktan yüklenir. Yeni bir ülke için mevcut bir bloğu kopyalayıp slug değerini `data.ts` içindeki slug ile aynı yazabilirsiniz.

`En Popüler Şehirler`, `Gezilecek Yerler`, `Tarihi Yerler`, `Doğa`, `Yerel Yemekler`, `Fotoğraf Galerisi` ve `Seyahat İpuçları` bölümlerinde her dolu satır sitede ayrı bir satır olarak gösterilir. Satırların başına `-`, `•` veya HTML etiketi eklemeniz gerekmez. Genel bakış, bütçe, zaman, vize, ulaşım, konaklama ve nasıl gidilir alanları normal paragraf olarak birleştirilir.

Ana sayfada gösterilen kartları değiştirmek için `homepage.ts` dosyasındaki `featuredCountrySlugs` listesine `data.ts` içindeki slug değerlerini yazın. Kartların sırası bu listedeki sıraya göre oluşur.

## Görsel ve video ekleme

`public/images/countries/ULKE-SLUG/` klasörüne şu dosyaları koyabilirsiniz:

- `hero.mp4`: ülke sayfasının sessiz, döngülü hero videosu
- `hero.webp`: video yüklenene kadar gösterilen poster
- `card.webp`: ülke kartı
- `gallery-01.webp` … `gallery-04.webp`: galeri görselleri

Dosya adlarını koruduğunuzda bileşen kodunu değiştirmeniz gerekmez.

Ana sayfa videosu `public/images/home/travelista-hero.mp4` dosyasıdır. Aynı adla yeni bir video koyarak ana sayfa videosunu daha sonra kendiniz değiştirebilirsiniz.
