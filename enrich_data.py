#!/usr/bin/env python3
"""
Enrich portfolio-data.ts with image mappings, bottle sizes, origins,
specifications, tasting notes, vinification notes, and food pairings.

Usage:
    python enrich_data.py

Reads app/data/portfolio-data.ts, enriches each product block with
additional fields, and writes the result back.
"""

import re
import os
import sys

# ────────────────────────────────────────────────────────────────
# 1. IMAGE MAP  (brand, name) -> filename
# ────────────────────────────────────────────────────────────────
IMAGE_MAP = {
    # Italy - Sparkling
    ("Blu", "Prosecco Millesimato"): "blu-prosecco.webp",
    ("Blu", "Pink Sparkling Ros\u00e9"): "pink-sparkling-rose.webp",
    ("Bee Organic", "Brut"): "bee-organic-brut.webp",
    ("Good Fucking Bubbles", "Spumante Extra Dry"): "good-fucking-bubbles-spumante-extra-dry.webp",
    ("Vita Bella", "Prosecco"): "vita-bella-prosecco.webp",
    ("Vita Bella", "Prosecco Ros\u00e9"): "vita-bella-prosecco-rose.webp",
    ("Starla", "Prosecco"): "starla-prosecco.webp",
    ("Birkedal Hartmann", "Ros\u00e9 All\u00e9e Sparkling"): "birkedal-hartmann-rose-allee-sparkling.webp",

    # Italy - White
    ("TocCo diVino", "Pinot Grigio"): "toco-divino-pinot-grigio.webp",
    ("Progetto Costa Dino", "Pinot Grigio Delle Venezie"): "progetto-costa-dino-pinot-grigio.webp",
    ("Villarria", "Pinot Grigio-Sauvignon Blanc"): "villarria-pino-grigio-sauvignon-blanc.webp",
    ("Villarria", "Pinot Grigio Delle Venezie DOC"): "villarria-pinot-grigio-delle-venezie-DOC.webp",
    ("Villarria", "Moscato Puglia IGT"): "villarria-moscato-puglia-IGT.webp",
    ("Matteotti", "Emilia IGT Bianco"): "matteotti-emilia-igt-bianco.webp",
    ("With Love", "Pinot Grigio IGT"): "with-love-pino-grigio-igt.webp",
    ("With Love", "Chardonnay"): "with-love-chardonnay.webp",
    ("Arento", "Pinot Grigio"): "arento-pinot-grigio-alto-adige.webp",
    ("La Bergera", "Chardonnay DOC"): "la-bergera-chardonnay.webp",
    ("Volpi", "Timorasso"): "volpi-timorasso.webp",
    ("Oro di Gavi", "Oro di Gavi"): "oro-di-gavi.webp",
    ("Good Fucking", "Pinot Grigio"): "good-fucking-pinot-grigio.webp",
    ("Costa Bella", "Pinot Grigio"): "costa-bella-pino-grigio.webp",
    ("San Santo Biodynamic", "Pinot Grigio"): "san-santo-diodynamic-farmed-pino-grigio.webp",
    ("San Santo Biodynamic", "Sauvignon Blanc"): "san-santo-diodynamic-farmed-sauvignon-blanc.webp",
    ("La N\u00e9gly", "Les Terrasses Blanc"): "la-negly-les-terrasses-blanc.webp",
    ("Amami Cinquesegni", "Pinot Grigio"): "amami-pino-grigio.webp",
    ("365", "Pinot Grigio"): "365-pino-grigio.webp",
    ("Bee Organic", "Sauvignon Blanc"): "bee-organic-sauvignon-blanc.webp",
    ("Bee Organic", "Chardonnay"): "bee-organic-chardonnay.webp",
    ("Bee Organic", "Pinot Grigio"): "bee-organic-pinot-grigio.webp",

    # Italy - Red
    ("TocCo diVino", "Chianti"): "toco-divino-chianti.webp",
    ("Volpi", "Barolo"): "volpi-barolo.webp",
    ("Villarria", "Vino Rosso Semisweet"): "villarria-vino-rosso-semisweet.webp",
    ("Villarria", "Cabernet-Merlot Veneto IGT"): "villarria-cabernet-merlot-veneto-igt.webp",
    ("Matteotti", "Emilia IGT Rosso"): "matteotti-emilia-igt-rosso.webp",
    ("Cinquesegni 4cento", "Valpolicella Ripasso DOC Superiore"): "4-cento-valpolicella-ripasso-doc-superiore.webp",
    ("Cinquesegni 4cento", "Red Appassimento IGT Veneto"): "4-cento-red-appassimento-igt-vento.webp",
    ("Cinquesegni 4cento", "Amarone Valpolicella DOCG"): "4-cento-amarone-valpolicella-docg.webp",
    ("Cinquesegni 4cento", "Corvina IGT Veneto"): "4-cento-corvina-igt-vento.webp",
    ("Le Vigne Di Sammarco", "De\u00ect\u00e0 Primitivo"): "le-vigne-di-sammarco-deita-primitivo.webp",
    ("Le Vigne Di Sammarco", "Negroamaro Salentino"): "le-vigne-di-sammarco-negroamaro-salentino.webp",
    ("Le Vigne Di Sammarco", "Salice Salentino"): "le-vigne-di-sammarco-salice-salentino.webp",
    ("Le Vigne Di Sammarco", "Primitivo Di Manduria"): "le-vigne-di-sammarco-primitivo-di-manduria.webp",
    ("Le Vigne Di Sammarco", "Nero Di Troia"): "le-vigne-di-sammarco-nero-di-troia.webp",
    ("With Love", "Cabernet Sauvignon"): "with-love-cabernet-sauvignon.webp",
    ("With Love", "Montepulciano D\u2019Abruzzo DOC"): "with-love-montepulciano-dabruzzo-doc.webp",
    ("With Love", "Merlot"): "with-love-merlot.webp",
    ("Santa Fina", "Riserva Chianti"): "santa-fina-riserva-chianti.webp",
    ("La Bergera", "Barbaresco"): "la-bergera-barbaresco.webp",
    ("La Bergera", "Nebbiolo DOC"): "la-bergara-nebbiolo.webp",
    ("La Bergera", "Barolo DOCG"): "la-bergera-barolo.webp",
    ("La Bergera", "Barbera d\u2019Alba"): "la-bergera-barbera-dalba.webp",
    ("Volpi", "Barbera"): "volpi-barbera.webp",
    ("Arcasto", "Montepulciano d\u2019Abruzzo DOC"): "arcasto-montepulciano-dabruzzo.webp",
    ("Sasso Dante", "Brunello di Montalcino"): "sasso-dante-brunello-di-montalcino.webp",
    ("Lei \u00e8 Venere", "Rosso Toscano"): "lei-e-venere-rosso-toscano.webp",
    ("Porta Erbe", "Ripasso Valpolicella"): "porta-erbe-ripasso-valpolicella.webp",
    ("Una Vita", "Amarone Valpolicella"): "una-vita-amarone-valpolecella.webp",
    ("Podere Poiano", "Ripasso"): "podere-poiano-ripasso.webp",
    ("Podere Poiano", "Amarone"): "podere-poiano-amarone.webp",
    ("Porta Erbe", "Amarone"): "porta-erbe-amarone.webp",
    ("Cinquesegni", "Il Segno"): "il-segno.webp",
    ("Amami Cinquesegni", "Montepulciano"): "amami-montepulciano.webp",
    ("Amami Cinquesegni", "Primitivo"): "amami-primitivo.webp",
    ("Cinquesegni", "Luna Passante Nero D\u2019Avola"): "luna-passante-nero-davola.webp",
    ("Costa Bella", "Cabernet Sauvignon"): "costa-bella-cabernet-sauvignon.webp",
    ("Costa Bella", "Montepulciano d\u2019Abruzzo"): "costa-bella-montepulicano-dabruzzo.webp",
    ("San Santo Biodynamic", "Chianti"): "san-santo-biodynamic-farmed-chianti.webp",
    ("Bee Organic", "Nero D\u2019Avola"): "bee-organic-nero-davola.webp",
    ("Bee Organic", "Merlot"): "bee-organic-merlot.webp",
    ("Bee Organic", "Cabernet Sauvignon"): "bee-organic-cabernet-sauvignon.webp",
    ("Bee Organic", "Pinot Noir"): "bee-organic-pinot-noir.webp",
    ("Santa Fina", "Chianti Riserva"): "santa-fina-chianti-riserva.webp",

    # Italy - Ros\u00e9
    ("With Love", "Ros\u00e9"): "with-love-rose.webp",
    ("Good Fucking", "Ros\u00e9"): "good-fucking-rose.webp",
    ("Costa Bella", "Pinot Noir"): "costa-bella-pinot-noir.webp",
    ("Bee Organic", "Ros\u00e9"): "bee-organic-rose.webp",

    # Italy - Dessert
    ("Bomba", "Moscato"): "bomba-moscato.webp",
    ("Frizecco", "Moscato Strawberry"): "frizecco-moscato-strawberry.webp",
    ("Frizecco", "Moscato Mango"): "frizecco-moscato-mango.webp",
    ("Frizecco", "Moscato Peach"): "frizecco-moscato-peach.webp",

    # France
    ("Naudin", "Ch\u00e2teauneuf du Pape"): "naudin-chateauneuf-du-pape.webp",
    ("La N\u00e9gly", "Clos Des Truffiers"): "la-negly-clos-des-truffiers.webp",
    ("La N\u00e9gly", "La Porte du Ciel"): "la-negly-la-porte-du-ciel.webp",
    ("La N\u00e9gly", "L\u2019Ancely"): "la-negly-lancely.webp",
    ("La N\u00e9gly", "La C\u00f4te"): "la-negly-la-cote.webp",
    ("La N\u00e9gly", "La Falaise"): "la-negly-la-falaise.webp",
    ("La N\u00e9gly", "Les Terrasses Rouge"): "la-negly-les-terrasses-rouge.webp",
    ("Nokat", "Bordeaux"): "nokat-bordeaux.webp",
    ("Nokat", "Sauvignon Blanc"): "nokat-sauvignon-blanc.webp",

    # Spain
    ("Lawn Chair", "Sauvignon Blanc"): "lawn-chair-sauvignon-blanc.webp",
    ("Venta Del Puerto", "No. 12"): "venta-del-puerto-no12.webp",
    ("Venta Del Puerto", "No. 18"): "venta-del-puerto-no18.webp",
    ("Amatista", "Pink Moscato"): "amatista-pink-moscato.webp",
    ("Amatista", "Moscato"): "amatista-moscato.webp",
    ("La Bandida", "Red"): "la-bandida-red.webp",
    ("La Bandida", "White"): "la-bandida-white.webp",
    ("Cheap Bastard", "Red"): "cheap-bastard-red.webp",
    ("Tio Tio", "Sangria"): "tio-tio-sangria.webp",
    ("Grande Seventh", "Grapes & Blueberry"): "grande-seventh-grapes-blueberry.webp",
    ("Grande Seventh", "Grapes & Peach"): "grande-seventh-grapes-peach.webp",
    ("Grande Seventh", "Grapes & Pineapple"): "grande-seventh-grapes-pineapple.webp",
    ("Grande Seventh", "Grapes & Raspberry"): "grande-seventh-grapes-raspberry.webp",
    ("Grande Seventh", "Grapes & Strawberry"): "grande-seventh-grapes-strawberry.webp",
    ("Grande Signature", "Grapes & Wild Berries"): "grande-signature-grapes-wild-berries.webp",
    ("1405", "Vodka"): "1405-vodka.webp",

    # Portugal
    ("Adega de Favaios", "Monge Porto White"): "adega-de-gavaios-monge-porto-white.webp",
    ("Adega de Favaios", "Monge Porto Fine Ruby"): "adega-de-favaios-monge-porto-fine-ruby.webp",
    ("Adega de Favaios", "Monge Porto Fine Tawny"): "adega-de-favaios-monge-porto-fine-tawny.webp",
    ("Adega de Favaios", "Monge Porto Tawny 10 Yr"): "adega-de-favaios-monge-porto-tawny-10yr.webp",

    # Georgia
    ("Ranina", "Kakhuri (White)"): "ranina=kakhuri.webp",
    ("Ranina", "Rkatsiteli"): "ranina-rkatsiteli.webp",
    ("Ranina", "Kindzmarauli"): "ranina-kindzmarauli.webp",
    ("Ranina", "Mukuzani"): "ranina-makuzani.webp",
    ("Ranina", "Saperavi"): "ranina-saperavi.webp",
    ("Ranina", "Ros\u00e9"): "ranina-rose.webp",

    # Greece
    ("Emphasis", "Red (Syrah)"): "emphasis-red.webp",
    ("Thema", "Red"): "thema-red.webp",
    ("Emphasis", "Assyrtiko"): "emphasis-assytriko.webp",
    ("Thema", "Assyrtiko"): "thema-assyrtiko.webp",

    # Scotland
    ("Glengarry", "NAS Single Malt"): "glengarry-nas-single-malt.webp",
    ("Glengarry", "12-Year Single Malt"): "glengarry-12year-single-malt-scotch.webp",
    ("Glengarry", "4-Year Highland Blended Whisky"): "glengarry-4year-highland-whisky.webp",
    ("The Glen Silver\u2019s", "Special Reserve Blended Scotch"): "the-glen-silvers-special-reserve-blended-scotch.webp",
    ("Loch Lomond", "Cristie Kerr 2002 US Open Edition"): "loch-lomond-cristie-kerr-2002.webp",
    ("Eight Lands", "Organic Speyside Vodka"): "eight-lands-organic-speyside-vodka.webp",
    ("Eight Lands", "Organic Speyside Gin"): "eight-lands-organic-speyside-gin.webp",

    # Argentina
    ("Tierra Alta", "Chardonnay"): "tierra-alta-charonnay.webp",
    ("Un Mundo Chiquito", "Malbec"): "un-mundo-chiquito-malbec.webp",
    ("Tierra Alta", "Malbec"): "tierra-alta-malbec.webp",
    ("Tierra Alta", "Cabernet Sauvignon"): "tierra-alta-cabrnet-sauvignon.webp",
    ("Vistalba", "Corte B"): "vistalba-corteb.webp",
    ("Vistalba", "Corte C"): "vistalba-corte-c.webp",
    ("Vistalba", "Corte A"): "vistalba-corte-a.webp",
    ("Maximus", "Cabernet Sauvignon"): "maximus-cabernet-sauvignon.webp",
    ("Maximus", "Malbec"): "maximus-malbec.webp",
    ("Bodegas Lopez", "Sauvignon Blanc"): "bodegas-lopez-sauvignon-blanc.webp",
    ("Bodegas Lopez", "Malbec"): "bodegas-lopez-malbec.webp",
    ("Bodegas Lopez", "Cabernet Sauvignon"): "bodegas-lopez-cabernet-sauvignon.webp",
    ("Tomero", "Malbec"): "tomero-malbec.webp",
    ("Tomero", "Cabernet Sauvignon"): "tomero-cabernet-sauvinon.webp",
    ("Tomero", "Single Vineyard Malbec"): "tomero-single-vineyard-malbec.webp",
    ("Tomero", "Single Vineyard Pinot Noir"): "tomero-single-vineyard-pinot-noir.webp",

    # Brazil
    ("Velho Barreiro", "Cacha\u00e7a Tatuzinho"): "cachaca-tatuzinho.webp",
    ("Boazinha", "Cacha\u00e7a Boazinha"): "cachaca-boazinha.webp",
    ("Velho Barreiro", "Cacha\u00e7a Tatuzinho Lime"): "cachaca-tatuzinho-lime.webp",
    ("Seleta", "Cacha\u00e7a Seleta Silver"): "cachaca-seleta-silver.webp",
    ("Catuaba Generosa", "Catuaba"): "catuaba-generosa.webp",
    ("Cancao", "Suave White"): "cancao-suave-white.webp",

    # Chile
    ("Casa Monte", "Chardonnay"): "casa-monte-chardonnay.webp",
    ("Casa Monte", "Cabernet Sauvignon"): "casa-monte-cabernet-sauvignon.webp",
    ("Casa Monte", "Sauvignon Blanc"): "casa-monte-sauvignon-blanc.webp",
    ("Casa Monte", "Merlot"): "casa-monte-merlot.webp",

    # USA
    ("Kyle Cellars", "Pinot Noir"): "kyle-cellars-pinot-noir.webp",
    ("Kyle Cellars", "Cabernet Sauvignon"): "kyle-cellars-cabernet-sauvignon.webp",
    ("Kyle Cellars", "Chardonnay"): "kyle-cellars-chardonnay.webp",
    ("Paw Print", "Sauvignon Blanc"): "paw-print-sauvignon-blanc.webp",
    ("Paw Print", "White Zinfandel"): "paw-print-white-zinfandel.webp",
    ("Paw Print", "Cabernet Sauvignon"): "paw-print-cabernet-sauvignon.webp",
    ("Paw Print", "Pinot Grigio"): "paw-print-pinot-grigio.webp",
    ("Profanity Life Screw Off", "Cabernet Sauvignon"): "profanity-life-screw-off-cabernet-sauvignon.webp",
    ("Undressed", "Sauvignon Blanc"): "undressed-sauvignon-blanc.webp",
    ("Puribus", "Paso Robles Cabernet Sauvignon"): "puribus-paso-robles-cabernet-sauvignon.webp",
    ("Golden Archer", "Napa Cabernet"): "golden-archer-napa-cabernet.webp",
    ("Cooper & Oak", "Cabernet Sauvignon"): "cooper-oak-cabernet-sauvignon.webp",
    ("One Life", "Pinot Noir"): "one-life-pinot-noir.webp",
    ("One Life", "Private Collection Napa Cabernet Sauvignon"): "one-life-napa-cabernet-sauvignon.webp",
    ("Good Fucking Wine", "Cabernet Sauvignon"): "good-fucking-wine-cabernet-sauvignon.webp",
    ("Good Fucking Wine", "Red Blend"): "good-fucking-wine-red-blend.webp",
    ("Good Fucking Wine", "Sweet Red"): "good-fucking-wine-sweet-red.webp",
    ("American Woman Spirit Co.", "92 Proof Straight Bourbon"): "american-woman-spirit-co-92-straight-bourbon-whisky.webp",
    ("American Woman Spirit Co.", "102 Proof Straight Bourbon"): "american-woman-spirit-co-102-proof-bourbon.webp",
    ("American Woman Spirit Co.", "Cask Strength Straight Bourbon"): "american-woman-spirit-co-cask-strength-straigh-bourbon.webp",
    ("American Woman Spirit Co.", "Tequila Blanco"): "american-woman-spirit-co-tequila-blanco.webp",
    ("Good Fucking Bourbon", "Small Batch Bourbon"): "good-fucking-bourbon-small-batch.webp",
    ("Good Fucking Tequila", "Small Batch Tequila"): "good-fucking-tequila-small-batch.webp",
    ("Good Fucking Vodka", "Small Batch Vodka"): "good-fucking-vodka-small-batch.webp",
    ("Reserve 1787", "Bourbon"): "reserve-1787-bourbon.webp",
    ("Axis", "Gin"): "axis-gin.webp",
    ("Revanche", "Cognac"): "revanche-cognac.webp",

    # New Zealand
    ("Coco Bay", "Sauvignon Blanc"): "coco-bay-marlborough-sauvignon-blanc.webp",
    ("Tiki Grove", "Sauvignon Blanc"): "tiki-grove-sauvignon-blanc.webp",
    ("Blue Bay", "Sauvignon Blanc"): "blue-bay-sauvignon-blanc.webp",

    # South Korea
    ("7Drops", "Soju Yogurt"): "7-drops-soju-yogurt.webp",
    ("7Drops", "Soju Passion Fruit"): "7-drops-soju-passion-fruit.webp",
    ("Better Tomorrow", "Apple Soju"): "better-tomorrow-apple-soju.webp",
    ("Better Tomorrow", "Blueberry Soju"): "better-tomorrow-blueberry-soju.webp",
    ("Better Tomorrow", "Grapefruit Soju"): "better-tomorrow-grapefruit-soju.webp",
    ("Better Tomorrow", "Lychee Soju"): "better-tomorrow-lychee-soju.webp",
    ("Better Tomorrow", "Pomegranate Soju"): "better-tomorrow-pomegranate-soju.webp",
    ("Better Tomorrow", "Green Grape Soju"): "better-tomorrow-green-grape-soju.webp",
    ("Better Tomorrow", "Pineapple Soju"): "better-tomorrow-pineapple-soju.webp",
    ("Better Tomorrow", "Mango Soju"): "better-tomorrow-mango-soju.webp",
    ("Better Tomorrow", "Strawberry Soju"): "better-tomorrow-strawberry-soju.webp",
    ("Better Tomorrow", "Peach Soju"): "better-tomorrow-peach-soju.webp",
    ("Better Tomorrow", "Watermelon Soju"): "better-tomorrow-watermelon-soju.webp",

    # Japan
    ("Sakeberto", "Junmai Ginjo Sake"): "sakeberto-junmai-ginjo-sake.webp",
    ("Sakeberto", "Junmai Sake"): "sakeberto-junmai.webp",

    # India
    ("Smoke Lab", "Classic Vodka"): "smoke-lab-classic-vodka.webp",
    ("Smoke Lab", "Aniseed Flavored Vodka"): "smoke-lab-aniseed-flavored-vodka.webp",
    ("Smoke Lab", "Saffron Vodka"): "smoke-lab-saffron-vodka.webp",

    # China
    ("Rio Light", "Peach & Brandy Flavor"): "rio-light-peach-brandy.webp",
    ("Rio Light", "Passion Fruit & Vodka Flavor"): "rio-light-passion-fruit-vodka.webp",
    ("Rio Light", "Ros\u00e9 Lychee & Brandy Flavor"): "rio-light-rose-lychee-brandy.webp",
    ("Rio Light", "Yogurt & Vodka Flavor"): "rio-light-yogurt-vodka.webp",

    # Mexico
    ("La Brune Ed Catrina", "Tequila Blanco"): "la-brune-ed-catrina-tequila-blanco.webp",

    # Caribbean
    ("Blue Coco Beach", "Spiced Rum"): "blue-coco-beach-carribean-spiced-rum.webp",
    ("Black Sand Beach", "Black Spiced Rum"): "black-sand-beach-black-spiced-rum.webp",

    # Valued Wines
    ("Zuccotti", "Pinot Grigio"): "zuccotti-pinot-grigio.webp",
    ("San Nicola", "Pinot Grigio"): "san-nicola-pinot-grigio.webp",
    ("San Nicola", "Sauvignon Blanc"): "san-nicola-sauvignon-blanc.webp",
    ("San Nicola", "Cabernet Sauvignon"): "san-nicola-cabernet-sauvignon.webp",
    ("San Nicola", "Moscato"): "san-nicola-moscato.webp",
    ("San Nicola", "Montepulciano"): "san-nicola-montepulicano.webp",
    ("San Nicola", "Merlot"): "san-nicola-merlot.webp",
    ("San Nicola", "Pinot Noir"): "san-nicola-pinot-noir.webp",
    ("San Marco", "Chianti"): "san-marco-chianti.webp",
    ("San Marco", "Montepulciano"): "san-marco-montepuliciano.webp",
}


