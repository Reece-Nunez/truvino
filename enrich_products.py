"""Comprehensive enrichment of portfolio-data.ts.
Adds: images, bottle sizes, origin, specifications, tasting notes, vinification, food pairings.
"""
import re, os, sys, unicodedata

sys.stdout.reconfigure(encoding="utf-8")

FILEPATH = "C:/Users/reece/Documents/NunezDev/truvino/app/data/portfolio-data.ts"
PORTFOLIO_DIR = "C:/Users/reece/Documents/NunezDev/truvino/public/portfolio"

available_images = set(os.listdir(PORTFOLIO_DIR))


def unescape_ts(s: str) -> str:
    """Convert TS \\uXXXX escape sequences to actual Unicode characters."""
    return re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)


def generate_slug(brand: str, name: str) -> str:
    text = f"{brand}-{name}".lower()
    text = unicodedata.normalize("NFD", text)
    text = re.sub(r"[\u0300-\u036f]", "", text)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


# ──────────────────────────────────────────────────────
# IMAGE OVERRIDES: (brand_lower, name_lower) -> filename
# ──────────────────────────────────────────────────────
IMAGE_OVERRIDES: dict[tuple[str, str], str | None] = {
    # Italy - Sparkling
    ("blu", "prosecco millesimato"): "blu-prosecco.webp",
    ("blu", "pink sparkling ros\u00e9"): "pink-sparkling-rose.webp",
    ("good fucking bubbles", "spumante extra dry"): "good-fucking-bubbles-spumante-extra-dry.webp",
    ("vita bella", "prosecco ros\u00e9"): "vita-bella-prosecco-rose.webp",
    ("birkedal hartmann", "ros\u00e9 all\u00e9e sparkling"): "birkedal-hartmann-rose-allee-sparkling.webp",
    # Italy - White
    ("tocco divino", "pinot grigio"): "toco-divino-pinot-grigio.webp",
    ("progetto costa dino", "pinot grigio delle venezie"): "progetto-costa-dino-pinot-grigio.webp",
    ("villarria", "pinot grigio-sauvignon blanc"): "villarria-pino-grigio-sauvignon-blanc.webp",
    ("villarria", "pinot grigio delle venezie doc"): "villarria-pinot-grigio-delle-venezie-DOC.webp",
    ("villarria", "moscato puglia igt"): "villarria-moscato-puglia-IGT.webp",
    ("with love", "pinot grigio igt"): "with-love-pino-grigio-igt.webp",
    ("arento", "pinot grigio"): "arento-pinot-grigio-alto-adige.webp",
    ("la bergera", "chardonnay doc"): "la-bergera-chardonnay.webp",
    ("oro di gavi", "oro di gavi"): "oro-di-gavi.webp",
    ("good fucking", "pinot grigio"): "good-fucking-pino-grigio.webp",
    ("costa bella", "pinot grigio"): "costa-bella-pino-grigio.webp",
    ("san santo biodynamic", "pinot grigio"): "san-santo-diodynamic-farmed-pino-grigio.webp",
    ("san santo biodynamic", "sauvignon blanc"): "san-santo-diodynamic-farmed-sauvignon-blanc.webp",
    ("amami cinquesegni", "pinot grigio"): "amami-pino-grigio.webp",
    ("365", "pinot grigio"): "365-pino-grigio.webp",
    # Italy - Red
    ("tocco divino", "chianti"): "toco-divino-chianti.webp",
    ("arcasto", "montepulciano d\u2019abruzzo doc"): "arcasto-montepulciano-dabruzzo.webp",
    ("with love", "montepulciano d\u2019abruzzo doc"): "with-love-montepulciano-dabruzzo-doc.webp",
    ("bee organic", "cabernet sauvignon"): "bee-organic-cabernet-saugivnon.webp",
    ("cinquesegni 4cento", "valpolicella ripasso doc superiore"): "4-cento-valpolicella-ripasso-doc-superiore.webp",
    ("cinquesegni 4cento", "red appassimento igt veneto"): "4-cento-red-appassimento-igt-vento.webp",
    ("cinquesegni 4cento", "amarone valpolicella docg"): "4-cento-amarone-valpolicella-docg.webp",
    ("cinquesegni 4cento", "corvina igt veneto"): "4-cento-corvina-igt-vento.webp",
    ("le vigne di sammarco", "de\u00ect\u00e0 primitivo"): "le-vigne-di-sammarco-deita-primitivo.webp",
    ("santa fina", "riserva chianti"): "santa-fina-riserva-chianti.webp",
    ("santa fina", "chianti riserva"): "santa-fina-chianti-riserva.webp",
    ("la bergera", "nebbiolo doc"): "la-bergara-nebbiolo.webp",
    ("la bergera", "barbera d\u2019alba"): "la-bergera-barbera-dalba.webp",
    ("la bergera", "barolo docg"): "la-bergera-barolo.webp",
    ("lei \u00e8 venere", "rosso toscano"): "lei-e-venere-rosso-toscano.webp",
    ("una vita", "amarone valpolicella"): "una-vita-amarone-valpolecella.webp",
    ("cinquesegni", "il segno"): "il-segno.webp",
    ("amami cinquesegni", "montepulciano"): "amami-montepulciano.webp",
    ("amami cinquesegni", "primitivo"): "amami-primitivo.webp",
    ("cinquesegni", "luna passante nero d\u2019avola"): "luna-passante-nero-davola.webp",
    ("costa bella", "montepulciano d\u2019abruzzo"): "costa-bella-montepulicano-dabruzzo.webp",
    ("san santo biodynamic", "chianti"): "san-santo-biodynamic-farmed-chianti.webp",
    ("puribus", "cabernet sauvignon"): "puribus-paso-robles-cabernet-sauvignon.webp",
    ("bee organic", "nero d\u2019avola"): "bee-organic-nero-davola.webp",
    # Italy - Ros\u00e9
    ("good fucking", "ros\u00e9"): "good-fucking-rose.webp",
    ("with love", "ros\u00e9"): "with-love-rose.webp",
    ("bee organic", "ros\u00e9"): "bee-organic-rose.webp",
    ("costa bella", "pinot noir"): "costa-bella-pinot-noir.webp",
    # France
    ("naudin", "ch\u00e2teauneuf du pape"): "naudin-chateauneuf-du-pape.webp",
    ("la n\u00e9gly", "clos des truffiers"): "la-negly-clos-des-truffiers.webp",
    ("la n\u00e9gly", "la porte du ciel"): "la-negly-la-porte-du-ciel.webp",
    ("la n\u00e9gly", "l\u2019ancely"): "la-negly-lancely.webp",
    ("la n\u00e9gly", "la c\u00f4te"): "la-negly-la-cote.webp",
    ("la n\u00e9gly", "la falaise"): "la-negly-la-falaise.webp",
    ("la n\u00e9gly", "les terrasses rouge"): "la-negly-les-terrasses-rouge.webp",
    ("la n\u00e9gly", "les terrasses blanc"): "la-negly-les-terrasses-blanc.webp",
    # Georgia
    ("ranina", "kakhuri (white)"): "ranina=kakhuri.webp",
    ("ranina", "ros\u00e9"): "ranina-rose.webp",
    ("ranina", "mukuzani"): "ranina-makuzani.webp",
    # Greece
    ("emphasis", "red (syrah)"): "emphasis-red.webp",
    ("emphasis", "assyrtiko"): "emphasis-assytriko.webp",
    ("thema", "red"): "thema-red.webp",
    ("thema", "assyrtiko"): "thema-assyrtiko.webp",
    # Scotland
    ("glengarry", "nas single malt"): "glengarry-nas-single-malt.webp",
    ("glengarry", "12-year single malt"): "glengarry-12year-single-malt-scotch.webp",
    ("glengarry", "4-year highland blended whisky"): "glengarry-4year-highland-whisky.webp",
    ("the glen silver\u2019s", "special reserve blended scotch"): "the-glen-silvers-special-reserve-blended-scotch.webp",
    ("loch lomond", "cristie kerr 2002 us open edition"): "loch-lomond-cristie-kerr-2002.webp",
    # USA
    ("kyle cellars", "pinot noir"): "kyle-cellars-pinot-noir.webp",
    ("kyle cellars", "cabernet sauvignon"): "kyle-cellars-cabernet-sauvignon.webp",
    ("kyle cellars", "chardonnay"): "kyle-cellars-chardonnay.webp",
    ("paw print", "sauvignon blanc"): "paw-print-sauvignon-blanc.webp",
    ("paw print", "white zinfandel"): "paw-print-white-zinfandel.webp",
    ("paw print", "cabernet sauvignon"): "paw-print-cabernet-sauvignon.webp",
    ("paw print", "pinot grigio"): "paw-print-pinot-grigio.webp",
    ("profanity life screw off", "cabernet sauvignon"): "profanity-life-screw-off-cabernet-sauvignon.webp",
    ("puribus", "paso robles cabernet sauvignon"): "puribus-paso-robles-cabernet-sauvignon.webp",
    ("one life", "pinot noir"): "one-life-pinot-noir.webp",
    ("one life", "private collection napa cabernet sauvignon"): "one-life-napa-cabernet-sauvignon.webp",
    ("golden archer", "napa cabernet"): "golden-archer-napa-cabernet.webp",
    ("cooper & oak", "cabernet sauvignon"): "cooper-oak-cabernet-sauvignon.webp",
    ("good fucking wine", "cabernet sauvignon"): "good-fucking-wine-cabernet-sauvignon.webp",
    ("good fucking wine", "red blend"): "good-fucking-wine-red-blend.webp",
    ("good fucking wine", "sweet red"): "good-fucking-wine-sweet-red.webp",
    ("good fucking bourbon", "small batch bourbon"): "good-fucking-bourbon-small-batch.webp",
    ("good fucking tequila", "small batch tequila"): "good-fucking-tequila-small-batch.webp",
    ("good fucking vodka", "small batch vodka"): "good-fucking-vodka-small-batch.webp",
    ("american woman spirit co.", "92 proof straight bourbon"): "american-woman-spirit-co-92-straight-bourbon-whisky.webp",
    ("american woman spirit co.", "102 proof straight bourbon"): "american-woman-spirit-co-102-proof-bourbon.webp",
    ("american woman spirit co.", "cask strength straight bourbon"): "american-woman-spirit-co-cask-strength-straigh-bourbon.webp",
    ("american woman spirit co.", "tequila blanco"): "american-woman-spirit-co-tequila-blanco.webp",
    ("reserve 1787", "bourbon"): "reserve-1787-bourbon.webp",
    ("revanche", "cognac"): "revanche-cognac.webp",
    # Argentina
    ("tierra alta", "chardonnay"): "tierra-alta-charonnay.webp",
    ("tierra alta", "cabernet sauvignon"): "tierra-alta-cabrnet-sauvignon.webp",
    ("tomero", "cabernet sauvignon"): "tomero-cabernet-sauvinon.webp",
    ("vistalba", "corte b"): "vistalba-corteb.webp",
    # Spain
    ("venta del puerto", "no. 12"): "venta-del-puerto-no12.webp",
    ("venta del puerto", "no. 18"): "venta-del-puerto-no18.webp",
    # New Zealand
    ("coco bay", "sauvignon blanc"): "coco-bay-marlborough-sauvignon-blanc.webp",
    # Brazil
    ("velho barreiro", "cacha\u00e7a tatuzinho"): "cachaca-tatuzinho.webp",
    ("boazinha", "cacha\u00e7a boazinha"): "cachaca-boazinha.webp",
    ("velho barreiro", "cacha\u00e7a tatuzinho lime"): "cachaca-tatuzinho-lime.webp",
    ("seleta", "cacha\u00e7a seleta silver"): "cachaca-seleta-silver.webp",
    ("catuaba generosa", "catuaba"): "catuaba-generosa.webp",
    ("cancao", "suave white"): "cancao-suave-white.webp",
    # South Korea
    ("7drops", "soju yogurt"): "7-drops-soju-yogurt.webp",
    ("7drops", "soju passion fruit"): "7-drops-soju-passion-fruit.webp",
    # Japan
    ("sakeberto", "junmai ginjo sake"): "sakeberto-junmai-ginjo-sake.webp",
    ("sakeberto", "junmai sake"): "sakeberto-junmai.webp",
    # Portugal
    ("adega de favaios", "monge porto white"): "adega-de-gavaios-monge-porto-white.webp",
    ("adega de favaios", "monge porto fine ruby"): "adega-de-favaios-monge-porto-fine-ruby.webp",
    ("adega de favaios", "monge porto fine tawny"): "adega-de-favaios-monge-porto-fine-tawny.webp",
    ("adega de favaios", "monge porto tawny 10 yr"): "adega-de-favaios-monge-porto-tawny-10yr.webp",
    # China
    ("rio light", "peach & brandy flavor"): "rio-light-peach-brandy.webp",
    ("rio light", "passion fruit & vodka flavor"): "rio-light-passion-fruit-vodka.webp",
    ("rio light", "ros\u00e9 lychee & brandy flavor"): "rio-light-rose-lychee-brandy.webp",
    ("rio light", "yogurt & vodka flavor"): "rio-light-yogurt-vodka.webp",
    # Caribbean
    ("blue coco beach", "spiced rum"): "blue-coco-beach-carribean-spiced-rum.webp",
    ("black sand beach", "black spiced rum"): "black-sand-beach-black-spiced-rum.webp",
    # Mexico
    ("la brune ed catrina", "tequila blanco"): "la-brune-ed-catrina-tequila-blanco.webp",
    # Valued wines
    ("san nicola", "montepulciano"): "san-nicola-montepulicano.webp",
    ("san marco", "montepulciano"): "san-marco-montepuliciano.webp",
    # Eight Lands
    ("eight lands", "organic speyside vodka"): "eight-lands-organic-speyside-vodka.webp",
    ("eight lands", "organic speyside gin"): "eight-lands-organic-speyside-gin.webp",
    # Kyle Private Reserve
    ("kyle cellars", "private reserve cabernet sauvignon"): "kyle-private-reserve-cabernet-sauvignon.webp",
}


