/**
 * Single source of truth for identity, links and site-wide settings.
 * Everything displayed in headers, footers, contact blocks and metadata
 * comes from here — edit once, applied everywhere.
 */

export const identity = {
  name: "Hermann Leibnitz Klaüs Agossou",
  shortName: "Hermann Agossou",
  role: "Doctorant en Sciences et Techniques",
  discipline:
    "Modèles hybrides profonds pour la modélisation des jumeaux numériques cardiaques",
  lab: "Laboratoire de Physique de la Matière Condensée (LPMC)",
  university: "Faculté des Sciences Ben M'Sick — Université Hassan II de Casablanca",
  partner: "École Centrale Casablanca (Centre de recherche Systèmes Complexes et Interactions)",
  location: "Casablanca, Maroc",
  email: "hermannagossou6@gmail.com",
  photo: "/photo-hermann-agossou.jpg",
  /** One-paragraph profile used on the home page. */
  summary:
    "Doctorant en 3e année à la Faculté des Sciences Ben M'Sick (Université Hassan II de Casablanca), " +
    "en collaboration avec l'École Centrale Casablanca. Mes travaux portent sur l'apprentissage inverse " +
    "informé par la physique : concevoir des réseaux de neurones guidés par la structure des opérateurs " +
    "inverses et par les équations aux dérivées partielles, pour estimer les paramètres cachés de " +
    "l'électrophysiologie cardiaque à partir d'observations complètes ou éparses. Également ingénieur " +
    "logiciel et data scientist, j'enseigne le génie logiciel et les sciences des données au niveau universitaire.",
} as const;

export const links = {
  github: "https://github.com/hermann-web",
  linkedin: "https://www.linkedin.com/in/agossou-hermann",
  researchgate: "https://www.researchgate.net/profile/Hermann-Agosou",
  twitter: "https://www.twitter.com/AgossouHermann",
  pypi: "https://pypi.org/user/Hermann-web/",
  blog: "https://hermann-agossou.com",
  /** Reproducibility archive of the submitted manuscript. */
  zenodo: "https://doi.org/10.5281/zenodo.20594462",
} as const;

export const contact = {
  /**
   * Google Forms embed URL for the contact form (assignment requirement).
   * Short link: https://forms.gle/J4Ha9enVPYWr71S49
   * If ever emptied, the contact page shows an email fallback instead.
   */
  googleFormEmbedUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtXWOAREotCSEgFe02Zs2iUeIJRNuOB06a7ZQ2SgBjzVwJWw/viewform?embedded=true",
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/cv", label: "CV" },
  { href: "/publications", label: "Publications" },
  { href: "/communications-attestations", label: "Communications & Attestations" },
  { href: "/cours-tps", label: "Cours & TPs" },
  { href: "/parcours-contact", label: "Parcours & Contact" },
] as const;

export const cvPdf = "/cv/hermann-agossou-cv.pdf";
export const bibExport = "/publications/COURSDIGIT.bib";