# ────────────────────────────────────────────────────────────────
# 2. BOTTLE SIZE RULES
# ────────────────────────────────────────────────────────────────

BRAND_DEFAULT_SIZES = {
    "Paw Print": ["1.5L"],
    "San Nicola": ["1.5L"],
    "San Marco": ["1.5L"],
    "Better Tomorrow": ["375ml"],
    "Rio Light": ["330ml"],
    "Eight Lands": ["700ml"],
    "Blue Coco Beach": ["1.75L"],
    "Black Sand Beach": ["1.75L"],
    "Velho Barreiro": ["1L"],
    "Zuccotti": ["1.5L"],
}

# (brand, name_substring) -> sizes
# Order matters: more-specific entries first for brands with multiple overrides
SPECIFIC_SIZE_OVERRIDES = [
    ("Blu", "Prosecco Millesimato", ["750ml", "200ml"]),
    ("Vita Bella", "Prosecco Ros", None),  # no override for Rosé, will fall through to default 750ml
    ("Vita Bella", "Prosecco", ["750ml", "200ml"]),
    ("Starla", "Prosecco", ["1.5L", "750ml", "187ml"]),
    ("Costa Bella", "Pinot Grigio", ["750ml", "1.5L"]),
    ("Sakeberto", "Junmai Ginjo", ["300ml", "720ml"]),
    ("Sakeberto", "Junmai", ["720ml"]),
    ("Revanche", "Cognac", ["750ml", "375ml", "100ml"]),
    ("Glengarry", "4-Year", ["750ml", "1.75L"]),
    ("The Glen Silver", "Special Reserve", ["1.75L", "1L", "750ml", "375ml", "200ml"]),
    ("Smoke Lab", "", ["750ml", "50ml"]),  # empty string matches all Smoke Lab products
    ("Reserve 1787", "Bourbon", ["1.75L"]),
    ("1405", "Vodka", ["1.75L"]),
    ("Tio Tio", "Sangria", ["1.5L"]),
]