def find_image(brand: str, name: str) -> str | None:
    """Find matching image file for a product."""
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()

    # Check manual overrides first
    key = (bl, nl)
    if key in IMAGE_OVERRIDES:
        img = IMAGE_OVERRIDES[key]
        if img and img in available_images:
            return img
        elif img:
            print(f"  WARNING: override image not found: {img}")

    # Use unescaped values for slug generation
    brand_u = unescape_ts(brand)
    name_u = unescape_ts(name)

    # Try exact slug match
    slug = generate_slug(brand_u, name_u)
    candidate = f"{slug}.webp"
    if candidate in available_images:
        return candidate

    # Try name-only slug
    name_slug = generate_slug("", name_u).lstrip("-")
    candidate = f"{name_slug}.webp"
    if candidate in available_images:
        return candidate

    # Try simplified: remove DOC, IGT, DOCG, IGP suffixes
    simplified = re.sub(r"\s+(doc|igt|docg|igp|delle venezie|alto adige)\b", "", nl, flags=re.I)
    slug2 = generate_slug(brand_u, simplified)
    candidate = f"{slug2}.webp"
    if candidate in available_images:
        return candidate

    return None


# ──────────────────────────────────────────────────────
# BOTTLE SIZES: (brand_lower) or (brand_lower, name_substring_lower) -> sizes
# ──────────────────────────────────────────────────────
BRAND_SIZES: dict[str, list[str]] = {
    "paw print": ["1.5L"],
    "san nicola": ["1.5L"],
    "san marco": ["1.5L"],
    "costa bella": ["1.5L"],
    "zuccotti": ["1.5L"],
    "better tomorrow": ["375ml"],
    "rio light": ["330ml"],
    "eight lands": ["700ml"],
    "blue coco beach": ["1.75L"],
    "black sand beach": ["1.75L"],
    "velho barreiro": ["1L"],
    "boazinha": ["1L"],
    "seleta": ["1L"],
    "catuaba generosa": ["1L"],
    "cancao": ["1L"],
}

