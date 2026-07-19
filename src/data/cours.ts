/**
 * Teaching: courses taught and downloadable/linked supports.
 * Supports hosted elsewhere (blog, GitHub) use `href`; files dropped in
 * public/cours/ use `file`.
 */

export interface Support {
  label: string;
  href?: string; // external link (blog, GitHub, Drive…)
  file?: string; // filename under /cours/
}

export interface Course {
  title: string;
  role: string;
  place: string;
  period: string;
  description: string;
  supports: Support[];
}

export const cours: Course[] = [
  {
    title: "Pratiques du génie logiciel",
    role: "Enseignant (cours + TP, 26 h)",
    place: "École Centrale Casablanca — cycle master",
    period: "Mars 2025",
    description:
      "Programmation orientée objet, patrons de conception, architecture MVC appliquée aux projets de " +
      "science des données, Git & GitHub, tests unitaires (pytest), CI/CD et gestion d'environnements Python. " +
      "Mini-projet de machine learning encadré sur 4 jours.",
    supports: [
      {
        label: "Référentiel du cours (Git, tests, CI/CD)",
        href: "https://github.com/hermann-web",
      },
    ],
  },
  {
    title: "Coding Week — cours magistral & travaux pratiques",
    role: "Intervenant (CM + TP)",
    place: "École Centrale Casablanca",
    period: "2025–2026",
    description:
      "Semaine intensive de programmation : fondamentaux Python, contrôle de version avec Git, " +
      "bonnes pratiques de code et accompagnement de projet.",
    supports: [
      {
        label: "Cours — Contrôle de version avec Git (2025)",
        file: "coding-week/cours-vc-coding-week-hermann-agossou-2025-03-10.pdf",
      },
      {
        label: "TP — GitHub Lab (2025)",
        file: "coding-week/CodingWeek-GitHubLab_2025.pdf",
      },
      {
        label: "Sujet de projet (2026)",
        file: "coding-week/project1_2026.pdf",
      },
    ],
  },
  {
    title: "Algorithmique et programmation — travaux dirigés",
    role: "Chargé de TD",
    place: "École Centrale Casablanca",
    period: "2024–2025",
    description:
      "Travaux dirigés d'algorithmique : structures de données, complexité, itération et récursivité.",
    supports: [
      {
        label: "TP 1 — Advanced Programming (2024)",
        file: "programming/AdvancedProgramming-TP1_2024.pdf",
      },
      {
        label: "Sujet de projet — programmation",
        file: "programming/project1.pdf",
      },
    ],
  },
  {
    title: "Tutoriels IA : Perplexity AI & NotebookLM",
    role: "Auteur",
    place: "Blog personnel",
    period: "2025",
    description:
      "Guide pas-à-pas en français pour prendre en main les outils d'IA générative en contexte d'étude et de recherche.",
    supports: [
      {
        label: "Tutoriel en ligne (partie 1)",
        href: "https://hermann-agossou.com/blog/",
      },
    ],
  },
];