def get_bottle_sizes(brand, name):
    """Determine bottle sizes for a product."""
    # Check specific overrides first
    for ovr_brand, ovr_substr, ovr_sizes in SPECIFIC_SIZE_OVERRIDES:
        if brand.startswith(ovr_brand) and ovr_substr in name:
            if ovr_sizes is not None:
                return ovr_sizes
            # None means skip this override, continue checking
    # Check brand defaults
    if brand in BRAND_DEFAULT_SIZES:
        return BRAND_DEFAULT_SIZES[brand]
    # Default
    return ["750ml"]


# ────────────────────────────────────────────────────────────────
# 3. ORIGIN MAP
# ────────────────────────────────────────────────────────────────

# Brand-level origin mapping (brand -> origin)
BRAND_ORIGIN = {
    "Blu": "Valdobbiadene, Italy",
    "Bee Organic": "Terre Siciliane, Italy",
    "Good Fucking Bubbles": "Veneto, Italy",
    "Vita Bella": "Veneto, Italy",
    "Starla": "Veneto, Italy",
    "Birkedal Hartmann": "Veneto, Italy",
    "TocCo diVino": "Tuscany, Italy",
    "Progetto Costa Dino": "Veneto, Italy",
    "Villarria": "Veneto, Italy",
    "Matteotti": "Emilia-Romagna, Italy",
    "With Love": "Italy",
    "Arento": "Alto Adige, Italy",
    "La Bergera": "Piedmont, Italy",
    "Volpi": "Piedmont, Italy",
    "Oro di Gavi": "Piedmont, Italy",
    "Good Fucking": "Veneto, Italy",
    "Costa Bella": "Italy",
    "San Santo Biodynamic": "Veneto, Italy",
    "La N\u00e9gly": "Languedoc, France",
    "Amami Cinquesegni": "Sicily, Italy",
    "365": "Italy",
    "Cinquesegni 4cento": "Veneto, Italy",
    "Le Vigne Di Sammarco": "Salento, Italy",
    "Santa Fina": "Tuscany, Italy",
    "Arcasto": "Abruzzo, Italy",
    "Sasso Dante": "Tuscany, Italy",
    "Lei \u00e8 Venere": "Tuscany, Italy",
    "Porta Erbe": "Veneto, Italy",
    "Una Vita": "Veneto, Italy",
    "Podere Poiano": "Veneto, Italy",
    "Cinquesegni": "Italy",
    "Bomba": "Italy",
    "Frizecco": "Italy",
    "Naudin": "Rh\u00f4ne Valley, France",
    "Nokat": "France",
    "Lawn Chair": "Valencia, Spain",
    "Venta Del Puerto": "Valencia, Spain",
    "Amatista": "Spain",
    "La Bandida": "Spain",
    "Cheap Bastard": "Spain",
    "Tio Tio": "Spain",
    "Grande Seventh": "Spain",
    "Grande Signature": "Spain",
    "1405": "Spain",
    "Adega de Favaios": "Douro, Portugal",
    "Ranina": "Kakheti, Georgia",
    "Emphasis": "Drama, Greece",
    "Thema": "Drama, Greece",
    "Glengarry": "Scotland",
    "The Glen Silver\u2019s": "Scotland",
    "Loch Lomond": "Scotland",
    "Eight Lands": "Speyside, Scotland",
    "Tierra Alta": "Argentina",
    "Un Mundo Chiquito": "Mendoza, Argentina",
    "Vistalba": "Mendoza, Argentina",
    "Maximus": "Argentina",
    "Bodegas Lopez": "Mendoza, Argentina",
    "Tomero": "Valle de Uco, Mendoza, Argentina",
    "Velho Barreiro": "S\u00e3o Paulo, Brazil",
    "Boazinha": "Minas Gerais, Brazil",
    "Seleta": "Brazil",
    "Catuaba Generosa": "Brazil",
    "Cancao": "Brazil",
    "Casa Monte": "Chile",
    "Kyle Cellars": "Monterey County, California",
    "Paw Print": "California",
    "Profanity Life Screw Off": "California",
    "Undressed": "California",
    "Puribus": "Paso Robles, California",
    "Golden Archer": "Napa Valley, California",
    "Cooper & Oak": "Red Hill, California",
    "One Life": "California",
    "Good Fucking Wine": "California",
    "American Woman Spirit Co.": "United States",
    "Good Fucking Bourbon": "Minnesota",
    "Good Fucking Tequila": "Jalisco, Mexico",
    "Good Fucking Vodka": "Virginia",
    "Reserve 1787": "United States",
    "Axis": "Long Island, New York",
    "Revanche": "Cognac, France",
    "Coco Bay": "Marlborough, New Zealand",
    "Tiki Grove": "Marlborough, New Zealand",
    "Blue Bay": "Marlborough, New Zealand",
    "7Drops": "South Korea",
    "Better Tomorrow": "South Korea",
    "Sakeberto": "Japan",
    "Smoke Lab": "India",
    "Rio Light": "China",
    "La Brune Ed Catrina": "Jalisco, Mexico",
    "Blue Coco Beach": "Caribbean",
    "Black Sand Beach": "Caribbean",
    "Zuccotti": "Italy",
    "San Nicola": "Italy",
    "San Marco": "Italy",
}


