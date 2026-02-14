"""Add bottle size data from Truvino catalog PDF to portfolio-data.ts"""
import re

# Mapping: (brand_lower, name_substring_lower) -> list of bottle sizes
# Extracted from Truvino Catalog PDF
# Most products are 750ml - only listing exceptions and specific known sizes
BOTTLE_SIZES = {
    # === Multi-size products ===
    ("blu", "prosecco millesimato"): ["750ml", "200ml"],
    ("vita bella", "prosecco ros"): ["750ml"],
    ("vita bella", "prosecco"): ["750ml", "200ml"],
    ("starla", "prosecco"): ["1.5L", "750ml", "187ml"],
    ("costa bella", "pinot grigio"): ["750ml", "1.5L"],
    ("sakeberto", "junmai ginjo"): ["300ml", "720ml"],
    ("sakeberto", "junmai"): ["720ml"],
    ("revanche", "cognac"): ["750ml", "375ml", "100ml"],
    ("glengarry", "4-year"): ["750ml", "1.75L"],
    ("glengarry", "4 year"): ["750ml", "1.75L"],
    ("the glen silver", "special reserve"): ["1.75L", "1L", "750ml", "375ml", "200ml"],
    ("glen silver", "special reserve"): ["1.75L", "1L", "750ml", "375ml", "200ml"],
    ("smoke lab", "classic"): ["750ml", "50ml"],
    ("smoke lab", "aniseed"): ["750ml", "50ml"],
    ("smoke lab", "saffron"): ["750ml", "50ml"],

    # === 1.5L only ===
    ("paw print", ""): ["1.5L"],
    ("tio tio", "sangria"): ["1.5L"],
    ("zuccotti", "pinot grigio"): ["1.5L"],
    ("san nicola", ""): ["1.5L"],
    ("san marco", ""): ["1.5L"],

    # === 1.75L only ===
    ("reserve 1787", "bourbon"): ["1.75L"],
    ("1405", "vodka"): ["1.75L"],
    ("blue coco beach", ""): ["1.75L"],
    ("black sand beach", ""): ["1.75L"],

    # === 1L only ===
    ("velho barreiro", ""): ["1L"],

    # === 700ml (Eight Lands UK) ===
    ("eight lands", ""): ["700ml"],

    # === 375ml (Better Tomorrow Soju) ===
    ("better tomorrow", ""): ["375ml"],

    # === 330ml (Rio RTD) ===
    ("rio", ""): ["330ml"],
    ("rio light", ""): ["330ml"],

    # === Products explicitly in PDF at 750ml but with known specifics ===
    ("grande seventh", ""): ["750ml"],
    ("grande signature", ""): ["750ml"],
}

# Brands where ALL products are a specific non-750ml size
BRAND_DEFAULTS = {
    "paw print": ["1.5L"],
    "san nicola": ["1.5L"],
    "san marco": ["1.5L"],
    "better tomorrow": ["375ml"],
    "rio": ["330ml"],
    "rio light": ["330ml"],
    "eight lands": ["700ml"],
    "blue coco beach": ["1.75L"],
    "black sand beach": ["1.75L"],
    "velho barreiro": ["1L"],
}


def find_sizes(brand: str, name: str) -> list[str]:
    """Find bottle sizes for a product. Returns sizes or default 750ml."""
    bl = brand.lower()
    nl = name.lower()

    # Try specific match first (brand + name substring)
    for (b, n), sizes in BOTTLE_SIZES.items():
        if b == bl and n and n in nl:
            return sizes

    # Try brand-only match
    for (b, n), sizes in BOTTLE_SIZES.items():
        if b == bl and n == "":
            return sizes

    # Try brand default
    if bl in BRAND_DEFAULTS:
        return BRAND_DEFAULTS[bl]

    # Default: 750ml (industry standard)
    return ["750ml"]


def main():
    filepath = "C:/Users/reece/Documents/NunezDev/truvino/app/data/portfolio-data.ts"
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    result = []
    i = 0
    matched = 0

    while i < len(lines):
        line = lines[i]
        result.append(line)

        # Detect start of a product object (has name: and " in same line)
        if "name:" in line and '"' in line:
            name_match = re.search(r'name:\s*"([^"]*)"', line)
            if not name_match:
                i += 1
                continue

            name_val = name_match.group(1)
            brand = None
            block_end = None
            has_sizes = False

            # Look ahead for brand and end of block
            j = i + 1
            while j < len(lines) and j < i + 25:
                if "brand:" in lines[j]:
                    brand_match = re.search(r'brand:\s*"([^"]*)"', lines[j])
                    if brand_match:
                        brand = brand_match.group(1)
                if "bottleSizes:" in lines[j]:
                    has_sizes = True
                    break
                stripped = lines[j].strip()
                if stripped == "}," or stripped == "}" or stripped == "},":
                    block_end = j
                    break
                j += 1

            if brand and not has_sizes and block_end is not None:
                sizes = find_sizes(brand, name_val)
                matched += 1
                sizes_str = "[" + ", ".join(f'"{s}"' for s in sizes) + "]"

                # Copy lines from i+1 to block_end-1
                for k in range(i + 1, block_end):
                    result.append(lines[k])

                # Ensure previous line ends with comma
                last_data = result[-1].rstrip()
                if last_data and not last_data.endswith(",") and not last_data.endswith("{"):
                    result[-1] = result[-1].rstrip() + ","

                # Determine indentation from brand line
                indent = "        "
                for k in range(i, block_end):
                    if "brand:" in lines[k]:
                        indent = lines[k][:len(lines[k]) - len(lines[k].lstrip())]
                        break

                result.append(f"{indent}bottleSizes: {sizes_str},")
                result.append(lines[block_end])
                i = block_end + 1
                continue

        i += 1

    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(result))

    print(f"Added bottleSizes to {matched} products")


if __name__ == "__main__":
    main()
