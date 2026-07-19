#!/usr/bin/env bash
# Sync publishable assets into public/ from their sources of truth.
# Run after updating the CV (latex-repo), the Zotero export, or the attestations.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
docs="$root/docs"
public="$root/public"

# --- CV -------------------------------------------------------------------
# Built by latex-repo/resume/run.sh --type 20 (academia / PhD-student variant).
cv_src="$root/../latex-repo/resume/pdf/hermann-agossou-20-1.pdf"
if [[ -f "$cv_src" ]]; then
  mkdir -p "$public/cv"
  cp -f "$cv_src" "$public/cv/hermann-agossou-cv.pdf"
  echo "CV synced from $cv_src"
else
  echo "warning: CV not found at $cv_src — run ../latex-repo/resume/run.sh --type 20 first" >&2
fi

# --- Zotero export --------------------------------------------------------
mkdir -p "$public/publications"
cp -f "$docs/zotero-export/COURSDIGIT.bib" "$public/publications/COURSDIGIT.bib"
echo "Zotero export synced"

# --- Attestations ---------------------------------------------------------
# Explicit mapping: source file -> public slug. Keep in sync with
# src/data/attestations.ts when adding new attestations.
mkdir -p "$public/attestations"
declare -A attestations=(
  ["attestation_AGOSSOU_TD_Algorithmique_et_programmation.pdf"]="td-algorithmique-et-programmation.pdf"
  ["attestation_AGOSSOU_TP_Coding_Week.pdf"]="tp-coding-week.pdf"
  ["attestation_AGOSSOU_CM_Coding_Week.pdf"]="cm-coding-week.pdf"
  ["attestation_AGOSSOU_ENC_Projets_Innovation_(Jury_Mini-soutenance.pdf"]="enc-projets-innovation-jury-mini-soutenance.pdf"
  ["attestation_AGOSSOU_ENC_Projets_Innovation_(Co-encadrement).pdf"]="enc-projets-innovation-co-encadrement.pdf"
  ["attestation_AGOSSOU_ENC_Projets_Option_(Co-encadrement).pdf"]="enc-projets-option-co-encadrement.pdf"
  ["attestation_AGOSSOU_ENC_Projet_Scientifique_(Co-encadrement).pdf"]="enc-projet-scientifique-co-encadrement.pdf"
  ["attestation_AGOSSOU_ADM_Projet_Innovation_(Co-organisation).pdf"]="adm-projet-innovation-co-organisation.pdf"
  ["certif-attendance-3days.pdf"]="certif-attendance-3days.pdf"
)
for src in "${!attestations[@]}"; do
  if [[ -f "$docs/attestations/$src" ]]; then
    cp -f "$docs/attestations/$src" "$public/attestations/${attestations[$src]}"
  else
    echo "warning: missing attestation $src" >&2
  fi
done
echo "Attestations synced ($(ls "$public/attestations" | wc -l) files)"

# --- Profile photo (placeholder) ------------------------------------------
# Uses the GitHub avatar until a professional photo is dropped at
# public/photo-hermann-agossou.jpg (just replace the file).
photo="$public/photo-hermann-agossou.jpg"
if [[ ! -f "$photo" ]]; then
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "https://avatars.githubusercontent.com/u/69398651" -o "$photo" \
      && echo "Profile photo placeholder downloaded (replace with a professional photo)" \
      || echo "warning: could not download avatar placeholder" >&2
  fi
fi

echo "Done."