# ────────────────────────────────────────────────────────────────
# 4. SPECIFICATIONS EXTRACTION
# ────────────────────────────────────────────────────────────────

# Hand-curated specifications keyed by (brand, name)
SPECIFIC_SPECS = {
    ("Blu", "Prosecco Millesimato"): {"Grape Variety": "Glera", "Appellation": "DOC Prosecco"},
    ("Blu", "Pink Sparkling Ros\u00e9"): {"Grape Variety": "Ribolla"},
    ("Bee Organic", "Brut"): {"Certification": "Organic"},
    ("Good Fucking Bubbles", "Spumante Extra Dry"): {"Grape Variety": "100% Glera"},
    ("Vita Bella", "Prosecco"): {"Grape Variety": "Glera"},
    ("Vita Bella", "Prosecco Ros\u00e9"): {"Grape Variety": "Glera, Pinot Noir"},
    ("Starla", "Prosecco"): {"Grape Variety": "Glera"},
    ("Villarria", "Pinot Grigio-Sauvignon Blanc"): {"Grape Variety": "Pinot Grigio, Sauvignon Blanc"},
    ("Villarria", "Pinot Grigio Delle Venezie DOC"): {"Grape Variety": "Pinot Grigio", "Appellation": "Delle Venezie DOC"},
    ("Villarria", "Moscato Puglia IGT"): {"Grape Variety": "Moscato", "Appellation": "Puglia IGT"},
    ("Villarria", "Cabernet-Merlot Veneto IGT"): {"Grape Variety": "Cabernet, Merlot", "Appellation": "Veneto IGT"},
    ("Matteotti", "Emilia IGT Bianco"): {"Appellation": "Emilia IGT"},
    ("Matteotti", "Emilia IGT Rosso"): {"Appellation": "Emilia IGT"},
    ("With Love", "Pinot Grigio IGT"): {"Grape Variety": "Pinot Grigio", "Appellation": "IGT"},
    ("With Love", "Chardonnay"): {"Grape Variety": "Chardonnay"},
    ("With Love", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("With Love", "Montepulciano D\u2019Abruzzo DOC"): {"Grape Variety": "Montepulciano", "Appellation": "Abruzzo DOC"},
    ("With Love", "Merlot"): {"Grape Variety": "Merlot"},
    ("Arento", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio", "Region": "Alto Adige"},
    ("La Bergera", "Chardonnay DOC"): {"Grape Variety": "Chardonnay", "Appellation": "DOC"},
    ("La Bergera", "Barbaresco"): {"Grape Variety": "Nebbiolo", "Appellation": "Barbaresco DOCG"},
    ("La Bergera", "Nebbiolo DOC"): {"Grape Variety": "Nebbiolo", "Appellation": "DOC"},
    ("La Bergera", "Barolo DOCG"): {"Grape Variety": "Nebbiolo", "Appellation": "Barolo DOCG"},
    ("La Bergera", "Barbera d\u2019Alba"): {"Grape Variety": "Barbera"},
    ("Volpi", "Timorasso"): {"Grape Variety": "Timorasso", "Region": "Colli Tortonesi"},
    ("Volpi", "Barolo"): {"Grape Variety": "Nebbiolo", "Appellation": "Barolo DOCG"},
    ("Volpi", "Barbera"): {"Grape Variety": "Barbera"},
    ("Oro di Gavi", "Oro di Gavi"): {"Grape Variety": "Cortese", "Appellation": "Gavi DOCG"},
    ("Good Fucking", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("Costa Bella", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("San Santo Biodynamic", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio", "Certification": "Biodynamic"},
    ("San Santo Biodynamic", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc", "Certification": "Biodynamic"},
    ("San Santo Biodynamic", "Chianti"): {"Grape Variety": "Sangiovese, Merlot, Cabernet Sauvignon", "Certification": "Biodynamic", "Appellation": "Chianti DOCG"},
    ("Amami Cinquesegni", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("365", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("Bee Organic", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc", "Certification": "Organic"},
    ("Bee Organic", "Chardonnay"): {"Grape Variety": "Chardonnay", "Certification": "Organic"},
    ("Bee Organic", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio, Inzolia", "Certification": "Organic"},
    ("Bee Organic", "Nero D\u2019Avola"): {"Grape Variety": "Nero d'Avola", "Certification": "Organic"},
    ("Bee Organic", "Merlot"): {"Grape Variety": "Merlot", "Certification": "Organic"},
    ("Bee Organic", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon", "Certification": "Organic"},
    ("Bee Organic", "Pinot Noir"): {"Grape Variety": "Pinot Noir", "Certification": "Organic"},
    ("Bee Organic", "Ros\u00e9"): {"Grape Variety": "Nero d'Avola", "Certification": "Organic"},
    ("TocCo diVino", "Chianti"): {"Grape Variety": "Sangiovese", "Appellation": "Chianti DOCG"},
    ("TocCo diVino", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("Villarria", "Vino Rosso Semisweet"): {"Style": "Semi-sweet"},
    ("Cinquesegni 4cento", "Valpolicella Ripasso DOC Superiore"): {"Appellation": "Valpolicella Ripasso DOC Superiore"},
    ("Cinquesegni 4cento", "Red Appassimento IGT Veneto"): {"Appellation": "IGT Veneto", "Style": "Appassimento"},
    ("Cinquesegni 4cento", "Amarone Valpolicella DOCG"): {"Appellation": "Amarone della Valpolicella DOCG"},
    ("Cinquesegni 4cento", "Corvina IGT Veneto"): {"Grape Variety": "Corvina", "Appellation": "IGT Veneto"},
    ("Le Vigne Di Sammarco", "De\u00ect\u00e0 Primitivo"): {"Grape Variety": "Primitivo"},
    ("Le Vigne Di Sammarco", "Negroamaro Salentino"): {"Grape Variety": "Negroamaro"},
    ("Le Vigne Di Sammarco", "Salice Salentino"): {"Grape Variety": "Negroamaro", "Appellation": "Salice Salentino DOP"},
    ("Le Vigne Di Sammarco", "Primitivo Di Manduria"): {"Grape Variety": "Primitivo", "Appellation": "Primitivo di Manduria DOP"},
    ("Le Vigne Di Sammarco", "Nero Di Troia"): {"Grape Variety": "Nero di Troia"},
    ("Santa Fina", "Riserva Chianti"): {"Grape Variety": "Sangiovese", "Appellation": "Chianti Riserva DOCG"},
    ("Santa Fina", "Chianti Riserva"): {"Grape Variety": "90% Sangiovese, 10% Canaiolo", "Appellation": "Chianti Riserva DOCG", "Aging": "Slavonian oak", "Certification": "Organic"},
    ("Arcasto", "Montepulciano d\u2019Abruzzo DOC"): {"Grape Variety": "Montepulciano", "Appellation": "Abruzzo DOC"},
    ("Sasso Dante", "Brunello di Montalcino"): {"Grape Variety": "Sangiovese Grosso", "Appellation": "Brunello di Montalcino DOCG", "Longevity": "30 years"},
    ("Lei \u00e8 Venere", "Rosso Toscano"): {"Style": "Super Tuscan", "Longevity": "20 years"},
    ("Porta Erbe", "Ripasso Valpolicella"): {"Aging": "18 months in Slavonian oak barrels", "Appellation": "Valpolicella Ripasso"},
    ("Una Vita", "Amarone Valpolicella"): {"Appellation": "Amarone della Valpolicella DOCG", "Aging": "Fine oak barrels"},
    ("Podere Poiano", "Ripasso"): {"Appellation": "Valpolicella Ripasso"},
    ("Podere Poiano", "Amarone"): {"Appellation": "Amarone della Valpolicella"},
    ("Porta Erbe", "Amarone"): {"Grape Variety": "Corvina, Corvinone, Rondinella, Molinara", "Appellation": "Amarone della Valpolicella DOCG", "Aging": "3 years in Slavonian oak and French barriques", "Vinification Detail": "3-4 month drying, slow fermentation, 40 days skin contact"},
    ("Cinquesegni", "Il Segno"): {"Style": "Southern Italian blend"},
    ("Amami Cinquesegni", "Montepulciano"): {"Grape Variety": "Montepulciano", "Region": "Abruzzo"},
    ("Amami Cinquesegni", "Primitivo"): {"Grape Variety": "Primitivo"},
    ("Cinquesegni", "Luna Passante Nero D\u2019Avola"): {"Grape Variety": "Nero d'Avola", "Region": "Sicily"},
    ("Costa Bella", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Costa Bella", "Montepulciano d\u2019Abruzzo"): {"Grape Variety": "Montepulciano"},
    ("Costa Bella", "Pinot Noir"): {"Grape Variety": "Pinot Noir"},
    ("With Love", "Ros\u00e9"): {"Style": "Ros\u00e9"},
    ("Good Fucking", "Ros\u00e9"): {"Grape Variety": "Corvina, Rondinella, Molinara", "Style": "Chiaretto"},
    ("Bomba", "Moscato"): {"Grape Variety": "Moscato"},
    ("Frizecco", "Moscato Strawberry"): {"Grape Variety": "Moscato", "Flavor": "Strawberry"},
    ("Frizecco", "Moscato Mango"): {"Grape Variety": "Moscato", "Flavor": "Mango"},
    ("Frizecco", "Moscato Peach"): {"Grape Variety": "Moscato", "Flavor": "Peach"},

    # France
    ("Naudin", "Ch\u00e2teauneuf du Pape"): {"Appellation": "Ch\u00e2teauneuf-du-Pape AOC"},
    ("La N\u00e9gly", "Clos Des Truffiers"): {"Appellation": "La Clape AOC"},
    ("La N\u00e9gly", "La Porte du Ciel"): {"Appellation": "La Clape AOC"},
    ("La N\u00e9gly", "L\u2019Ancely"): {"Appellation": "La Clape AOC"},
    ("La N\u00e9gly", "La C\u00f4te"): {"Appellation": "La Clape AOC"},
    ("La N\u00e9gly", "La Falaise"): {"Appellation": "La Clape AOC"},
    ("La N\u00e9gly", "Les Terrasses Rouge"): {"Grape Variety": "Syrah", "Appellation": "Languedoc AOC"},
    ("La N\u00e9gly", "Les Terrasses Blanc"): {"Appellation": "Languedoc AOC"},
    ("Nokat", "Bordeaux"): {"Appellation": "Bordeaux AOC"},
    ("Nokat", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},

    # Spain
    ("Lawn Chair", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("Venta Del Puerto", "No. 12"): {"Appellation": "Valencia DO"},
    ("Venta Del Puerto", "No. 18"): {"Grape Variety": "Cabernet Sauvignon, Tempranillo, Syrah, Merlot", "Appellation": "Valencia DO"},
    ("Amatista", "Pink Moscato"): {"Grape Variety": "Moscato"},
    ("Amatista", "Moscato"): {"Grape Variety": "Moscato"},
    ("La Bandida", "Red"): {"Style": "Ocean-aged"},
    ("La Bandida", "White"): {"Style": "Ocean-aged"},
    ("Cheap Bastard", "Red"): {},
    ("Tio Tio", "Sangria"): {"Grape Variety": "Tempranillo, Garnacha", "Style": "Sangria"},
    ("1405", "Vodka"): {"ABV": "40%", "Distillation": "7 times distilled in copper still", "Filtration": "Charcoal filtered", "Certification": "Gluten free, Sulfite free, Vegan"},

    # Portugal
    ("Adega de Favaios", "Monge Porto White"): {"Grape Variety": "Rabigato, Malvasia Fina, Viosinho, Moscatel Galego, Gouveio, C\u00f3dega", "Appellation": "Port DOC"},
    ("Adega de Favaios", "Monge Porto Fine Ruby"): {"Grape Variety": "Touriga Franca, Tinta Roriz, Tinta Barroca, Tinta Amarela", "Appellation": "Port DOC", "Style": "Ruby"},
    ("Adega de Favaios", "Monge Porto Fine Tawny"): {"Appellation": "Port DOC", "Style": "Tawny"},
    ("Adega de Favaios", "Monge Porto Tawny 10 Yr"): {"Appellation": "Port DOC", "Style": "10 Year Tawny", "Aging": "10 years in wood"},

    # Georgia
    ("Ranina", "Kakhuri (White)"): {"Grape Variety": "Rkatsiteli"},
    ("Ranina", "Rkatsiteli"): {"Grape Variety": "Rkatsiteli"},
    ("Ranina", "Kindzmarauli"): {"Grape Variety": "Saperavi", "Appellation": "Kindzmarauli", "Style": "Semi-sweet"},
    ("Ranina", "Mukuzani"): {"Grape Variety": "Saperavi", "Appellation": "Mukuzani AOC", "Aging": "Oak barrel aged"},
    ("Ranina", "Saperavi"): {"Grape Variety": "Saperavi"},
    ("Ranina", "Ros\u00e9"): {"Grape Variety": "Saperavi, Tavkveri", "Style": "Semi-sweet"},

    # Greece
    ("Emphasis", "Red (Syrah)"): {"Grape Variety": "Syrah"},
    ("Thema", "Red"): {"Grape Variety": "Syrah blend"},
    ("Emphasis", "Assyrtiko"): {"Grape Variety": "Assyrtiko"},
    ("Thema", "Assyrtiko"): {"Grape Variety": "Assyrtiko, Sauvignon Blanc"},

    # Scotland
    ("Glengarry", "NAS Single Malt"): {"Type": "Highland Single Malt", "Cask": "Oak casks"},
    ("Glengarry", "12-Year Single Malt"): {"Type": "Highland Single Malt", "Aging": "12 years", "Cask": "Three types of finest casks"},
    ("Glengarry", "4-Year Highland Blended Whisky"): {"Type": "Blended Scotch Whisky", "Aging": "4 years"},
    ("The Glen Silver\u2019s", "Special Reserve Blended Scotch"): {"Type": "Blended Scotch Whisky", "Region": "Highlands and Speyside", "Cask": "Oak barrels"},
    ("Loch Lomond", "Cristie Kerr 2002 US Open Edition"): {"Type": "Single Malt Scotch", "Edition": "Limited - Cristie Kerr 2002 US Open"},
    ("Eight Lands", "Organic Speyside Vodka"): {"Base": "Barley and wheat grain", "Certification": "Organic"},
    ("Eight Lands", "Organic Speyside Gin"): {"Botanicals": "Juniper, cowberry, sorrel, and eight other botanicals", "Certification": "Organic"},

    # Argentina
    ("Tierra Alta", "Chardonnay"): {"Grape Variety": "Chardonnay"},
    ("Tierra Alta", "Malbec"): {"Grape Variety": "Malbec", "Aging": "Oak aged"},
    ("Tierra Alta", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Un Mundo Chiquito", "Malbec"): {"Grape Variety": "Malbec"},
    ("Vistalba", "Corte B"): {"Grape Variety": "68% Malbec, 18% Cabernet Sauvignon, 14% Bonarda", "Aging": "15 months in French oak"},
    ("Vistalba", "Corte C"): {"Grape Variety": "80% Malbec, 20% Cabernet Sauvignon", "Aging": "20% aged in oak barrels for 12 months"},
    ("Vistalba", "Corte A"): {"Grape Variety": "70% Malbec, 20% Cabernet Sauvignon, 10% Bonarda", "Aging": "18 months in French oak"},
    ("Maximus", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Maximus", "Malbec"): {"Grape Variety": "Malbec", "Aging": "6 months in French oak barrels"},
    ("Bodegas Lopez", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc", "Estate": "Los Carolinos (1927)"},
    ("Bodegas Lopez", "Malbec"): {"Grape Variety": "Malbec", "Aging": "6 months in French oak casks"},
    ("Bodegas Lopez", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon", "Aging": "6 months in French oak casks"},
    ("Tomero", "Malbec"): {"Grape Variety": "100% Malbec", "Aging": "20% oak barrels 8 months, 80% stainless steel"},
    ("Tomero", "Cabernet Sauvignon"): {"Grape Variety": "100% Cabernet Sauvignon", "Aging": "20% French oak 6 months, 80% stainless steel"},
    ("Tomero", "Single Vineyard Malbec"): {"Grape Variety": "100% Malbec", "Aging": "12 months in 225L, 500L and 3500L oak barrels, 6 months bottle rest"},
    ("Tomero", "Single Vineyard Pinot Noir"): {"Grape Variety": "100% Pinot Noir", "Aging": "12 months in French oak and 3500L barrels"},

    # Brazil
    ("Velho Barreiro", "Cacha\u00e7a Tatuzinho"): {"Base": "Sugar cane juice"},
    ("Boazinha", "Cacha\u00e7a Boazinha"): {"Base": "Sugar cane juice", "Aging": "2.5 years in balm barrels"},
    ("Velho Barreiro", "Cacha\u00e7a Tatuzinho Lime"): {"Base": "Sugar cane juice", "Flavor": "Lime"},
    ("Seleta", "Cacha\u00e7a Seleta Silver"): {"Base": "Sugar cane"},
    ("Catuaba Generosa", "Catuaba"): {"Base": "Catuaba plant extract"},
    ("Cancao", "Suave White"): {"Grape Variety": "Niagara, Couderc 13, Villard Serve"},

    # Chile
    ("Casa Monte", "Chardonnay"): {"Grape Variety": "Chardonnay"},
    ("Casa Monte", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Casa Monte", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("Casa Monte", "Merlot"): {"Grape Variety": "Merlot"},

    # USA - Wines
    ("Kyle Cellars", "Pinot Noir"): {"Grape Variety": "Pinot Noir"},
    ("Kyle Cellars", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Kyle Cellars", "Chardonnay"): {"Grape Variety": "Chardonnay"},
    ("Paw Print", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("Paw Print", "White Zinfandel"): {"Grape Variety": "Zinfandel"},
    ("Paw Print", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Paw Print", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("Profanity Life Screw Off", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Undressed", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc", "Aging": "6 months, half stainless steel, half French oak"},
    ("Puribus", "Paso Robles Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon", "Region": "Paso Robles"},
    ("Golden Archer", "Napa Cabernet"): {"Grape Variety": "Cabernet Sauvignon", "Region": "Napa Valley"},
    ("Cooper & Oak", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon", "Region": "Red Hill"},
    ("One Life", "Pinot Noir"): {"Grape Variety": "Pinot Noir", "Aging": "French oak"},
    ("One Life", "Private Collection Napa Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon", "Region": "Napa Valley", "Production": "Once a year allocated", "Drinking Window": "2025-2036"},
    ("Good Fucking Wine", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("Good Fucking Wine", "Red Blend"): {"Style": "Red blend"},
    ("Good Fucking Wine", "Sweet Red"): {"Style": "Sweet red"},

    # USA - Spirits
    ("American Woman Spirit Co.", "92 Proof Straight Bourbon"): {"Proof": "92", "Mash Bill": "99% Corn, 1% Barley", "Cask": "4 distinct char 100 year-old forest oak barrels"},
    ("American Woman Spirit Co.", "102 Proof Straight Bourbon"): {"Proof": "102", "Mash Bill": "95% Rye, 5% Malted Barley", "Aging": "Over 3 years in 4 distinct char 100 year-old forest oak barrels"},
    ("American Woman Spirit Co.", "Cask Strength Straight Bourbon"): {"Proof": "126-132", "Mash Bill": "99% Corn, 1% Barley", "Style": "Cask Strength"},
    ("American Woman Spirit Co.", "Tequila Blanco"): {"Base": "100% Blue Weber Agave", "Finishing": "Whiskey barrel stave finishing process"},
    ("Good Fucking Bourbon", "Small Batch Bourbon"): {"Mash Bill": "70% Corn, 30% Wheat", "Aging": "4 years", "Distillation": "Copper pot still", "Filtration": "Non chill-filtered"},
    ("Good Fucking Tequila", "Small Batch Tequila"): {"Base": "100% Blue Weber Agave", "Style": "Oxygenated Blanco"},
    ("Good Fucking Vodka", "Small Batch Vodka"): {"Base": "American corn", "Water": "Shenandoah Valley Blue Ridge Limestone water"},
    ("Reserve 1787", "Bourbon"): {"Type": "Straight Bourbon Whiskey", "Body": "Medium to light"},
    ("Axis", "Gin"): {"Style": "Premium gin", "Base": "Exotic botanicals"},
    ("Revanche", "Cognac"): {"Blend": "80% VS (3yr), 15% VSOP (5yr), 5% XO (10yr)"},

    # New Zealand
    ("Coco Bay", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("Tiki Grove", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("Blue Bay", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},

    # South Korea
    ("7Drops", "Soju Yogurt"): {"ABV": "12%", "Base": "Korean pear and apple wine"},
    ("7Drops", "Soju Passion Fruit"): {"ABV": "12%"},
    ("Better Tomorrow", "Apple Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Blueberry Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Grapefruit Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Lychee Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Pomegranate Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Green Grape Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Pineapple Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Mango Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Strawberry Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Peach Soju"): {"ABV": "12.5%"},
    ("Better Tomorrow", "Watermelon Soju"): {"ABV": "12.5%"},

    # Japan
    ("Sakeberto", "Junmai Ginjo Sake"): {"Grade": "Junmai Ginjo", "Base": "Premium Japanese rice and spring water"},
    ("Sakeberto", "Junmai Sake"): {"Grade": "Junmai", "Base": "Japanese rice"},

    # India
    ("Smoke Lab", "Classic Vodka"): {"Distillation": "5 times distilled", "Certification": "Gluten Free, Kosher"},
    ("Smoke Lab", "Aniseed Flavored Vodka"): {"Flavor": "Aniseed (Saunf)", "Certification": "Gluten Free, Kosher"},
    ("Smoke Lab", "Saffron Vodka"): {"Infusion": "Kashmiri Saffron", "Certification": "Gluten Free, Kosher"},

    # China
    ("Rio Light", "Peach & Brandy Flavor"): {"Base": "Vodka, grape wine and grape brandy", "Flavor": "Peach"},
    ("Rio Light", "Passion Fruit & Vodka Flavor"): {"Base": "Vodka", "Flavor": "Passion Fruit"},
    ("Rio Light", "Ros\u00e9 Lychee & Brandy Flavor"): {"Base": "Brandy", "Flavor": "Ros\u00e9 Lychee"},
    ("Rio Light", "Yogurt & Vodka Flavor"): {"Base": "Vodka", "Flavor": "Yogurt"},

    # Mexico
    ("La Brune Ed Catrina", "Tequila Blanco"): {"Base": "Organic Blue Weber Agave"},

    # Caribbean
    ("Blue Coco Beach", "Spiced Rum"): {"Style": "Coconut spiced rum"},
    ("Black Sand Beach", "Black Spiced Rum"): {"Style": "Black spiced rum"},

    # Valued Wines
    ("Zuccotti", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("San Nicola", "Pinot Grigio"): {"Grape Variety": "Pinot Grigio"},
    ("San Nicola", "Sauvignon Blanc"): {"Grape Variety": "Sauvignon Blanc"},
    ("San Nicola", "Cabernet Sauvignon"): {"Grape Variety": "Cabernet Sauvignon"},
    ("San Nicola", "Moscato"): {"Grape Variety": "Moscato"},
    ("San Nicola", "Montepulciano"): {"Grape Variety": "Montepulciano"},
    ("San Nicola", "Merlot"): {"Grape Variety": "Merlot"},
    ("San Nicola", "Pinot Noir"): {"Grape Variety": "Pinot Noir"},
    ("San Marco", "Chianti"): {"Grape Variety": "Sangiovese, Merlot, Cabernet Sauvignon", "Appellation": "Chianti DOCG"},
    ("San Marco", "Montepulciano"): {"Grape Variety": "Montepulciano"},
}


# ────────────────────────────────────────────────────────────────
# 5. FOOD PAIRINGS - by type
# ────────────────────────────────────────────────────────────────

FOOD_PAIRINGS_BY_TYPE = {
    "red": "Pairs well with grilled meats, aged cheeses, and hearty pasta dishes.",
    "white": "Pairs well with seafood, light salads, and poultry.",
    "ros\u00e9": "Pairs well with light appetizers, grilled fish, and fresh salads.",
    "sparkling": "Perfect as an aperitif or with light appetizers and seafood.",
    "dessert": "Pairs well with fruit desserts, soft cheeses, and light pastries.",
    "fortified": "Enjoy with cheese, nuts, dried fruit, or after dinner.",
    "bourbon": "Best enjoyed neat, on the rocks, or in classic cocktails.",
    "whisky": "Best enjoyed neat, on the rocks, or in classic cocktails.",
    "cognac": "Best enjoyed neat, on the rocks, or in classic cocktails.",
    "tequila": "Perfect for sipping neat, on the rocks, or in margaritas.",
    "vodka": "Best served chilled neat or in cocktails.",
    "gin": "Perfect for martinis, gin & tonic, or craft cocktails.",
    "rum": "Enjoy in tropical cocktails, on the rocks, or with cola.",
    "cacha\u00e7a": "Essential for caipirinhas and tropical cocktails.",
    "soju": "Best served chilled as a social drink alongside Korean cuisine.",
    "sake": "Pairs well with sushi, sashimi, and Japanese cuisine.",
    "rtd": "Ready to enjoy chilled straight from the bottle.",
    "sangria": "Serve chilled as a refreshing social drink.",
    "liqueur": "Enjoy as a digestif or in cocktails.",
}

# Specific food pairing overrides from descriptions
SPECIFIC_FOOD_PAIRINGS = {
    ("Costa Bella", "Pinot Grigio"): "Perfect as an aperitif with light hors d'oeuvres or seafood.",
    ("Costa Bella", "Cabernet Sauvignon"): "Pairs well with grilled meats and hearty stews.",
    ("Villarria", "Pinot Grigio Delle Venezie DOC"): "Perfect to accompany fish courses, risotto dishes, chicken, and salads.",
    ("La N\u00e9gly", "Les Terrasses Blanc"): "Enjoy with a seafood platter.",
    ("Profanity Life Screw Off", "Cabernet Sauvignon"): "Pairs with hearty dishes and robust cheeses.",
    ("La Brune Ed Catrina", "Tequila Blanco"): "Perfect for experimental cocktails or classic margaritas.",
    ("Blue Coco Beach", "Spiced Rum"): "Great in Pi\u00f1a Coladas and tropical cocktails.",
    ("Seleta", "Cacha\u00e7a Seleta Silver"): "Ideal for the caipirinha.",
    ("365", "Pinot Grigio"): "Excellent as an aperitif or with seafood.",
}


# ────────────────────────────────────────────────────────────────
# HELPER: Extract tasting notes from description
# ────────────────────────────────────────────────────────────────

# ────────────────────────────────────────────────────────────────
# HELPER: Extract vinification notes
# ────────────────────────────────────────────────────────────────

VINIFICATION_KEYWORDS = [
    "aged", "oak", "barrel", "barrique", "ferment", "stainless",
    "distill", "matur", "drying", "skin contact", "rested",
    "cask", "bottle", "macerat",
]

# Specific vinification overrides keyed by (brand, name)
SPECIFIC_VINIFICATION = {
    ("TocCo diVino", "Chianti"): "Aged in oak, producing nuances of vanilla and spice complexity.",
    ("Porta Erbe", "Ripasso Valpolicella"): "Aged 18 months in Slavonian oak barrels.",
    ("Porta Erbe", "Amarone"): "Corvina, Corvinone, Rondinella and Molinara undergo a 3-4 month drying process. Slow fermentation with 40 days skin contact, followed by 3-year aging in Slavonian oak and French barriques.",
    ("Una Vita", "Amarone Valpolicella"): "Aged in fine oak barrels.",
    ("Santa Fina", "Chianti Riserva"): "90% Sangiovese and 10% Canaiolo, aged in Slavonian oak.",
    ("Vistalba", "Corte B"): "68% Malbec, 18% Cabernet Sauvignon, 14% Bonarda. Aged 15 months in French oak.",
    ("Vistalba", "Corte C"): "80% Malbec, 20% Cabernet Sauvignon. 20% of the blend aged in oak barrels for 12 months.",
    ("Vistalba", "Corte A"): "70% Malbec, 20% Cabernet Sauvignon, 10% Bonarda. Aged 18 months in French oak.",
    ("Maximus", "Malbec"): "Hand picked from vines over 15 years old. Aged 6 months in French oak barrels.",
    ("Bodegas Lopez", "Malbec"): "Aged 6 months in French oak casks.",
    ("Bodegas Lopez", "Cabernet Sauvignon"): "Aged 6 months in French oak casks.",
    ("Tomero", "Malbec"): "100% Malbec. 20% aged in oak barrels for 8 months, remaining 80% in stainless steel.",
    ("Tomero", "Cabernet Sauvignon"): "100% Cabernet Sauvignon. 20% aged in French oak barrels for 6 months, remaining 80% in stainless steel.",
    ("Tomero", "Single Vineyard Malbec"): "100% Malbec from single reserve vineyard. Aged in 225L oak barrels, 500L casks and 3500L barrels for 12 months. Rested 6 months in bottle.",
    ("Tomero", "Single Vineyard Pinot Noir"): "100% Pinot Noir from single reserve vineyard. Aged in French oak barrels and 3500L barrels for 12 months.",
    ("Boazinha", "Cacha\u00e7a Boazinha"): "Stored 2.5 years in balm barrels.",
    ("Undressed", "Sauvignon Blanc"): "Aged 6 months, half in stainless steel and half in French oak.",
    ("One Life", "Pinot Noir"): "Aged in French oak with volcanic soil terroir.",
    ("Ranina", "Mukuzani"): "Acquires unforgettable taste and scent after oak barrel aging.",
    ("Tierra Alta", "Malbec"): "Silky tannins from oak aging in high-altitude vineyards.",
    ("Good Fucking Bourbon", "Small Batch Bourbon"): "Distilled in authentic copper pot still. Aged 4 years. Non chill-filtered.",
    ("American Woman Spirit Co.", "92 Proof Straight Bourbon"): "Aged in 4 distinct char 100 year-old forest oak barrels.",
    ("American Woman Spirit Co.", "102 Proof Straight Bourbon"): "Aged over 3 years in 4 distinct char 100 year-old forest oak barrels.",
    ("American Woman Spirit Co.", "Cask Strength Straight Bourbon"): "Bottled at barrel strength (126-132 Proof) from 100 year-old forest oak barrels.",
    ("American Woman Spirit Co.", "Tequila Blanco"): "100% Blue Weber Agave with whiskey barrel stave finishing process.",
    ("Revanche", "Cognac"): "Blend of 80% VS (3yr), 15% VSOP (5yr), and 5% XO (10yr).",
    ("The Glen Silver\u2019s", "Special Reserve Blended Scotch"): "Blended from Highlands and Speyside malt and grain whiskies aged in oak barrels.",
    ("Glengarry", "NAS Single Malt"): "Matured in the finest oak casks.",
    ("Glengarry", "12-Year Single Malt"): "Matured 12 years in three types of finest casks.",
    ("1405", "Vodka"): "Distilled in a copper still, filtered over charcoal. 7 times distilled.",
    ("Smoke Lab", "Classic Vodka"): "5 times distilled ultra pure spirit.",
    ("Adega de Favaios", "Monge Porto Tawny 10 Yr"): "Careful wood ageing for 10 years.",
    ("Cinquesegni", "Luna Passante Nero D\u2019Avola"): "Harvested at night near Lake Arancio, Sicily.",
}


def _extract_vinification_from_raw(description_raw, product_type):
    """Extract vinification sentences from the raw TS description string.

    Returns the raw TS-escaped text suitable for writing back into a TS string,
    or empty string if no vinification info found.
    """
    # Only attempt for wines and certain spirits
    if product_type in ("rtd", "soju"):
        return ""

    desc_lower = description_raw.lower()
    has_vinification = any(kw in desc_lower for kw in VINIFICATION_KEYWORDS)
    if not has_vinification:
        return ""

    # Extract sentences containing vinification keywords
    sentences = re.split(r'(?<=[.!])\s+', description_raw)
    vin_sentences = []
    for s in sentences:
        s_lower = s.lower()
        if any(kw in s_lower for kw in VINIFICATION_KEYWORDS):
            vin_sentences.append(s.strip())
    if vin_sentences:
        result = " ".join(vin_sentences)
        if not result.endswith("."):
            result += "."
        return result
    return ""


# ────────────────────────────────────────────────────────────────
# MAIN PARSING AND ENRICHMENT
# ────────────────────────────────────────────────────────────────

def decode_ts_escapes(s):
    """Decode TypeScript/JavaScript string escape sequences to Python Unicode.

    Converts sequences like \\u2019 to the actual Unicode character.
    This is needed when matching captured TS strings against Python dict keys.
    """
    def replace_unicode(match):
        return chr(int(match.group(1), 16))

    # Replace \\uXXXX sequences
    s = re.sub(r'\\u([0-9a-fA-F]{4})', replace_unicode, s)
    # Replace other common escapes
    s = s.replace('\\n', '\n')
    s = s.replace('\\t', '\t')
    s = s.replace('\\"', '"')
    s = s.replace('\\\\', '\\')
    return s


def escape_ts_string(s):
    """Escape a NEW Python-sourced string for use inside TypeScript double-quoted strings.

    This handles characters like double quotes and backslashes that need escaping.
    Unicode characters are preserved as-is (the TS file uses UTF-8 encoding).
    """
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    return s




def build_enrichment_fields(brand, name, product_type, description, description_raw,
                            existing_fields, field_indent):
    """Build the new fields to insert into the product object.

    Args:
        brand: Product brand (Python string, unescaped).
        name: Product name (Python string, unescaped).
        product_type: The wine/spirit type string.
        description: Decoded description for Python dict lookups.
        description_raw: Raw TS string content (preserves escape sequences like \\u2019).
        existing_fields: Set of field names already present in the product object.
        field_indent: The whitespace prefix for each field line (e.g. 8 spaces for
                      country products, 4 spaces for valuedWines products).
    """
    fields = []

    # 1. Image
    if "image" not in existing_fields:
        key = (brand, name)
        if key in IMAGE_MAP:
            img_path = f"/portfolio/{IMAGE_MAP[key]}"
            fields.append(f'{field_indent}image: "{escape_ts_string(img_path)}",')

    # 2. Origin
    if "origin" not in existing_fields:
        origin = BRAND_ORIGIN.get(brand, "")
        if origin:
            fields.append(f'{field_indent}origin: "{escape_ts_string(origin)}",')

    # 3. Bottle Sizes
    if "bottleSizes" not in existing_fields:
        sizes = get_bottle_sizes(brand, name)
        sizes_str = ", ".join(f'"{s}"' for s in sizes)
        fields.append(f'{field_indent}bottleSizes: [{sizes_str}],')

    # 4. Specifications
    if "specifications" not in existing_fields:
        key = (brand, name)
        specs = SPECIFIC_SPECS.get(key, {})
        if specs:
            spec_entries = []
            for k, v in specs.items():
                spec_entries.append(f'"{escape_ts_string(k)}": "{escape_ts_string(v)}"')
            specs_str = ", ".join(spec_entries)
            fields.append(f'{field_indent}specifications: {{ {specs_str} }},')

    # 5. Tasting Notes - use raw TS string content to preserve escape sequences
    if "tastingNotes" not in existing_fields:
        notes_raw = description_raw.strip()
        if notes_raw:
            # Ensure it ends with a period
            if not notes_raw.endswith("."):
                notes_raw += "."
            fields.append(f'{field_indent}tastingNotes: "{notes_raw}",')

    # 6. Vinification
    if "vinification" not in existing_fields:
        key = (brand, name)
        if key in SPECIFIC_VINIFICATION:
            # Python-sourced string - needs escaping
            vin = SPECIFIC_VINIFICATION[key]
            fields.append(f'{field_indent}vinification: "{escape_ts_string(vin)}",')
        else:
            # Try extracting from description_raw (already in TS format)
            vin_raw = _extract_vinification_from_raw(description_raw, product_type)
            if vin_raw:
                fields.append(f'{field_indent}vinification: "{vin_raw}",')

    # 7. Food Pairings
    if "foodPairings" not in existing_fields:
        key = (brand, name)
        if key in SPECIFIC_FOOD_PAIRINGS:
            pairing = SPECIFIC_FOOD_PAIRINGS[key]
        else:
            pairing = FOOD_PAIRINGS_BY_TYPE.get(product_type, "")
        if pairing:
            fields.append(f'{field_indent}foodPairings: "{escape_ts_string(pairing)}",')

    return fields



def process_file(filepath):
    """Read, enrich, and write back the portfolio-data.ts file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    output_lines = []
    enriched_count = 0
    skipped_count = 0

    # We need to find product object blocks: { name: ..., brand: ..., ... }
    # Strategy: track when we're inside a product object block.
    #
    # Product blocks in the `countries` array start at 6-space indent:
    #       {
    #         name: "...",
    #         brand: "...",
    # Product blocks in the `valuedWines` array start at 2-space indent:
    #   {
    #     name: "...",
    #     brand: "...",
    #
    # Country blocks also start at 2-space indent but have `id:` instead of `name:`.
    # We distinguish product blocks by looking for `brand:` inside the block.

    i = 0
    while i < len(lines):
        line = lines[i]

        # Detect start of an object block at product-level indentation
        stripped = line.strip()

        if stripped == "{":
            indent_match = re.match(r'^(\s*)\{', line)
            if indent_match:
                block_indent = indent_match.group(1)
                indent_len = len(block_indent)

                # Only process blocks at indent 6 (countries products) or 2 (valuedWines / countries)
                if indent_len in (6, 2):
                    # Collect block lines until matching closing brace
                    block_lines = [line]
                    brace_depth = 1
                    j = i + 1
                    while j < len(lines) and brace_depth > 0:
                        block_lines.append(lines[j])
                        bline = lines[j]
                        # Simple brace counting - works for this well-structured data
                        for ch in bline:
                            if ch == '{':
                                brace_depth += 1
                            elif ch == '}':
                                brace_depth -= 1
                        j += 1

                    block_text = "\n".join(block_lines)

                    # Check if this is a product block (has brand:) vs a country block (has id:)
                    has_brand = re.search(r'\bbrand\s*:', block_text)
                    has_id = re.search(r'\bid\s*:', block_text)

                    if has_brand and not has_id:
                        # This is a product block - extract fields
                        name_match = re.search(r'name:\s*"((?:[^"\\]|\\.)*)"', block_text)
                        brand_match = re.search(r'brand:\s*"((?:[^"\\]|\\.)*)"', block_text)
                        type_match = re.search(r'type:\s*"((?:[^"\\]|\\.)*)"', block_text)

                        # Extract description (may span multiple lines with the value
                        # on the next line after `description:`)
                        desc_match = re.search(
                            r'description:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block_text
                        )

                        if name_match and brand_match and type_match:
                            # Decode TS escape sequences for Python dict lookups
                            name = decode_ts_escapes(name_match.group(1))
                            brand = decode_ts_escapes(brand_match.group(1))
                            product_type = decode_ts_escapes(type_match.group(1))
                            # Keep the raw TS string content for writing back
                            # (preserves escape sequences like \u2019)
                            description_raw = desc_match.group(1) if desc_match else ""
                            # Decoded version for Python dict lookups
                            description = decode_ts_escapes(description_raw)

                            # The field indent is the block indent + 2 more spaces
                            field_indent = block_indent + "  "

                            # Strip any existing enrichment fields from the block
                            # so we can re-add them with correct values (idempotent).
                            ENRICHMENT_FIELDS = {
                                "image", "origin", "bottleSizes", "specifications",
                                "vinification", "tastingNotes", "foodPairings",
                            }
                            cleaned_lines = []
                            for bl in block_lines:
                                bl_stripped = bl.strip()
                                # Check if this line starts an enrichment field
                                is_enrichment = False
                                for ef in ENRICHMENT_FIELDS:
                                    if bl_stripped.startswith(ef + ":") or bl_stripped.startswith(ef + " :"):
                                        is_enrichment = True
                                        break
                                if not is_enrichment:
                                    cleaned_lines.append(bl)
                            block_lines = cleaned_lines

                            # Build enrichment fields (no existing fields since we stripped them)
                            existing_fields = set()
                            new_fields = build_enrichment_fields(
                                brand, name, product_type, description,
                                description_raw, existing_fields, field_indent,
                            )

                            if new_fields:
                                # Insert new fields before the closing brace
                                closing_line = block_lines[-1]
                                enriched_block = block_lines[:-1]
                                enriched_block.extend(new_fields)
                                enriched_block.append(closing_line)
                                output_lines.extend(enriched_block)
                                enriched_count += 1
                            else:
                                output_lines.extend(block_lines)
                                skipped_count += 1

                            i = j
                            continue
                    # Not a product block (country block or other) - fall through
                    # and output lines normally

        output_lines.append(line)
        i += 1

    result = "\n".join(output_lines)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"Enrichment complete. Processed file: {filepath}")
    print(f"Products enriched: {enriched_count}")
    print(f"Products skipped (no new fields): {skipped_count}")
    print(f"Image mappings available: {len(IMAGE_MAP)}")


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(script_dir, "app", "data", "portfolio-data.ts")

    if not os.path.exists(filepath):
        print(f"ERROR: File not found: {filepath}")
        sys.exit(1)

    print(f"Reading: {filepath}")
    process_file(filepath)
    print("Done!")


if __name__ == "__main__":
    main()
