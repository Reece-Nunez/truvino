"""Remove all enrichment fields from portfolio-data.ts to prepare for clean re-enrichment."""
import re, sys

sys.stdout.reconfigure(encoding="utf-8")

FILEPATH = "C:/Users/reece/Documents/NunezDev/truvino/app/data/portfolio-data.ts"

ENRICHMENT_FIELDS = [
    "image:", "origin:", "bottleSizes:", "specifications:",
    "tastingNotes:", "vinification:", "foodPairings:", "downloadables:",
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

result = []
removed = 0
for line in lines:
    stripped = line.strip()
    if any(stripped.startswith(field) for field in ENRICHMENT_FIELDS):
        removed += 1
        continue
    result.append(line)

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.writelines(result)

print(f"Removed {removed} enrichment lines")
