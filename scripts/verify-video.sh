#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: $0 <video-file> [output-directory]" >&2
  exit 2
fi

video="$1"
output="${2:-${video%.*}-verification}"

for command in ffprobe ffmpeg; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Required command not found: $command" >&2
    exit 1
  fi
done

if [[ ! -f "$video" ]]; then
  echo "Video not found: $video" >&2
  exit 1
fi

mkdir -p "$output"
ffprobe -v error -show_format -show_streams -of json "$video" > "$output/video-info.json"

duration="$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$video")"
read -r start middle end < <(awk -v d="$duration" 'BEGIN { s=d*0.05; if (s < 0.1) s=0.1; printf "%.3f %.3f %.3f\n", s, d*0.5, d*0.95 }')

ffmpeg -hide_banner -loglevel error -y -ss "$start" -i "$video" -frames:v 1 "$output/frame-start.png"
ffmpeg -hide_banner -loglevel error -y -ss "$middle" -i "$video" -frames:v 1 "$output/frame-middle.png"
ffmpeg -hide_banner -loglevel error -y -ss "$end" -i "$video" -frames:v 1 "$output/frame-end.png"

echo "Verification files written to $output"
echo "Inspect video-info.json and frame-start.png, frame-middle.png, frame-end.png"