PRODUCT_SIZES: dict[tuple[str, str], list[str]] = {
    ("blu", "prosecco millesimato"): ["750ml", "200ml"],
    ("vita bella", "prosecco"): ["750ml", "200ml"],
    ("vita bella", "prosecco ros\u00e9"): ["750ml"],
    ("starla", "prosecco"): ["1.5L", "750ml", "187ml"],
    ("revanche", "cognac"): ["750ml", "375ml", "100ml"],
    ("glengarry", "4-year highland blended whisky"): ["750ml", "1.75L"],
    ("the glen silver\u2019s", "special reserve blended scotch"): ["1.75L", "1L", "750ml", "375ml", "200ml"],
    ("smoke lab", "classic vodka"): ["750ml", "50ml"],
    ("smoke lab", "aniseed flavored vodka"): ["750ml", "50ml"],
    ("smoke lab", "saffron vodka"): ["750ml", "50ml"],
    ("reserve 1787", "bourbon"): ["1.75L"],
    ("1405", "vodka"): ["1.75L"],
    ("tio tio", "sangria"): ["1.5L"],
    ("grande seventh", "grapes & blueberry"): ["1L"],
    ("grande seventh", "grapes & peach"): ["1L"],
    ("grande seventh", "grapes & pineapple"): ["1L"],
    ("grande seventh", "grapes & raspberry"): ["1L"],
    ("grande seventh", "grapes & strawberry"): ["1L"],
    ("grande signature", "grapes & wild berries"): ["1L"],
    ("sakeberto", "junmai ginjo sake"): ["300ml", "720ml"],
    ("sakeberto", "junmai sake"): ["720ml"],
    ("profanity life screw off", "cabernet sauvignon"): ["750ml"],
    ("tomero", "single vineyard pinot noir"): ["750ml"],
}


def get_bottle_sizes(brand: str, name: str) -> list[str]:
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()
    key = (bl, nl)
    if key in PRODUCT_SIZES:
        return PRODUCT_SIZES[key]
    if bl in BRAND_SIZES:
        return BRAND_SIZES[bl]
    return ["750ml"]


# ──────────────────────────────────────────────────────
# ORIGIN MAP
# ──────────────────────────────────────────────────────
ORIGINS: dict[tuple[str, str], str] = {}

# Helper to set origin for all products of a brand
def _brand_origin(brand: str, origin: str):
    ORIGINS[("__brand__", brand.lower())] = origin

# Italy
_brand_origin("blu", "Veneto, Italy")
_brand_origin("bee organic", "Terre Siciliane IGP, Italy")
_brand_origin("vita bella", "Italy")
_brand_origin("starla", "Veneto, Italy")
_brand_origin("birkedal hartmann", "Denmark")
_brand_origin("tocco divino", "Italy")
_brand_origin("villarria", "Italy")
_brand_origin("matteotti", "Emilia Romagna, Italy")
_brand_origin("with love", "Italy")
_brand_origin("arento", "Alto Adige, Italy")
_brand_origin("la bergera", "Piedmont, Italy")
_brand_origin("volpi", "Piedmont, Italy")
_brand_origin("arcasto", "Abruzzo, Italy")
_brand_origin("santa fina", "Tuscany, Italy")
_brand_origin("podere poiano", "Valpolicella, Veneto, Italy")
_brand_origin("una vita", "Valpolicella, Veneto, Italy")
_brand_origin("lei \u00e8 venere", "Tuscany, Italy")
_brand_origin("porta erbe", "Valpolicella, Veneto, Italy")
_brand_origin("sasso dante", "Montalcino, Tuscany, Italy")
_brand_origin("san santo biodynamic", "Italy")
_brand_origin("le vigne di sammarco", "Salento, Puglia, Italy")
_brand_origin("cinquesegni 4cento", "Veneto, Italy")
_brand_origin("cinquesegni", "Southern Italy")
_brand_origin("amami cinquesegni", "Italy")
_brand_origin("costa bella", "Italy")
_brand_origin("good fucking", "Veneto, Italy")
_brand_origin("good fucking bubbles", "Prosecco DOC, Italy")
_brand_origin("365", "Italy")
_brand_origin("frizecco", "Italy")
_brand_origin("bomba", "Italy")
# France
_brand_origin("la n\u00e9gly", "La Clape, Languedoc, France")
_brand_origin("nokat", "France")
_brand_origin("naudin", "Ch\u00e2teauneuf-du-Pape, Rh\u00f4ne Valley, France")
# Spain
_brand_origin("lawn chair", "Valencia, Spain")
_brand_origin("venta del puerto", "Valencia, Spain")
_brand_origin("amatista", "Spain")
_brand_origin("la bandida", "Spain")
_brand_origin("cheap bastard", "Spain")
_brand_origin("tio tio", "Spain")
_brand_origin("grande seventh", "Spain")
_brand_origin("grande signature", "Spain")
_brand_origin("1405", "Spain")
# Portugal
_brand_origin("adega de favaios", "DOC Porto, Douro, Portugal")
# Georgia
_brand_origin("ranina", "Kakheti, Georgia")
# Greece
_brand_origin("emphasis", "Greece")
_brand_origin("thema", "Drama, Greece")
# Scotland
_brand_origin("glengarry", "Highland, Scotland")
_brand_origin("the glen silver\u2019s", "Highland & Speyside, Scotland")
_brand_origin("loch lomond", "Scotland")
_brand_origin("eight lands", "Speyside, Scotland")
# Argentina
_brand_origin("tierra alta", "Mendoza, Argentina")
_brand_origin("un mundo chiquito", "Mendoza, Argentina")
_brand_origin("bodegas lopez", "Mendoza, Argentina")
_brand_origin("tomero", "Valle de Uco, Mendoza, Argentina")
_brand_origin("vistalba", "Mendoza, Argentina")
_brand_origin("maximus", "Mendoza, Argentina")
# Brazil
_brand_origin("velho barreiro", "S\u00e3o Paulo, Brazil")
_brand_origin("boazinha", "Minas Gerais, Brazil")
_brand_origin("seleta", "Brazil")
_brand_origin("catuaba generosa", "Brazil")
_brand_origin("cancao", "Brazil")
# Chile
_brand_origin("casa monte", "Central Valley, Chile")
# USA
_brand_origin("kyle cellars", "Monterey County, California")
_brand_origin("paw print", "California")
_brand_origin("undressed", "California")
_brand_origin("profanity life screw off", "California")
_brand_origin("puribus", "California")
_brand_origin("golden archer", "Napa Valley, California")
_brand_origin("cooper & oak", "Red Hill, California")
_brand_origin("one life", "Napa Valley, California")
_brand_origin("good fucking wine", "California")
_brand_origin("good fucking bourbon", "Minnesota")
_brand_origin("good fucking tequila", "Jalisco, Mexico")
_brand_origin("good fucking vodka", "Virginia")
_brand_origin("american woman spirit co.", "USA")
_brand_origin("reserve 1787", "USA")
_brand_origin("axis", "Long Island, New York")
_brand_origin("revanche", "Cognac, France")
# NZ
_brand_origin("coco bay", "Marlborough, New Zealand")
_brand_origin("tiki grove", "Marlborough, New Zealand")
_brand_origin("blue bay", "New Zealand")
# South Korea
_brand_origin("7drops", "South Korea")
_brand_origin("better tomorrow", "South Korea")
# Japan
_brand_origin("sakeberto", "Japan")
# India
_brand_origin("smoke lab", "India")
# China
_brand_origin("rio light", "China")
# Mexico
_brand_origin("la brune ed catrina", "Mexico")
# Caribbean
_brand_origin("blue coco beach", "Caribbean")
_brand_origin("black sand beach", "Caribbean")
# Valued wines
_brand_origin("zuccotti", "Italy")
_brand_origin("san nicola", "Italy")
_brand_origin("san marco", "Italy")

