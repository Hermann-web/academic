/** Academic and professional timeline for the Parcours page. */

export interface Etape {
  period: string;
  title: string;
  place: string;
  detail: string;
  kind: "recherche" | "formation" | "experience";
}

export const parcours: Etape[] = [
  {
    period: "2024 — aujourd'hui",
    title: "Doctorat (Sciences et Techniques)",
    place:
      "Faculté des Sciences Ben M'Sick (Univ. Hassan II de Casablanca) · LPMC · École Centrale Casablanca",
    detail:
      "Thèse : Modèles hybrides profonds pour la modélisation des jumeaux numériques cardiaques. " +
      "Direction : Pr. Abdellah Hamdaoui ; co-direction : Pr. Noureddine Damil, Pr. Kawtar Zerhouni. " +
      "Enseignement et encadrement d'élèves-ingénieurs en parallèle.",
    kind: "recherche",
  },
  {
    period: "2025",
    title: "Ingénieur logiciel — K-INTEGRATE (filiale marocaine de Kantar)",
    place: "Casablanca",
    detail:
      "Système expert de contrôle qualité de données d'enquêtes en temps réel : FastAPI, PostgreSQL, " +
      "validation par LLM des réponses ouvertes, intégration Nfield, tableau de bord Vue.js.",
    kind: "experience",
  },
  {
    period: "2023 — 2024",
    title: "Stage de recherche — Vision par ordinateur LiDAR",
    place: "Centre Systèmes Complexes et Interactions (ECC) & MELINT, Casablanca",
    detail:
      "Prétraitement de nuages de points 3D, fine-tuning YOLO pour détection/classification/suivi, " +
      "banc d'évaluation automatisé de 17 capteurs LiDAR.",
    kind: "recherche",
  },
  {
    period: "2019 — 2024",
    title: "Diplôme d'ingénieur — Digitalisation & Data Science",
    place: "École Centrale Casablanca",
    detail:
      "Majeure Data Science, mineure Management et gestion de projet. Classé top 3 sur l'ensemble des semestres. " +
      "Stages : SIANA (traitement du signal, maintenance TGV), NORMA (NLP juridique), Safran Maroc (NLP, OCR).",
    kind: "formation",
  },
  {
    period: "2018 — 2019",
    title: "Classes préparatoires Math-Physique",
    place: "Lycée Moulay Al Hassan, Tanger",
    detail: "Classé 2e (1re année) puis 1er (2e année).",
    kind: "formation",
  },
];
