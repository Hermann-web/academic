/**
 * Personal research output: manuscripts, talks and posters.
 * Source: rapport d'activité doctoral 2025-2026 (docs/thesis-info.docx).
 */

export type WorkStatus =
  | "soumis"          // submitted, under review
  | "en préparation"  // manuscript in preparation
  | "présenté"        // presented (talk or poster)
  | "communication soumise"; // submitted communication

export interface Manuscript {
  title: string;
  authors: string[];
  status: WorkStatus;
  year: string;
  doi?: string;
  note?: string;
}

export interface Communication {
  title: string;
  kind: "Communication orale" | "Poster";
  event: string;
  place: string;
  year: string;
  status: "présenté" | "communication soumise";
}

export const manuscripts: Manuscript[] = [
  {
    title:
      "Operator-Informed Convolutional Networks for Semi-Linear Inverse Problems: When Is Born-Inspired Filtering Enough?",
    authors: ["H. Agossou", "K. Zerhouni", "C. El Kihal", "A. Hamdaoui", "N. Damil"],
    status: "soumis",
    year: "2026",
    doi: "10.5281/zenodo.20594462",
    note: "Manuscrit soumis à une revue, en cours d'évaluation. Archive de reproductibilité sur Zenodo.",
  },
  {
    title:
      "Reference-State Neural Inverse Learning for Cardiac Electrophysiology Models (FitzHugh–Nagumo, Aliev–Panfilov)",
    authors: ["H. Agossou", "K. Zerhouni", "N. Damil"],
    status: "en préparation",
    year: "2026",
    note: "Apprentissage inverse autour d'un état de référence ; observations complètes 1D, capteurs épars 2D, analyse sous bruit.",
  },
];

export const communications: Communication[] = [
  {
    title: "Should Neural Inverse Solvers Decouple Their Outputs?",
    kind: "Communication orale",
    event: "JSIIA 2026",
    place: "Casablanca",
    year: "2026",
    status: "présenté",
  },
  {
    title: "Should Neural Inverse Solvers Decouple Their Outputs?",
    kind: "Poster",
    event: "JRC 2026",
    place: "Casablanca",
    year: "2026",
    status: "présenté",
  },
  {
    title: "Hybrid Neural Networks for Cardiac Inverse Modelling",
    kind: "Poster",
    event: "AI for Impact 2026",
    place: "SUP'RH, Casablanca",
    year: "2026",
    status: "présenté",
  },
  {
    title: "On Building Efficient Neural Networks for Cardiac Digital Twins",
    kind: "Poster",
    event: "JRECC 2025",
    place: "Casablanca",
    year: "2025",
    status: "présenté",
  },
  {
    title: "Neural Inverse Recovery of Cardiac Physics from Non-Invasive Measurements",
    kind: "Poster",
    event: "JRECC 2025",
    place: "Casablanca",
    year: "2025",
    status: "présenté",
  },
  {
    title: "Solving Inverse Problems of Chaotic Lorenz Systems Using Neural Networks",
    kind: "Communication orale",
    event: "CMM 2026",
    place: "Rabat",
    year: "2026",
    status: "communication soumise",
  },
  {
    title:
      "Event-Coded Spiking Decoders for Sparse Activation-Time Inversion Under Timestamp Jitter",
    kind: "Communication orale",
    event: "INTIS 2026",
    place: "Tanger",
    year: "2026",
    status: "communication soumise",
  },
];