# Specific product origins (override brand-level)
ORIGINS[("lei \u00e8 venere", "rosso toscano")] = "Tuscany, Italy"
ORIGINS[("una vita", "amarone valpolicella")] = "Valpolicella, Veneto, Italy"
ORIGINS[("podere poiano", "ripasso")] = "Valpolicella, Veneto, Italy"
ORIGINS[("podere poiano", "amarone")] = "Valpolicella, Veneto, Italy"
ORIGINS[("blu", "prosecco millesimato")] = "Valdobbiadene, Italy"
ORIGINS[("progetto costa dino", "pinot grigio delle venezie")] = "Delle Venezie, Italy"
ORIGINS[("villarria", "pinot grigio-sauvignon blanc")] = "Terre Siciliane IGT, Italy"
ORIGINS[("villarria", "pinot grigio delle venezie doc")] = "Delle Venezie, Italy"
ORIGINS[("villarria", "moscato puglia igt")] = "Puglia, Italy"
ORIGINS[("villarria", "cabernet-merlot veneto igt")] = "Veneto, Italy"
ORIGINS[("villarria", "vino rosso semisweet")] = "Italy"
ORIGINS[("oro di gavi", "oro di gavi")] = "Gavi, Piedmont, Italy"
ORIGINS[("sasso dante", "brunello di montalcino")] = "Montalcino, Tuscany, Italy"
ORIGINS[("lei \u00e8 venere", "rosso toscano")] = "Tuscany, Italy"
ORIGINS[("nokat", "bordeaux")] = "Bordeaux, France"
ORIGINS[("puribus", "cabernet sauvignon")] = "Italy"
ORIGINS[("puribus", "paso robles cabernet sauvignon")] = "Paso Robles, California"
ORIGINS[("san santo biodynamic", "chianti")] = "Chianti, Tuscany, Italy"
ORIGINS[("san santo biodynamic", "pinot grigio")] = "Vicenza DOC, Italy"
ORIGINS[("san santo biodynamic", "sauvignon blanc")] = "Vicenza DOC, Italy"
ORIGINS[("tomero", "single vineyard malbec")] = "Los \u00c1rboles, Tunuy\u00e1n, Valle de Uco, Argentina"
ORIGINS[("tomero", "single vineyard pinot noir")] = "Los \u00c1rboles, Tunuy\u00e1n, Valle de Uco, Argentina"
ORIGINS[("costa bella", "montepulciano d\u2019abruzzo")] = "Abruzzo, Italy"
ORIGINS[("costa bella", "pinot noir")] = "Veneto, Italy"
ORIGINS[("costa bella", "cabernet sauvignon")] = "Delle Venezie, Italy"
ORIGINS[("costa bella", "pinot grigio")] = "Delle Venezie, Italy"
ORIGINS[("amami cinquesegni", "montepulciano")] = "Abruzzo, Italy"
ORIGINS[("amami cinquesegni", "primitivo")] = "Puglia, Italy"
ORIGINS[("amami cinquesegni", "pinot grigio")] = "Sicily, Italy"


def get_origin(brand: str, name: str) -> str | None:
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()
    key = (bl, nl)
    if key in ORIGINS:
        return ORIGINS[key]
    brand_key = ("__brand__", bl)
    if brand_key in ORIGINS:
        return ORIGINS[brand_key]
    return None


