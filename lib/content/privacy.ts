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
          { p: "We use Google Analytics 4 to measure how the site is used, and the Meta Pixel to measure and improve our Facebook and Instagram ads. Both set cookies. We also use Vercel Analytics and our own first-party counters, which set no cookies (see below)." },
          { p: "If you visit from the EEA (including France's overseas departments), the UK, or Switzerland, neither Google Analytics nor the Meta Pixel loads until you accept via the banner, and nothing is sent to Google or Meta if you refuse. Elsewhere they are enabled by default. You can change your choice at any time with the \"Cookie settings\" link at the bottom of every page." },
          { p: "Cookies and local storage we use:" },
          {
            list: [
              "pn_consent — remembers your cookie choice (functional).",
              "pn_eu — your broad region, used only to decide whether the consent banner is required (functional).",
              "Google Analytics cookies (audience measurement) and Meta cookies (advertising measurement) — set only after consent where consent is required.",
              "Marketing attribution (UTM parameters, referrer, landing page) is held in your browser's session storage so we can understand which channel an inquiry came from. Where consent is required, it is stored only after you accept. It is cleared when you close the tab.",
            ],
          },
        ],
      },
      {
        h: "First-party audience measurement (no cookies)",
        blocks: [
          { p: "On our sales pages we count, as anonymous daily totals, page views and taps on our contact buttons (date, language, button position and ad campaign). Nothing is stored on your device, no IP address or identifier is kept, the totals are never linked to an inquiry, and they are deleted after 25 months. Providers: Vercel (hosting) and Upstash (database)." },
        ],
      },
      {
        h: "Information you give us",
        blocks: [
          { p: "When you submit the diagnostic, meeting, careers, or waitlist forms, we collect what you enter — such as your name, email, company, location, role, and the details you describe (and, for careers, your CV). We use this only to respond to you and manage the resulting conversation." },
          { p: "If you message us on WhatsApp, our sales contact (Evan Cao) receives your phone number, your WhatsApp profile name and your messages through WhatsApp (Meta); we use them only to reply to you. If you ask to be called back, we collect your first name, phone number, company (optional) and preferred time slot, only to call you back." },
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
              "Cloudflare Turnstile and Upstash — anti-bot protection and rate limiting (may process your IP address); Upstash also stores the anonymous counters described above.",
              "WhatsApp (Meta) — when you choose to message us on WhatsApp.",
              "Vercel — hosts the site and provides cookieless analytics.",
              "Google and Meta — analytics and measurement, as described above.",
            ],
          },
          { p: "Some of these providers are based outside your country, including in the United States; they handle data under their own standard safeguards. Our team, based in Indonesia, may access inquiry data in order to respond to you. We do not sell your personal data." },
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
          { p: "Depending on where you live (e.g. under the GDPR or CCPA), you may have the right to access, correct, delete, or port your data, to object to or restrict processing, and to withdraw consent. To exercise any of these, email {email}. You can also lodge a complaint with your data-protection authority (in France, the CNIL: cnil.fr)." },
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
    badge: "Confidentialité",
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
          { p: "Nous utilisons Google Analytics 4 pour mesurer l'audience du site, et le pixel Meta pour mesurer et améliorer nos publicités Facebook et Instagram. Tous deux déposent des cookies. Nous utilisons aussi Vercel Analytics et nos propres compteurs internes, qui ne déposent aucun cookie (voir ci-dessous)." },
          { p: "Si vous nous consultez depuis l'EEE (départements et régions d'outre-mer compris), le Royaume-Uni ou la Suisse, ni Google Analytics ni le pixel Meta ne se chargent tant que vous n'avez pas accepté via la bannière, et rien n'est envoyé à Google ou à Meta si vous refusez. Ailleurs, ils sont activés par défaut. Vous pouvez modifier votre choix à tout moment avec le lien « Gérer les cookies » en bas de chaque page." },
          { p: "Cookies et stockage local que nous utilisons :" },
          {
            list: [
              "pn_consent — mémorise votre choix concernant les cookies (fonctionnel).",
              "pn_eu — votre région générale, utilisée uniquement pour déterminer si la bannière de consentement est requise (fonctionnel).",
              "Cookies Google Analytics (mesure d'audience) et Meta (mesure publicitaire) — déposés uniquement après consentement lorsque celui-ci est requis.",
              "L'attribution marketing (paramètres UTM, référent, page d'arrivée) est conservée dans le stockage de session de votre navigateur afin de comprendre par quel canal une demande nous est parvenue. Lorsque le consentement est requis, elle n'est enregistrée qu'après votre accord. Elle est effacée à la fermeture de l'onglet.",
            ],
          },
        ],
      },
      {
        h: "Mesure d'audience interne (sans cookies)",
        blocks: [
          { p: "Sur nos pages commerciales, nous comptons, sous forme de totaux quotidiens anonymes, les visites et les clics sur nos boutons de contact (date, langue, emplacement du bouton et campagne publicitaire). Rien n'est enregistré sur votre appareil, aucune adresse IP ni aucun identifiant n'est conservé, ces totaux ne sont jamais rapprochés d'une demande et ils sont supprimés au bout de 25 mois. Prestataires : Vercel (hébergement) et Upstash (base de données)." },
        ],
      },
      {
        h: "Informations que vous nous fournissez",
        blocks: [
          { p: "Lorsque vous soumettez les formulaires de diagnostic, de rendez-vous, de candidature ou de liste d'attente, nous collectons ce que vous saisissez — comme votre nom, votre e-mail, votre entreprise, votre localisation, votre fonction et les détails que vous décrivez (et, pour les candidatures, votre CV). Nous les utilisons uniquement pour vous répondre et gérer l'échange qui en découle." },
          { p: "Si vous nous écrivez sur WhatsApp, notre interlocuteur commercial (Evan Cao) reçoit votre numéro, votre nom de profil WhatsApp et vos messages via WhatsApp (Meta) ; nous les utilisons uniquement pour vous répondre. Si vous demandez à être rappelé(e), nous collectons votre prénom, votre numéro de téléphone, votre entreprise (facultatif) et le créneau souhaité, uniquement pour vous rappeler." },
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
              "Cloudflare Turnstile et Upstash — protection anti-robots et limitation de débit (peuvent traiter votre adresse IP) ; Upstash conserve aussi les compteurs anonymes décrits ci-dessus.",
              "WhatsApp (Meta) — lorsque vous choisissez de nous écrire sur WhatsApp.",
              "Vercel — héberge le site et fournit une analyse d'audience sans cookies.",
              "Google et Meta — analyse et mesure d'audience, comme décrit ci-dessus.",
            ],
          },
          { p: "Certains de ces prestataires sont situés hors de votre pays, notamment aux États-Unis ; ils traitent les données selon leurs propres garanties standard. Notre équipe, basée en Indonésie, peut accéder aux données de demande pour vous répondre. Nous ne vendons pas vos données personnelles." },
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
          { p: "Selon votre lieu de résidence (par exemple en vertu du RGPD ou du CCPA), vous pouvez avoir le droit d'accéder à vos données, de les rectifier, de les supprimer ou de les transférer, de vous opposer au traitement ou de le limiter, et de retirer votre consentement. Pour exercer l'un de ces droits, écrivez à {email}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (cnil.fr)." },
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
          { p: "Kami menggunakan Google Analytics 4 untuk mengukur penggunaan situs, dan Meta Pixel untuk mengukur serta meningkatkan iklan Facebook dan Instagram kami. Keduanya menyetel cookie. Kami juga menggunakan Vercel Analytics dan penghitung internal kami sendiri, yang tidak menyetel cookie (lihat di bawah)." },
          { p: "Jika Anda mengunjungi dari EEA (termasuk wilayah seberang laut Prancis), Inggris (UK), atau Swiss, Google Analytics dan Meta Pixel tidak dimuat sampai Anda menyetujui melalui banner, dan tidak ada data yang dikirim ke Google atau Meta jika Anda menolak. Di wilayah lain, keduanya aktif secara default. Anda dapat mengubah pilihan kapan saja melalui tautan \"Pengaturan cookie\" di bagian bawah setiap halaman." },
          { p: "Cookie dan penyimpanan lokal yang kami gunakan:" },
          {
            list: [
              "pn_consent — mengingat pilihan cookie Anda (fungsional).",
              "pn_eu — wilayah umum Anda, hanya digunakan untuk menentukan apakah banner persetujuan diperlukan (fungsional).",
              "Cookie Google Analytics (pengukuran audiens) dan Meta (pengukuran iklan) — disetel hanya setelah persetujuan jika persetujuan diperlukan.",
              "Atribusi pemasaran (parameter UTM, perujuk, halaman pendaratan) disimpan di penyimpanan sesi browser Anda agar kami memahami dari saluran mana sebuah permintaan berasal. Jika persetujuan diperlukan, data ini baru disimpan setelah Anda menyetujui. Data ini terhapus saat Anda menutup tab.",
            ],
          },
        ],
      },
      {
        h: "Pengukuran audiens internal (tanpa cookie)",
        blocks: [
          { p: "Di halaman penjualan kami, kami menghitung kunjungan dan ketukan pada tombol kontak sebagai total harian anonim (tanggal, bahasa, posisi tombol, dan kampanye iklan). Tidak ada yang disimpan di perangkat Anda, tidak ada alamat IP atau pengenal yang disimpan, total ini tidak pernah dikaitkan dengan permintaan, dan dihapus setelah 25 bulan. Penyedia: Vercel (hosting) dan Upstash (basis data)." },
        ],
      },
      {
        h: "Informasi yang Anda berikan",
        blocks: [
          { p: "Saat Anda mengirimkan formulir diagnostik, pertemuan, karier, atau daftar tunggu, kami mengumpulkan apa yang Anda masukkan — seperti nama, email, perusahaan, lokasi, peran, dan detail yang Anda uraikan (dan, untuk karier, CV Anda). Kami menggunakannya hanya untuk menanggapi Anda dan mengelola percakapan yang dihasilkan." },
          { p: "Jika Anda mengirim pesan WhatsApp kepada kami, kontak penjualan kami (Evan Cao) menerima nomor Anda, nama profil WhatsApp Anda, dan pesan Anda melalui WhatsApp (Meta); kami menggunakannya hanya untuk membalas Anda. Jika Anda meminta ditelepon kembali, kami mengumpulkan nama depan, nomor telepon, perusahaan (opsional), dan waktu pilihan Anda, hanya untuk menelepon Anda kembali." },
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
              "Cloudflare Turnstile dan Upstash — perlindungan anti-bot dan pembatasan laju (dapat memproses alamat IP Anda); Upstash juga menyimpan penghitung anonim yang dijelaskan di atas.",
              "WhatsApp (Meta) — saat Anda memilih untuk mengirim pesan WhatsApp kepada kami.",
              "Vercel — menghosting situs dan menyediakan analitik tanpa cookie.",
              "Google dan Meta — analitik dan pengukuran, seperti dijelaskan di atas.",
            ],
          },
          { p: "Sebagian penyedia ini berada di luar negara Anda, termasuk di Amerika Serikat; mereka menangani data berdasarkan perlindungan standar mereka sendiri. Tim kami yang berbasis di Indonesia dapat mengakses data permintaan untuk menanggapi Anda. Kami tidak menjual data pribadi Anda." },
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
          { p: "Bergantung pada tempat tinggal Anda (misalnya berdasarkan GDPR atau CCPA), Anda mungkin berhak mengakses, mengoreksi, menghapus, atau memindahkan data Anda, menolak atau membatasi pemrosesan, dan menarik persetujuan. Untuk menggunakan hak-hak ini, kirim email ke {email}. Anda juga dapat mengajukan keluhan kepada otoritas perlindungan data Anda (di Prancis, CNIL: cnil.fr)." },
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
