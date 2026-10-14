// Trilingual legal notice ("mentions légales"), rendered by
// app/[locale]/mentions-legales/page.tsx. The facts themselves (entity, host,
// contact) come from lib/seo/site.ts so they stay in one place; this file only
// holds the labels and the surrounding sentences.
export type LegalLocale = "en" | "fr" | "id";

export type LegalDoc = {
  badge: string;
  title: string;
  metaDescription: string;
  labels: {
    publisher: string;
    name: string;
    legalForm: string;
    registration: string;
    address: string;
    director: string;
    contact: string;
    email: string;
    phone: string;
    host: string;
    team: string;
    privacy: string;
  };
  teamText: string;
  privacyText: string;
  privacyLink: string;
  back: string;
};

export const LEGAL: Record<LegalLocale, LegalDoc> = {
  en: {
    badge: "Legal",
    title: "Legal notice",
    metaDescription: "Publisher, publication director, contact details and host of PRIONATION.io.",
    labels: {
      publisher: "Publisher",
      name: "Name",
      legalForm: "Legal form",
      registration: "Registration",
      address: "Registered office",
      director: "Publication director",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      host: "Hosting",
      team: "Team",
      privacy: "Personal data",
    },
    teamText: "Our engineering team is based in Bali, Indonesia. Sales contact in Paris: Evan Cao.",
    privacyText: "How we collect and use personal data, and your rights, are described in our",
    privacyLink: "privacy policy",
    back: "Back to home",
  },
  fr: {
    badge: "Légal",
    title: "Mentions légales",
    metaDescription: "Éditeur, directeur de la publication, coordonnées et hébergeur de PRIONATION.io.",
    labels: {
      publisher: "Éditeur du site",
      name: "Dénomination",
      legalForm: "Forme juridique",
      registration: "Immatriculation",
      address: "Siège social",
      director: "Directeur de la publication",
      contact: "Contact",
      email: "E-mail",
      phone: "Téléphone",
      host: "Hébergeur",
      team: "Équipe",
      privacy: "Données personnelles",
    },
    teamText: "Notre équipe d'ingénieurs est basée à Bali (Indonésie). Interlocuteur commercial à Paris : Evan Cao.",
    privacyText: "La collecte et l'utilisation de vos données personnelles, ainsi que vos droits, sont décrites dans notre",
    privacyLink: "politique de confidentialité",
    back: "Retour à l'accueil",
  },
  id: {
    badge: "Legal",
    title: "Informasi hukum",
    metaDescription: "Penerbit, penanggung jawab publikasi, kontak, dan penyedia hosting PRIONATION.io.",
    labels: {
      publisher: "Penerbit",
      name: "Nama",
      legalForm: "Bentuk badan hukum",
      registration: "Nomor registrasi",
      address: "Alamat terdaftar",
      director: "Penanggung jawab publikasi",
      contact: "Kontak",
      email: "Email",
      phone: "Telepon",
      host: "Hosting",
      team: "Tim",
      privacy: "Data pribadi",
    },
    teamText: "Tim engineering kami berbasis di Bali, Indonesia. Kontak penjualan di Paris: Evan Cao.",
    privacyText: "Cara kami mengumpulkan dan menggunakan data pribadi, serta hak Anda, dijelaskan dalam",
    privacyLink: "kebijakan privasi",
    back: "Kembali ke beranda",
  },
};