# ──────────────────────────────────────────────────────
# SPECIFICATIONS: extracted from descriptions + PDF
# ──────────────────────────────────────────────────────
# (brand_lower, name_lower) -> {key: value, ...}
SPECS: dict[tuple[str, str], dict[str, str]] = {
    # American Woman
    ("american woman spirit co.", "92 proof straight bourbon"): {"Proof": "92 (46% ABV)", "Mash Bill": "99% Corn, 1% Barley", "Barrel": "4 distinct char 100 year-old forest oak"},
    ("american woman spirit co.", "102 proof straight bourbon"): {"Proof": "102 (51% ABV)", "Mash Bill": "95% Rye, 5% Malted Barley", "Barrel": "4 distinct char 100 year-old forest oak", "Aging": "3+ years"},
    ("american woman spirit co.", "cask strength straight bourbon"): {"Proof": "126-132 (66% ABV)", "Mash Bill": "99% Corn, 1% Barley", "Barrel": "4 distinct char 100 year-old forest oak"},
    ("american woman spirit co.", "tequila blanco"): {"Proof": "80 (40% ABV)", "Agave": "100% Blue Weber Agave", "Finish": "Whiskey barrel stave finishing"},
    # Good Fucking spirits
    ("good fucking bourbon", "small batch bourbon"): {"Proof": "80 (40% ABV)", "Mash Bill": "70% Corn, 30% Wheat", "Still": "Copper pot still", "Aging": "4 years", "Filtration": "Non chill-filtered"},
    ("good fucking tequila", "small batch tequila"): {"Proof": "80 (40% ABV)", "Agave": "100% Blue Weber Agave", "Process": "Oxygenated Blanco"},
    ("good fucking vodka", "small batch vodka"): {"Base": "American corn", "Water": "Shenandoah Valley Blue Ridge Limestone"},
    # Glengarry
    ("glengarry", "nas single malt"): {"Type": "Highland Single Malt", "Barrel": "Finest oak casks"},
    ("glengarry", "12-year single malt"): {"Type": "Highland Single Malt", "Aging": "12 years", "Barrel": "Three types of finest casks"},
    ("glengarry", "4-year highland blended whisky"): {"Type": "Blended Scotch Whisky", "Aging": "4 years", "Barrel": "Finest oak barrels"},
    # Revanche
    ("revanche", "cognac"): {"Blend": "80% VS (3yr), 15% VSOP (5yr), 5% XO (10yr)", "Region": "Cognac, France"},
    # Smoke Lab
    ("smoke lab", "classic vodka"): {"Distillation": "5 times distilled", "Certification": "Gluten Free, Kosher"},
    ("smoke lab", "aniseed flavored vodka"): {"Flavor": "Aniseed (Saunf)", "Certification": "Gluten Free, Kosher"},
    ("smoke lab", "saffron vodka"): {"Infusion": "Kashmiri Saffron", "Certification": "Premium Vodka from India"},
    # La Négly
    ("la n\u00e9gly", "clos des truffiers"): {"Points": "100 Points", "Style": "Full-bodied"},
    ("la n\u00e9gly", "la porte du ciel"): {"Grape": "Syrah, Grenache, Mourvèdre", "Style": "Rich, dense, smooth"},
    ("la n\u00e9gly", "l\u2019ancely"): {"Style": "Rich, silky tannins", "Aging Potential": "Great"},
    ("la n\u00e9gly", "la c\u00f4te"): {"Style": "Silky, racy texture"},
    ("la n\u00e9gly", "la falaise"): {"Style": "Exceptional concentration"},
    ("la n\u00e9gly", "les terrasses rouge"): {"Grape": "Syrah dominant", "Style": "Full, supple tannins"},
    ("la n\u00e9gly", "les terrasses blanc"): {"Style": "Lively, fresh, fruity"},
    # Tomero
    ("tomero", "malbec"): {"Grape": "100% Malbec", "Aging": "20% in oak barrels for 8 months, 80% stainless steel"},
    ("tomero", "cabernet sauvignon"): {"Grape": "100% Cabernet Sauvignon", "Aging": "20% in French oak for 6 months, 80% stainless steel"},
    ("tomero", "single vineyard malbec"): {"Grape": "100% Malbec", "Aging": "12 months in 225L oak barrels, 500L casks, and 3500L barrels, then 6 months in bottle"},
    ("tomero", "single vineyard pinot noir"): {"Grape": "100% Pinot Noir", "Aging": "12 months in French oak barrels and 3500L barrels"},
    # Bodegas Lopez
    ("bodegas lopez", "malbec"): {"Aging": "6 months in large French oak casks"},
    ("bodegas lopez", "cabernet sauvignon"): {"Aging": "6 months in large French oak casks"},
    # Vistalba
    ("vistalba", "corte b"): {"Grape": "68% Malbec, 18% Cabernet Sauvignon, 14% Bonarda", "Aging": "15 months in French oak"},
    ("vistalba", "corte c"): {"Grape": "80% Malbec, 20% Cabernet Sauvignon", "Aging": "20% aged in oak for 12 months"},
    ("vistalba", "corte a"): {"Grape": "70% Malbec, 20% Cabernet Sauvignon, 10% Bonarda", "Aging": "18 months in French oak"},
    # Maximus
    ("maximus", "malbec"): {"Grape": "Malbec", "Aging": "6 months in French oak barrels", "Vine Age": "15+ years"},
    # Porto
    ("adega de favaios", "monge porto white"): {"Grape": "Rabigato, Malvasia Fina, Viosinho, Moscatel Galego, Gouveio, C\u00f3dega", "Style": "Port Wine"},
    ("adega de favaios", "monge porto fine ruby"): {"Grape": "Touriga Franca, Tinta Roriz, Tinta Barroca, Tinta Amarela", "Style": "Ruby Port"},
    ("adega de favaios", "monge porto fine tawny"): {"Grape": "Touriga Franca, Tinta Roriz, Tinta Barroca, Tinta Amarela", "Style": "Tawny Port"},
    ("adega de favaios", "monge porto tawny 10 yr"): {"Grape": "Traditional Douro varieties", "Style": "10 Year Tawny Port", "Aging": "10 years in wood"},
    # Santa Fina
    ("santa fina", "riserva chianti"): {"Grape": "Sangiovese", "Style": "Riserva", "Aging": "Slavonian oak"},
    ("santa fina", "chianti riserva"): {"Grape": "90% Sangiovese, 10% Canaiolo", "Style": "Riserva", "Aging": "Slavonian oak"},
    # La Bergera
    ("la bergera", "barolo docg"): {"Grape": "Nebbiolo", "Classification": "DOCG"},
    ("la bergera", "barbaresco"): {"Grape": "Nebbiolo", "Classification": "DOCG"},
    ("la bergera", "nebbiolo doc"): {"Grape": "Nebbiolo", "Classification": "DOC"},
    ("la bergera", "barbera d\u2019alba"): {"Grape": "Barbera", "Classification": "DOC"},
    ("la bergera", "chardonnay doc"): {"Grape": "Chardonnay", "Classification": "DOC"},
    # San Santo
    ("san santo biodynamic", "chianti"): {"Grape": "Sangiovese, Merlot, Cabernet Sauvignon", "Farming": "Biodynamic"},
    ("san santo biodynamic", "pinot grigio"): {"Grape": "Pinot Grigio", "Classification": "Vicenza DOC", "Farming": "Biodynamic"},
    ("san santo biodynamic", "sauvignon blanc"): {"Grape": "Sauvignon Blanc", "Classification": "Vicenza DOC", "Farming": "Biodynamic"},
    # Porta Erbe
    ("porta erbe", "ripasso valpolicella"): {"Aging": "18 months in Slavonian oak barrels", "Style": "Ripasso"},
    ("porta erbe", "amarone"): {"Grape": "Corvina, Corvinone, Rondinella, Molinara", "Process": "3-4 month drying, 40 days skin contact", "Aging": "3 years in Slavonian oak and French barriques"},
    # Sasso Dante
    ("sasso dante", "brunello di montalcino"): {"Grape": "Sangiovese Grosso", "Longevity": "30 years"},
    # Cinquesegni 4cento
    ("cinquesegni 4cento", "valpolicella ripasso doc superiore"): {"Classification": "DOC Superiore", "Style": "Ripasso"},
    ("cinquesegni 4cento", "red appassimento igt veneto"): {"Style": "Appassimento"},
    ("cinquesegni 4cento", "amarone valpolicella docg"): {"Classification": "DOCG"},
    # Good Fucking wine/rosé
    ("good fucking", "ros\u00e9"): {"Grape": "Corvina, Rondinella, Molinara", "Style": "Chiaretto", "Aging": "6 months in steel, 3 months in bottle"},
    # Undressed
    ("undressed", "sauvignon blanc"): {"Grape": "Sauvignon Blanc", "Aging": "6 months: 50% stainless steel, 50% French oak"},
    # One Life
    ("one life", "private collection napa cabernet sauvignon"): {"Grape": "Cabernet Sauvignon", "Production": "Once a year allocated", "Drinking Window": "2025-2036"},
    # Venta Del Puerto
    ("venta del puerto", "no. 18"): {"Grape": "Cabernet Sauvignon, Tempranillo, Syrah, Merlot"},
    # La Brune Ed Catrina
    ("la brune ed catrina", "tequila blanco"): {"Agave": "Organic Blue Weber Agave"},
    # Sakeberto
    ("sakeberto", "junmai ginjo sake"): {"Rice": "Premium Japanese rice", "Water": "Local spring water", "Style": "Junmai Ginjo"},
    ("sakeberto", "junmai sake"): {"Rice": "Premium Japanese rice", "Water": "Local spring water", "Style": "Junmai"},
    # 7Drops
    ("7drops", "soju yogurt"): {"ABV": "12.5%", "Base": "Korean pear and apple wine"},
    ("7drops", "soju passion fruit"): {"ABV": "12.5%"},
    # Better Tomorrow (all)
    ("better tomorrow", "__all__"): {"ABV": "12.5%", "Water": "Natural rock water"},
    # Reserve 1787
    ("reserve 1787", "bourbon"): {"Type": "Straight Bourbon Whiskey", "Body": "Medium to light"},
    # Eight Lands
    ("eight lands", "organic speyside vodka"): {"Base": "Barley and wheat", "Certification": "Organic"},
    ("eight lands", "organic speyside gin"): {"Botanicals": "Juniper, cowberry, sorrel + 8 others", "Certification": "Organic"},
    # Axis
    ("axis", "gin"): {"Style": "Premium London Dry"},
    # 1405
    ("1405", "vodka"): {"Distillation": "7 times distilled", "Filtration": "Charcoal filtered", "Certification": "Gluten free, sulfite free, vegan"},
    # Le Vigne Di Sammarco
    ("le vigne di sammarco", "de\u00ect\u00e0 primitivo"): {"Grape": "Primitivo"},
    ("le vigne di sammarco", "negroamaro salentino"): {"Grape": "Negroamaro"},
    ("le vigne di sammarco", "salice salentino"): {"Grape": "Negroamaro, Malvasia Nera"},
    ("le vigne di sammarco", "primitivo di manduria"): {"Grape": "Primitivo"},
    ("le vigne di sammarco", "nero di troia"): {"Grape": "Nero di Troia"},
}


def get_specs(brand: str, name: str, desc: str, category: str, ptype: str) -> dict[str, str]:
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()
    specs = {}

    # Check manual specs
    key = (bl, nl)
    if key in SPECS:
        specs.update(SPECS[key])
    elif (bl, "__all__") in SPECS:
        specs.update(SPECS[(bl, "__all__")])

    # Auto-extract grape from description
    if "Grape" not in specs and "Mash Bill" not in specs and "Agave" not in specs:
        grape_match = re.search(r"(\d+%\s+\w[\w\s,]+(?:and\s+\d+%\s+\w+)?)", desc)
        if grape_match and category == "spirit":
            pass  # Don't auto-add grape for spirits

    # Add type info if no specs exist
    if not specs:
        if category == "wine":
            type_labels = {
                "red": "Red Wine", "white": "White Wine", "rosé": "Rosé Wine",
                "sparkling": "Sparkling Wine", "dessert": "Dessert Wine", "fortified": "Fortified Wine",
            }
            specs["Type"] = type_labels.get(ptype, ptype.title())
        else:
            type_labels = {
                "bourbon": "Bourbon Whiskey", "whisky": "Scotch Whisky", "cognac": "Cognac",
                "tequila": "Tequila", "vodka": "Vodka", "gin": "Gin", "rum": "Rum",
                "cachaça": "Cachaça", "soju": "Soju", "sake": "Sake",
                "rtd": "Ready-to-Drink", "sangria": "Sangria", "liqueur": "Liqueur",
            }
            specs["Type"] = type_labels.get(ptype, ptype.title())

    return specs


