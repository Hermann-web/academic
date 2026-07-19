/**
 * Downloadable attestations. Files live in public/attestations/ and are
 * copied there by `npm run sync` (see scripts/sync-assets.sh — keep the
 * two lists in sync when adding a new attestation).
 */

export interface Attestation {
  file: string; // filename under /attestations/
  label: string;
  category: "Enseignement" | "Encadrement" | "Organisation" | "Participation";
  detail: string;
}

export const attestations: Attestation[] = [
  {
    file: "td-algorithmique-et-programmation.pdf",
    label: "TD — Algorithmique et programmation",
    category: "Enseignement",
    detail: "Travaux dirigés d'algorithmique et de programmation, École Centrale Casablanca.",
  },
  {
    file: "cm-coding-week.pdf",
    label: "CM — Coding Week",
    category: "Enseignement",
    detail: "Cours magistral lors de la Coding Week, École Centrale Casablanca.",
  },
  {
    file: "tp-coding-week.pdf",
    label: "TP — Coding Week",
    category: "Enseignement",
    detail: "Travaux pratiques lors de la Coding Week, École Centrale Casablanca.",
  },
  {
    file: "enc-projet-scientifique-co-encadrement.pdf",
    label: "Encadrement — Projet Scientifique",
    category: "Encadrement",
    detail: "Co-encadrement d'un projet scientifique d'élèves-ingénieurs.",
  },
  {
    file: "enc-projets-option-co-encadrement.pdf",
    label: "Encadrement — Projets d'Option",
    category: "Encadrement",
    detail: "Co-encadrement de projets d'option.",
  },
  {
    file: "enc-projets-innovation-co-encadrement.pdf",
    label: "Encadrement — Projets d'Innovation",
    category: "Encadrement",
    detail: "Co-encadrement de projets d'innovation par la recherche.",
  },
  {
    file: "enc-projets-innovation-jury-mini-soutenance.pdf",
    label: "Jury — Projets d'Innovation (mini-soutenance)",
    category: "Encadrement",
    detail: "Membre du jury des mini-soutenances des projets d'innovation.",
  },
  {
    file: "adm-projet-innovation-co-organisation.pdf",
    label: "Co-organisation — Projet Innovation",
    category: "Organisation",
    detail: "Co-organisation du dispositif Projets d'Innovation.",
  },
  {
    file: "certif-attendance-3days.pdf",
    label: "Certificat de participation — conférence (3 jours)",
    category: "Participation",
    detail: "Attestation de participation à un événement scientifique de trois jours.",
  },
];
