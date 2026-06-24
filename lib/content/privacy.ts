// Trilingual privacy-policy content. The page (app/[locale]/privacy/page.tsx)
// renders from this so en/fr/id stay in sync. Identifiers (pn_consent, pn_eu,
// product/tool names) are intentionally left untranslated. Paragraphs may use
// the tokens {site}, {legal}, and {email}, which the page substitutes.
export type PrivacyBlock = { p: string } | { list: string[] };
export type PrivacySection = { h: string; blocks: PrivacyBlock[] };

export type PrivacyDoc = {
  badge: string;
  title: string;
  metaDescription: string;
  updatedLabel: string;
  intro: PrivacyBlock[];
  sections: PrivacySection[];
  back: string;
};

export type PrivacyLocale = "en" | "fr" | "id";

export const PRIVACY: Record<PrivacyLocale, PrivacyDoc> = {
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    metaDescription:
      "How PRIONATION.io collects, uses, and protects your data — analytics, cookies, consent, the inquiry forms, and your rights.",
    updatedLabel: "Last updated",
    intro: [
      {
        p: "This policy explains what {site} ({legal}) collects when you visit this site or contact us, why, and the choices you have. Questions: {email}.",
      },
    ],
    sections: [
      {
        h: "Analytics & cookies",
        blocks: [
          { p: "We use Google Analytics 4 and the Meta Pixel to understand how the site is used, and Vercel Analytics (which is cookieless). Google Analytics and the Meta Pixel set cookies." },
          { p: "If you visit from the EEA, the UK, or Switzerland, these are off by default — Google Analytics runs in cookieless Consent Mode and the Meta Pixel does not load until you accept via the banner. Elsewhere they are enabled by default. You can change your choice at any time by clearing this site's cookies/site data, which brings the banner back where applicable." },
          { p: "Cookies and local storage we use:" },
          {
            list: [
              "pn_consent — remembers your cookie choice (functional).",
              "pn_eu — your broad region, used only to decide whether the consent banner is required (functional).",
              "Google Analytics / Meta cookies — set only after consent (where required), for measurement.",
              "Marketing attribution (UTM parameters, referrer, landing page) is held in your browser's session storage so we can understand which channel an inquiry came from. It is not a cookie and is cleared when you close the tab.",
            ],
          },
        ],
      },
      {
        h: "Information you give us",
        blocks: [
          { p: "When you submit the diagnostic, meeting, careers, or waitlist forms, we collect what you enter — such as your name, email, company, location, role, and the details you describe (and, for careers, your CV). We use this only to respond to you and manage the resulting conversation." },
        ],
      },
      {
        h: "How your data is processed",
        blocks: [
          { p: "We rely on a small set of established service providers (processors):" },
          {
            list: [
              "Notion — stores form submissions and our sales pipeline.",
              "Resend — sends confirmation and notification emails.",
              "Supabase — stores CV files uploaded with career applications.",
              "Cloudflare Turnstile and Upstash — anti-bot protection and rate limiting (may process your IP address).",
              "Vercel — hosts the site and provides cookieless analytics.",
              "Google and Meta — analytics and measurement, as described above.",
            ],
          },
          { p: "Some of these providers are based outside your country, including in the United States; they handle data under their own standard safeguards. We do not sell your personal data." },
        ],
      },
      {
        h: "Legal bases & retention",
        blocks: [
          { p: "Where the GDPR applies, we process inquiry data to take steps at your request and on the basis of our legitimate interest in responding to prospective clients and candidates; analytics and marketing cookies are processed on the basis of your consent. We keep inquiry data for as long as needed to handle your request and any resulting engagement, then delete or anonymize it." },
        ],
      },
      {
        h: "Your rights",
        blocks: [
          { p: "Depending on where you live (e.g. under the GDPR or CCPA), you may have the right to access, correct, delete, or port your data, to object to or restrict processing, and to withdraw consent. To exercise any of these, email {email}." },
        ],
      },
      {
        h: "Changes",
        blocks: [
          { p: 'We may update this policy as the site and our tools evolve. Material changes will be reflected by the "last updated" date above.' },
        ],
      },
    ],
    back: "Back to home",
  },

  fr: {
    badge: "Mentions légales",
    title: "Politique de confidentialité",
    metaDescription:
      "Comment PRIONATION.io collecte, utilise et protège vos données — analyse d'audience, cookies, consentement, formulaires de contact et vos droits.",
    updatedLabel: "Dernière mise à jour",
    intro: [
      {
        p: "Cette politique explique ce que {site} ({legal}) collecte lorsque vous visitez ce site ou nous contactez, pourquoi, et les choix dont vous disposez. Questions : {email}.",
      },
    ],
    sections: [
      {
        h: "Analyse d'audience & cookies",
        blocks: [
          { p: "Nous utilisons Google Analytics 4 et le Meta Pixel pour comprendre comment le site est utilisé, ainsi que Vercel Analytics (sans cookies). Google Analytics et le Meta Pixel déposent des cookies." },
          { p: "Si vous nous consultez depuis l'EEE, le Royaume-Uni ou la Suisse, ces outils sont désactivés par défaut — Google Analytics fonctionne en mode Consentement sans cookies et le Meta Pixel ne se charge pas tant que vous n'avez pas accepté via la bannière. Ailleurs, ils sont activés par défaut. Vous pouvez modifier votre choix à tout moment en effaçant les cookies / données de ce site, ce qui réaffiche la bannière le cas échéant." },
          { p: "Cookies et stockage local que nous utilisons :" },
          {
            list: [
              "pn_consent — mémorise votre choix concernant les cookies (fonctionnel).",
              "pn_eu — votre région générale, utilisée uniquement pour déterminer si la bannière de consentement est requise (fonctionnel).",
              "Cookies Google Analytics / Meta — déposés uniquement après consentement (lorsque requis), à des fins de mesure.",
              "L'attribution marketing (paramètres UTM, référent, page d'arrivée) est conservée dans le stockage de session de votre navigateur afin de comprendre par quel canal une demande nous est parvenue. Ce n'est pas un cookie et elle est effacée à la fermeture de l'onglet.",
            ],
          },
        ],
      },
      {
        h: "Informations que vous nous fournissez",
        blocks: [
          { p: "Lorsque vous soumettez les formulaires de diagnostic, de rendez-vous, de candidature ou de liste d'attente, nous collectons ce que vous saisissez — comme votre nom, votre e-mail, votre entreprise, votre localisation, votre fonction et les détails que vous décrivez (et, pour les candidatures, votre CV). Nous les utilisons uniquement pour vous répondre et gérer l'échange qui en découle." },
        ],
      },
      {
        h: "Comment vos données sont traitées",
        blocks: [
          { p: "Nous nous appuyons sur un petit nombre de prestataires établis (sous-traitants) :" },
          {
            list: [
              "Notion — stocke les soumissions de formulaires et notre pipeline commercial.",
              "Resend — envoie les e-mails de confirmation et de notification.",
              "Supabase — stocke les fichiers de CV envoyés avec les candidatures.",
              "Cloudflare Turnstile et Upstash — protection anti-robots et limitation de débit (peuvent traiter votre adresse IP).",
              "Vercel — héberge le site et fournit une analyse d'audience sans cookies.",
              "Google et Meta — analyse et mesure d'audience, comme décrit ci-dessus.",
            ],
          },
          { p: "Certains de ces prestataires sont situés hors de votre pays, notamment aux États-Unis ; ils traitent les données selon leurs propres garanties standard. Nous ne vendons pas vos données personnelles." },
        ],
      },
      {
        h: "Bases légales & conservation",
        blocks: [
          { p: "Lorsque le RGPD s'applique, nous traitons les données de demande pour prendre des mesures à votre demande et sur la base de notre intérêt légitime à répondre aux clients et candidats potentiels ; les cookies d'analyse et de marketing sont traités sur la base de votre consentement. Nous conservons les données de demande aussi longtemps que nécessaire pour traiter votre demande et la relation qui en découle, puis nous les supprimons ou les anonymisons." },
        ],
      },
      {
        h: "Vos droits",
        blocks: [
          { p: "Selon votre lieu de résidence (par exemple en vertu du RGPD ou du CCPA), vous pouvez avoir le droit d'accéder à vos données, de les rectifier, de les supprimer ou de les transférer, de vous opposer au traitement ou de le limiter, et de retirer votre consentement. Pour exercer l'un de ces droits, écrivez à {email}." },
        ],
      },
      {
        h: "Modifications",
        blocks: [
          { p: "Nous pouvons mettre à jour cette politique à mesure que le site et nos outils évoluent. Les changements importants seront reflétés par la date de « dernière mise à jour » ci-dessus." },
        ],
      },
    ],
    back: "Retour à l'accueil",
  },

  id: {
    badge: "Legal",
    title: "Kebijakan Privasi",
    metaDescription:
      "Bagaimana PRIONATION.io mengumpulkan, menggunakan, dan melindungi data Anda — analitik, cookie, persetujuan, formulir kontak, dan hak Anda.",
    updatedLabel: "Terakhir diperbarui",
    intro: [
      {
        p: "Kebijakan ini menjelaskan data apa yang dikumpulkan {site} ({legal}) saat Anda mengunjungi situs ini atau menghubungi kami, alasannya, dan pilihan yang Anda miliki. Pertanyaan: {email}.",
      },
    ],
    sections: [
      {
        h: "Analitik & cookie",
        blocks: [
          { p: "Kami menggunakan Google Analytics 4 dan Meta Pixel untuk memahami bagaimana situs digunakan, serta Vercel Analytics (yang tanpa cookie). Google Analytics dan Meta Pixel menyetel cookie." },
          { p: "Jika Anda mengunjungi dari EEA, Inggris (UK), atau Swiss, keduanya nonaktif secara default — Google Analytics berjalan dalam Mode Persetujuan tanpa cookie dan Meta Pixel tidak dimuat sampai Anda menyetujui melalui banner. Di wilayah lain, keduanya aktif secara default. Anda dapat mengubah pilihan kapan saja dengan menghapus cookie/data situs ini, yang akan menampilkan kembali banner bila berlaku." },
          { p: "Cookie dan penyimpanan lokal yang kami gunakan:" },
          {
            list: [
              "pn_consent — mengingat pilihan cookie Anda (fungsional).",
              "pn_eu — wilayah umum Anda, hanya digunakan untuk menentukan apakah banner persetujuan diperlukan (fungsional).",
              "Cookie Google Analytics / Meta — disetel hanya setelah persetujuan (jika diperlukan), untuk pengukuran.",
              "Atribusi pemasaran (parameter UTM, perujuk, halaman pendaratan) disimpan di penyimpanan sesi browser Anda agar kami memahami dari saluran mana sebuah permintaan berasal. Ini bukan cookie dan terhapus saat Anda menutup tab.",
            ],
          },
        ],
      },
      {
        h: "Informasi yang Anda berikan",
        blocks: [
          { p: "Saat Anda mengirimkan formulir diagnostik, pertemuan, karier, atau daftar tunggu, kami mengumpulkan apa yang Anda masukkan — seperti nama, email, perusahaan, lokasi, peran, dan detail yang Anda uraikan (dan, untuk karier, CV Anda). Kami menggunakannya hanya untuk menanggapi Anda dan mengelola percakapan yang dihasilkan." },
        ],
      },
      {
        h: "Bagaimana data Anda diproses",
        blocks: [
          { p: "Kami mengandalkan sejumlah kecil penyedia layanan tepercaya (pemroses):" },
          {
            list: [
              "Notion — menyimpan kiriman formulir dan pipeline penjualan kami.",
              "Resend — mengirim email konfirmasi dan notifikasi.",
              "Supabase — menyimpan berkas CV yang diunggah pada lamaran karier.",
              "Cloudflare Turnstile dan Upstash — perlindungan anti-bot dan pembatasan laju (dapat memproses alamat IP Anda).",
              "Vercel — menghosting situs dan menyediakan analitik tanpa cookie.",
              "Google dan Meta — analitik dan pengukuran, seperti dijelaskan di atas.",
            ],
          },
          { p: "Sebagian penyedia ini berada di luar negara Anda, termasuk di Amerika Serikat; mereka menangani data berdasarkan perlindungan standar mereka sendiri. Kami tidak menjual data pribadi Anda." },
        ],
      },
      {
        h: "Dasar hukum & penyimpanan",
        blocks: [
          { p: "Jika GDPR berlaku, kami memproses data permintaan untuk mengambil langkah atas permintaan Anda dan atas dasar kepentingan sah kami dalam menanggapi calon klien dan kandidat; cookie analitik dan pemasaran diproses atas dasar persetujuan Anda. Kami menyimpan data permintaan selama diperlukan untuk menangani permintaan Anda dan hubungan yang dihasilkan, lalu menghapus atau menganonimkannya." },
        ],
      },
      {
        h: "Hak Anda",
        blocks: [
          { p: "Bergantung pada tempat tinggal Anda (misalnya berdasarkan GDPR atau CCPA), Anda mungkin berhak mengakses, mengoreksi, menghapus, atau memindahkan data Anda, menolak atau membatasi pemrosesan, dan menarik persetujuan. Untuk menggunakan hak-hak ini, kirim email ke {email}." },
        ],
      },
      {
        h: "Perubahan",
        blocks: [
          { p: 'Kami dapat memperbarui kebijakan ini seiring berkembangnya situs dan alat kami. Perubahan penting akan tercermin pada tanggal "terakhir diperbarui" di atas.' },
        ],
      },
    ],
    back: "Kembali ke beranda",
  },
};