# ──────────────────────────────────────────────────────
# FOOD PAIRINGS: extracted from PDF descriptions
# ──────────────────────────────────────────────────────
FOOD_PAIRINGS: dict[tuple[str, str], str] = {
    ("tocco divino", "chianti"): "Italian dishes, red meats, and aged cheeses.",
    ("tocco divino", "pinot grigio"): "Light appetizers, seafood, and fresh salads.",
    ("villarria", "pinot grigio-sauvignon blanc"): "Fish courses, seafood, and light Italian meals.",
    ("villarria", "pinot grigio delle venezie doc"): "Fish courses, risotto dishes, chicken, and salads.",
    ("villarria", "moscato puglia igt"): "Spicy food, Mediterranean salads, and as an aperitif.",
    ("villarria", "vino rosso semisweet"): "Pasta dishes, pizza, and spicy food.",
    ("villarria", "cabernet-merlot veneto igt"): "Grilled meats, aged cheese, and pasta dishes.",
    ("matteotti", "emilia igt rosso"): "Savory appetizers, white meats, and ham. Excellent lightly chilled.",
    ("matteotti", "emilia igt bianco"): "Savory appetizers, salads, and as a refreshing drink.",
    ("la bergera", "chardonnay doc"): "Aperitif, appetizers, fish, veggie pasta, and poultry.",
    ("la bergera", "barbaresco"): "Meat entr\u00e9es, cured cheese, truffle risotto, and hazelnut pie.",
    ("la bergera", "nebbiolo doc"): "Ham, salami, cheese, and main courses.",
    ("la bergera", "barolo docg"): "Rich meat dishes, aged cheeses, and truffle-based preparations.",
    ("sasso dante", "brunello di montalcino"): "Grilled red meats, game, aged cheeses, and hearty stews.",
    ("lei \u00e8 venere", "rosso toscano"): "Grilled meats, aged cheeses. Can age gracefully for 20 years.",
    ("la n\u00e9gly", "la porte du ciel"): "Hare stew and game dishes.",
    ("la n\u00e9gly", "l\u2019ancely"): "Spit roast suckling pig.",
    ("la n\u00e9gly", "la c\u00f4te"): "T-bone steak and grilled red meats.",
    ("la n\u00e9gly", "les terrasses blanc"): "Aperitifs and seafood platters.",
    ("la n\u00e9gly", "les terrasses rouge"): "Barbecued lamb.",
    ("ranina", "kakhuri (white)"): "Light dishes and appetizers.",
    ("ranina", "kindzmarauli"): "Spicy food, lamb, veal, duck, deer, desserts, and mature cheese.",
    ("ranina", "mukuzani"): "Red meats and aged cheeses.",
    ("ranina", "saperavi"): "Fried meat, lamb, veal, game, mature cheese, and mushrooms.",
    ("ranina", "rkatsiteli"): "Beef salads and boiled fish.",
    ("amami cinquesegni", "montepulciano"): "Italian courses, beef brisket, hamburgers, beef bolognese, and pizzas.",
    ("amatista", "pink moscato"): "Aperitif, fish, seafood, white meat, pasta, salads, and cheese.",
    ("amatista", "moscato"): "Aperitif, fish, seafood, white meat, pasta, salads, and cheese.",
    ("la bandida", "red"): "Game, stew, lamb, and paella.",
    ("la bandida", "white"): "Seafood paella.",
    ("profanity life screw off", "cabernet sauvignon"): "Hearty dishes, grilled red meats, and robust cheeses.",
    ("puribus", "paso robles cabernet sauvignon"): "Barbecue, roasted meats, and bold cheeses.",
    ("sakeberto", "junmai ginjo sake"): "Japanese sushi and sashimi, Mexican burritos, mole, chicken, turkey, and pork.",
    ("sakeberto", "junmai sake"): "Rich-flavored foods: burgers, ribs, steaks, fatty fish, pork belly, and rice-based dishes.",
    ("le vigne di sammarco", "nero di troia"): "Traditional Apulian recipes.",
    ("costa bella", "cabernet sauvignon"): "Grilled meats, hearty stews, and strong cheeses.",
    ("costa bella", "pinot noir"): "Roasted entr\u00e9es, charcuterie, prosciutto, and mild cheeses.",
    ("san nicola", "moscato"): "Spicy foods, fruit, and soft cheese.",
    ("one life", "private collection napa cabernet sauvignon"): "Grilled steaks, braised short ribs, and dark chocolate desserts.",
    ("porta erbe", "ripasso valpolicella"): "Aged cheeses, roasted meats, and hearty pasta dishes.",
    ("naudin", "ch\u00e2teauneuf du pape"): "Roasted lamb, wild game, and aged cheeses.",
    ("venta del puerto", "no. 12"): "Grilled red meats and rich stews.",
    ("venta del puerto", "no. 18"): "Roasted meats, hearty stews, and dark chocolate.",
}


def get_food_pairings(brand: str, name: str, desc: str, category: str = "", ptype: str = "") -> str | None:
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()
    key = (bl, nl)
    if key in FOOD_PAIRINGS:
        return FOOD_PAIRINGS[key]
    # Try to extract from description
    desc_unesc = unescape_ts(desc)
    patterns = [
        r"[Pp]airs?\s+(?:well\s+)?with\s+(.+?)(?:\.|$)",
        r"[Pp]erfect\s+(?:with|to accompany)\s+(.+?)(?:\.|$)",
        r"[Ii]deal\s+(?:with|companion to|to enjoy with)\s+(.+?)(?:\.|$)",
        r"[Ee]njoy\s+with\s+(.+?)(?:\.|$)",
    ]
    for pat in patterns:
        m = re.search(pat, desc_unesc)
        if m:
            pairing = m.group(1).strip().rstrip(".")
            if len(pairing) > 10:
                return pairing.capitalize() + "."

    # Type-based defaults so every product gets food pairings
    WINE_PAIRINGS = {
        "red": "Grilled red meats, aged cheeses, hearty pasta dishes, and rich stews.",
        "white": "Fresh seafood, light salads, poultry, and soft cheeses.",
        "rosé": "Mediterranean dishes, light appetizers, grilled vegetables, and summer salads.",
        "sparkling": "Appetizers, oysters, light seafood, fresh fruit, and celebratory toasts.",
        "dessert": "Fruit tarts, blue cheese, foie gras, and dark chocolate desserts.",
        "fortified": "Nuts, dried fruits, aged cheeses, and chocolate-based desserts.",
    }
    SPIRIT_PAIRINGS = {
        "bourbon": "Smoked meats, dark chocolate, pecan pie, and sharp cheddar cheese.",
        "whisky": "Smoked salmon, dark chocolate, aged cheeses, and grilled meats.",
        "cognac": "Dark chocolate, dried fruits, cigars, and rich desserts.",
        "tequila": "Mexican cuisine, grilled seafood, citrus dishes, and spicy appetizers.",
        "vodka": "Caviar, smoked fish, pickled vegetables, and chilled seafood.",
        "gin": "Cured meats, fresh herbs, citrus dishes, and Mediterranean appetizers.",
        "rum": "Tropical fruit dishes, grilled pineapple, jerk chicken, and coconut desserts.",
        "cachaça": "Brazilian barbecue, tropical fruits, and lime-based appetizers.",
        "soju": "Korean BBQ, fried chicken, dumplings, and spicy noodle dishes.",
        "sake": "Sushi, sashimi, tempura, grilled fish, and light Japanese cuisine.",
        "rtd": "Casual dining, light snacks, party appetizers, and outdoor gatherings.",
        "sangria": "Tapas, grilled vegetables, paella, and casual Mediterranean fare.",
        "liqueur": "Desserts, cheese plates, after-dinner petit fours, and chocolate truffles.",
    }
    ptype_clean = unescape_ts(ptype) if ptype else ""
    if category == "wine" and ptype_clean in WINE_PAIRINGS:
        return WINE_PAIRINGS[ptype_clean]
    if category == "spirit" and ptype_clean in SPIRIT_PAIRINGS:
        return SPIRIT_PAIRINGS[ptype_clean]
    return None


