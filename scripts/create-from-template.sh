#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <template-name> <target-directory>" >&2
  exit 2
fi

template_name="$1"
target="$2"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
skill_root="$(cd "$script_dir/.." && pwd)"
source_dir="$skill_root/assets/templates/$template_name"

if [[ ! -d "$source_dir" ]]; then
  echo "Unknown template: $template_name" >&2
  echo "Available templates:" >&2
  find "$skill_root/assets/templates" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort >&2
  exit 1
fi

if [[ -e "$target" ]]; then
  echo "Target already exists: $target" >&2
  exit 1
fi

mkdir -p "$(dirname "$target")"
mkdir -p "$target"
rsync -a \
  --exclude node_modules \
  --exclude out \
  --exclude renders \
  --exclude .thumbnails \
  "$source_dir/" "$target/"

echo "Created $target from $template_name"