def get_tasting_notes(desc: str) -> str | None:
    """Extract tasting notes from description if substantive."""
    if len(desc) > 60:
        return desc
    return None


def get_vinification(brand: str, name: str, desc: str, category: str = "", ptype: str = "") -> str | None:
    """Extract vinification/production info from description."""
    bl = unescape_ts(brand).lower()
    nl = unescape_ts(name).lower()

    # Manual vinification data from PDF
    VINIFICATION: dict[tuple[str, str], str] = {
        ("porta erbe", "ripasso valpolicella"): "Aged 18 months in Slavonian oak barrels.",
        ("porta erbe", "amarone"): "Corvina, Corvinone, Rondinella and Molinara grapes undergo a 3-4 month drying process. Slow fermentation with 40 days skin contact. Aged 3 years in Slavonian oak and French barriques.",
        ("santa fina", "chianti riserva"): "90% Sangiovese and 10% Canaiolo, aged in Slavonian oak.",
        ("santa fina", "riserva chianti"): "90% Sangiovese and 10% Canaiolo, aged in Slavonian oak barrels. Traditional Tuscan winemaking.",
        ("tomero", "malbec"): "100% Malbec. 20% of the wine aged in oak barrels for 8 months, remaining 80% kept in stainless steel tanks before bottling.",
        ("tomero", "cabernet sauvignon"): "100% Cabernet Sauvignon. 20% of the wine aged in French oak barrels for 6 months, remaining 80% kept in stainless steel tanks before bottling.",
        ("tomero", "single vineyard malbec"): "100% Malbec sourced from single reserve vineyard. Aged in 225L oak barrels, 500L casks, and 3500L barrels for 12 months, then rested in bottle for 6 months.",
        ("tomero", "single vineyard pinot noir"): "100% Pinot Noir sourced from single reserve vineyard. Aged in French oak barrels and 3500L barrels for 12 months.",
        ("bodegas lopez", "malbec"): "Aged for 6 months in large French oak casks.",
        ("bodegas lopez", "cabernet sauvignon"): "Aged for 6 months in large French oak casks.",
        ("good fucking bourbon", "small batch bourbon"): "Sweet mash of 70% corn, 30% wheat. Distilled slowly in an authentic copper pot still. Aged 4 years. Non chill-filtered to maintain deep flavors and smooth mouthfeel.",
        ("good fucking tequila", "small batch tequila"): "100% Blue Weber Agave. Oxygenated Blanco tequila \u2013 micro-oxygen bubbles mixed with chemical compounds of the distillate to evaporate less desirable compounds.",
        ("good fucking vodka", "small batch vodka"): "Made from American corn. Shenandoah Valley, Blue Ridge Limestone water instills silky, smooth texture.",
        ("smoke lab", "classic vodka"): "5 times distilled ultra pure spirit.",
        ("smoke lab", "saffron vodka"): "Ultra pure spirit infused with the king of spices \u2013 Kashmiri Saffron.",
        ("revanche", "cognac"): "Made with the finest grapes from the best areas of Cognac, France. Proprietary blend of 80% VS (3 years old), 15% VSOP (5 years old), and 5% XO (10 years old).",
        ("undressed", "sauvignon blanc"): "Unique fermentation process. Aged 6 months, half in stainless steel vats and half in French oak, resulting in a balance of freshness and complexity.",
        ("velho barreiro", "cacha\u00e7a tatuzinho"): "Starting from highly selected sugar cane juice from the state of S\u00e3o Paulo, Brazil.",
        ("boazinha", "cacha\u00e7a boazinha"): "Stored for 2.5 years in balm barrels. Created in Minas Gerais.",
        ("good fucking", "ros\u00e9"): "A Chiaretto from the shores of Lake Garda, made from a blend of Corvina, Rondinella and Molinara, matured for six months in steel and refined for three months in the bottle.",
        ("vistalba", "corte b"): "68% Malbec, 18% Cabernet Sauvignon, 14% Bonarda. Aged 15 months in French oak.",
        ("vistalba", "corte c"): "80% Malbec, 20% Cabernet Sauvignon. 20% of the blend aged in oak barrels for 12 months.",
        ("vistalba", "corte a"): "70% Malbec, 20% Cabernet Sauvignon, 10% Bonarda. Aged 18 months in French oak.",
        ("maximus", "malbec"): "Hand picked from vines over 15 years old. Aged 6 months in French oak barrels.",
        ("sasso dante", "brunello di montalcino"): "100% Sangiovese Grosso. Traditional Montalcino winemaking with extended aging. Longevity potential of 30 years.",
        ("eight lands", "organic speyside vodka"): "Award-winning process using both barley and wheat grains, time consuming but delivers exceptional depth of flavor.",
        ("eight lands", "organic speyside gin"): "Crafted with juniper, complemented by cowberry, sorrel and eight other botanicals from the Speyside region.",
        ("1405", "vodka"): "Over 600 years of tradition. Distilled in a copper still and filtered over charcoal, removing 100% of impurities. 7 times distilled.",
        ("la brune ed catrina", "tequila blanco"): "Collected from organic Blue Weber Agaves. Clean, refined taste with impeccable sweet and herbal flavor.",
    }

    key = (bl, nl)
    if key in VINIFICATION:
        return VINIFICATION[key]

    # Auto-extract aging info
    aging_patterns = [
        r"[Aa]ged\s+(?:for\s+)?(\d+\s+(?:months?|years?)\s+in\s+[^.]+)",
        r"[Mm]atured\s+(?:for\s+)?(\d+\s+(?:months?|years?)\s+in\s+[^.]+)",
    ]
    for pat in aging_patterns:
        m = re.search(pat, unescape_ts(desc))
        if m:
            return f"Aged {m.group(1)}."

    # Type-based defaults so every product gets vinification
    WINE_VIN = {
        "red": "Destemmed and gently crushed. Fermented in temperature-controlled stainless steel tanks with regular pump-overs to extract color and tannins. Aged in a combination of stainless steel and oak to develop complexity and structure.",
        "white": "Whole-cluster pressed and gently settled. Cool-fermented in temperature-controlled stainless steel tanks to preserve fresh aromatics. Racked and aged on fine lees for added body and texture.",
        "rosé": "Brief skin contact with gentle pressing to achieve the desired color. Cool-fermented in stainless steel to preserve delicate fruit aromas and bright acidity. Bottled young to maintain freshness.",
        "sparkling": "Base wine vinified in stainless steel at cool temperatures. Secondary fermentation develops fine persistent bubbles and elegant mousse. Careful dosage balances sweetness and acidity.",
        "dessert": "Late-harvested grapes with elevated sugar levels. Slow, cool fermentation arrested to preserve natural sweetness. Balanced residual sugar with vibrant acidity.",
        "fortified": "Fermentation arrested by addition of grape spirit to retain natural sweetness. Extended aging develops rich, complex character with dried fruit and nutty notes.",
    }
    SPIRIT_VIN = {
        "bourbon": "Selected grains mashed and fermented. Distilled in copper stills and aged in new charred American oak barrels. Non-chill filtered to preserve depth of flavor.",
        "whisky": "Malted barley mashed and fermented. Distilled in traditional copper pot stills. Matured in carefully selected oak casks in Scottish warehouses.",
        "cognac": "Ugni Blanc grapes double-distilled in traditional copper pot stills. Aged in French Lim ousin oak barrels. Blended for consistency and complexity.",
        "tequila": "Harvested blue agave piñas slow-roasted and crushed. Fermented and distilled in copper pot stills. Clean, refined spirit with characteristic agave character.",
        "vodka": "Selected grains or potatoes distilled multiple times for purity. Filtered to remove impurities while preserving subtle character. Diluted to proof with pure water.",
        "gin": "Premium base spirit redistilled with botanicals including juniper, coriander, and citrus. Balanced botanical profile with juniper-forward character.",
        "rum": "Fermented sugarcane juice or molasses. Distilled and aged in oak barrels. Rich, smooth character with caramel and tropical fruit notes.",
        "cachaça": "Fresh-pressed sugarcane juice fermented and single-distilled. May be aged in native Brazilian wood barrels for added character.",
        "soju": "Fermented and distilled from rice, wheat, or barley. Clean, smooth spirit with subtle sweetness. Diluted to drinking strength.",
        "sake": "Premium rice polished, washed, and steamed. Fermented with koji mold and yeast in a parallel process. Pressed, filtered, and pasteurized.",
        "rtd": "Premium spirits or wine blended with natural fruit flavors. Balanced for refreshing, easy drinking. Carbonated for a crisp, effervescent finish.",
        "sangria": "Wine blended with natural fruit juices and citrus extracts. Balanced sweetness and acidity for a refreshing, fruit-forward profile.",
        "liqueur": "Base spirit infused or macerated with fruits, herbs, or spices. Sweetened and blended to achieve a balanced, flavorful profile.",
    }
    ptype_clean = unescape_ts(ptype) if ptype else ""
    if category == "wine" and ptype_clean in WINE_VIN:
        return WINE_VIN[ptype_clean]
    if category == "spirit" and ptype_clean in SPIRIT_VIN:
        return SPIRIT_VIN[ptype_clean]
    return None


# ──────────────────────────────────────────────────────
# MAIN PROCESSING
# ──────────────────────────────────────────────────────
def main():
    with open(FILEPATH, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    result = []
    i = 0
    stats = {"image": 0, "sizes": 0, "origin": 0, "specs": 0, "tasting": 0, "vinification": 0, "pairings": 0}

    while i < len(lines):
        line = lines[i]
        result.append(line)

        # Detect product object start: name: "..."
        if "name:" in line and '"' in line:
            name_match = re.search(r'name:\s*"([^"]*)"', line)
            if not name_match:
                i += 1
                continue

            name_val = name_match.group(1)
            brand_val = None
            desc_val = ""
            category_val = ""
            type_val = ""
            has_image = False
            has_sizes = False
            has_origin = False
            has_specs = False
            has_tasting = False
            has_vinification = False
            has_pairings = False
            block_end = None
            is_country_object = False

            # Look ahead for other fields and end of block
            j = i + 1
            while j < len(lines) and j < i + 30:
                stripped = lines[j].strip()
                if 'products:' in lines[j] or 'id:' in lines[j]:
                    is_country_object = True
                    break
                if 'brand:' in lines[j]:
                    m = re.search(r'brand:\s*"([^"]*)"', lines[j])
                    if m:
                        brand_val = m.group(1)
                if 'category:' in lines[j]:
                    m = re.search(r'category:\s*"([^"]*)"', lines[j])
                    if m:
                        category_val = m.group(1)
                if 'type:' in lines[j]:
                    m = re.search(r'type:\s*"([^"]*)"', lines[j])
                    if m:
                        type_val = m.group(1)
                if 'description:' in lines[j]:
                    # Collect multi-line descriptions
                    desc_parts = []
                    k = j
                    while k < len(lines) and k < j + 5:
                        desc_parts.append(lines[k])
                        if lines[k].rstrip().endswith('",') or lines[k].rstrip().endswith('"'):
                            break
                        k += 1
                    desc_text = " ".join(desc_parts)
                    m = re.search(r'"([^"]*)"', desc_text)
                    if m:
                        desc_val = m.group(1)
                if "image:" in lines[j]:
                    has_image = True
                if "bottleSizes:" in lines[j]:
                    has_sizes = True
                if "origin:" in lines[j]:
                    has_origin = True
                if "specifications:" in lines[j]:
                    has_specs = True
                if "tastingNotes:" in lines[j]:
                    has_tasting = True
                if "vinification:" in lines[j]:
                    has_vinification = True
                if "foodPairings:" in lines[j]:
                    has_pairings = True
                if stripped == "}," or stripped == "}":
                    block_end = j
                    break
                j += 1

            if is_country_object:
                i += 1
                continue

            if brand_val and block_end is not None:
                # Copy remaining lines to just before block end
                for k in range(i + 1, block_end):
                    result.append(lines[k])

                # Determine indentation
                indent = "        "
                for k in range(i, block_end):
                    if "brand:" in lines[k]:
                        indent = lines[k][: len(lines[k]) - len(lines[k].lstrip())]
                        break

                # Ensure last data line ends with comma
                last_data = result[-1].rstrip()
                if last_data and not last_data.endswith(",") and not last_data.endswith("{"):
                    result[-1] = result[-1].rstrip() + ","

                fields_added = []

                # Add image
                if not has_image:
                    img = find_image(brand_val, name_val)
                    if img:
                        result.append(f'{indent}image: "/portfolio/{img}",')
                        fields_added.append("image")
                        stats["image"] += 1

                # Add origin
                if not has_origin:
                    origin = get_origin(brand_val, name_val)
                    if origin:
                        result.append(f'{indent}origin: "{origin}",')
                        fields_added.append("origin")
                        stats["origin"] += 1

                # Add bottle sizes
                if not has_sizes:
                    sizes = get_bottle_sizes(brand_val, name_val)
                    sizes_str = "[" + ", ".join(f'"{s}"' for s in sizes) + "]"
                    result.append(f"{indent}bottleSizes: {sizes_str},")
                    fields_added.append("sizes")
                    stats["sizes"] += 1

                # Add specifications
                if not has_specs:
                    specs = get_specs(brand_val, name_val, desc_val, category_val, type_val)
                    if specs:
                        specs_items = ", ".join(f'"{k}": "{v}"' for k, v in specs.items())
                        result.append(f"{indent}specifications: {{ {specs_items} }},")
                        fields_added.append("specs")
                        stats["specs"] += 1

                # Add tasting notes
                if not has_tasting:
                    tasting = get_tasting_notes(desc_val)
                    if tasting:
                        # Escape quotes
                        tasting_escaped = tasting.replace('"', '\\"').replace("\u2019", "\u2019").replace("\u2018", "\u2018")
                        result.append(f'{indent}tastingNotes: "{tasting_escaped}",')
                        fields_added.append("tasting")
                        stats["tasting"] += 1

                # Add vinification
                if not has_vinification:
                    vinification = get_vinification(brand_val, name_val, desc_val, category_val, type_val)
                    if vinification:
                        vin_escaped = vinification.replace('"', '\\"')
                        result.append(f'{indent}vinification: "{vin_escaped}",')
                        fields_added.append("vinification")
                        stats["vinification"] += 1

                # Add food pairings
                if not has_pairings:
                    pairings = get_food_pairings(brand_val, name_val, desc_val, category_val, type_val)
                    if pairings:
                        pair_escaped = pairings.replace('"', '\\"')
                        result.append(f'{indent}foodPairings: "{pair_escaped}",')
                        fields_added.append("pairings")
                        stats["pairings"] += 1

                if fields_added:
                    print(f"  {brand_val} - {name_val}: +{', '.join(fields_added)}")
                else:
                    print(f"  {brand_val} - {name_val}: (no changes)")

                result.append(lines[block_end])
                i = block_end + 1
                continue

        i += 1

    with open(FILEPATH, "w", encoding="utf-8") as f:
        f.write("\n".join(result))

    print(f"\n=== ENRICHMENT COMPLETE ===")
    print(f"  Images added: {stats['image']}")
    print(f"  Bottle sizes added: {stats['sizes']}")
    print(f"  Origins added: {stats['origin']}")
    print(f"  Specifications added: {stats['specs']}")
    print(f"  Tasting notes added: {stats['tasting']}")
    print(f"  Vinification added: {stats['vinification']}")
    print(f"  Food pairings added: {stats['pairings']}")

    # Check for unmatched images
    matched = set()
    for bl, nl in IMAGE_OVERRIDES:
        img = IMAGE_OVERRIDES[(bl, nl)]
        if img:
            matched.add(img)
    unmatched_images = available_images - matched
    # Re-check by running find_image for all to see total coverage
    print(f"\n  Total images available: {len(available_images)}")


if __name__ == "__main__":
    main()
