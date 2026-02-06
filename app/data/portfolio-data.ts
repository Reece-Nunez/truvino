export type ProductCategory = "wine" | "spirit";

export type WineType =
  | "red"
  | "white"
  | "rosé"
  | "sparkling"
  | "dessert"
  | "fortified";

export type SpiritType =
  | "bourbon"
  | "whisky"
  | "cognac"
  | "tequila"
  | "vodka"
  | "gin"
  | "rum"
  | "cachaça"
  | "soju"
  | "sake"
  | "rtd"
  | "sangria"
  | "liqueur";

export interface Product {
  name: string;
  brand: string;
  category: ProductCategory;
  type: WineType | SpiritType;
  description: string;
  tags?: string[];
  points?: string;
}

export interface CountryData {
  id: string;
  name: string;
  flag: string;
  icon?: string;
  region: string;
  mapPosition: { x: number; y: number };
  description: string;
  products: Product[];
}

export const countries: CountryData[] = [
  // ─── ITALY ──────────────────────────────────────────────
  {
    id: "italy",
    name: "Italy",
    flag: "\u{1F1EE}\u{1F1F9}",
    icon: "/icons/italy.svg",
    region: "europe",
    mapPosition: { x: 12.5, y: 42.5 },
    description:
      "From Prosecco to Barolo, Italy delivers an extraordinary range of wines rooted in centuries of tradition.",
    products: [
      // SPARKLING
      {
        name: "Prosecco Millesimato",
        brand: "Blu",
        category: "wine",
        type: "sparkling",
        description:
          "From the heart of the DOC Prosecco region, sweet peaches and perfumed honeysuckle on a delicious citrus and ripe apple finish.",
      },
      {
        name: "Pink Sparkling Ros\u00e9",
        brand: "Blu",
        category: "wine",
        type: "sparkling",
        description:
          "Ribolla based sparkling ros\u00e9 with brilliant pink color, fresh red berries and hints of honeysuckle and pear on a clean, crisp finish.",
        tags: ["limited"],
      },
      {
        name: "Brut",
        brand: "Bee Organic",
        category: "wine",
        type: "sparkling",
        description:
          "Floral aromas with flavors of green apples and white peach. Pale straw yellow, delicately aromatic with hints of white florals and candied lemon with a creamy finish.",
        tags: ["organic"],
      },
      {
        name: "Spumante Extra Dry",
        brand: "Good Fucking Bubbles",
        category: "wine",
        type: "sparkling",
        description:
          "100% Glera. Pale golden straw with tiny persistent bubbles. Fresh citrus aromas with hints of honey and white flowers. Ripe citrus, lemon, green apple with touches of grapefruit and mineralogy.",
      },
      {
        name: "Prosecco",
        brand: "Vita Bella",
        category: "wine",
        type: "sparkling",
        description:
          "Yellow hue with delicate green highlights. Aromatic bouquet with delicate notes of crisp apple and fragrant flowers. Captivating palate, zesty, refined taste that lingers elegantly.",
      },
      {
        name: "Prosecco Ros\u00e9",
        brand: "Vita Bella",
        category: "wine",
        type: "sparkling",
        description:
          "Refreshing, approachably effervescent. Fresh berry notes complemented by bright effervescence. A perfect brunch accompaniment.",
      },
      {
        name: "Prosecco",
        brand: "Starla",
        category: "wine",
        type: "sparkling",
        description:
          "A refreshing sparkling wine from the Veneto region. Delicate aromas of white flowers and citrus, with a crisp palate of green apple and lemon.",
      },
      {
        name: "Ros\u00e9 All\u00e9e Sparkling",
        brand: "Birkedal Hartmann",
        category: "wine",
        type: "sparkling",
        description:
          "Blissfully delicious, the taste of the sparkling fruit gives way to an indescribable feeling of surrender. A tradition passed down from generation to generation.",
      },
      // WHITE
      {
        name: "Pinot Grigio",
        brand: "TocCo diVino",
        category: "wine",
        type: "white",
        description:
          "Crisp, refreshing profile. Straw yellow color. Bouquet of apples and citrus. Light body with flavors of apple and pear, complemented by subtle notes of lime.",
      },
      {
        name: "Pinot Grigio Delle Venezie",
        brand: "Progetto Costa Dino",
        category: "wine",
        type: "white",
        description:
          "Brilliant straw yellow with copper tinges. Elegant with delicate hints of apricot and peach. Dry, fresh, harmonic, acidity perfectly balanced.",
      },
      {
        name: "Pinot Grigio-Sauvignon Blanc",
        brand: "Villarria",
        category: "wine",
        type: "white",
        description:
          "Two noble varieties that blend perfectly. Intense fruity notes of peach, lime and grapefruit. Round, fruity and mineral on the palate.",
      },
      {
        name: "Pinot Grigio Delle Venezie DOC",
        brand: "Villarria",
        category: "wine",
        type: "white",
        description:
          "Light straw yellow. Dry and crisp. Perfect to accompany fish courses, risotto dishes, chicken and salads.",
      },
      {
        name: "Moscato Puglia IGT",
        brand: "Villarria",
        category: "wine",
        type: "white",
        description:
          "Light golden yellow. Fresh and aromatic with intense notes of peaches and orange blossom. Fruity with soft sweetness on the palate.",
      },
      {
        name: "Emilia IGT Bianco",
        brand: "Matteotti",
        category: "wine",
        type: "white",
        description:
          "Light straw yellow. Intense flavors of white flowers and tropical notes. Balanced and harmonious with delicate acidity.",
      },
      {
        name: "Pinot Grigio IGT",
        brand: "With Love",
        category: "wine",
        type: "white",
        description:
          "Crystal clear straw yellow. Fruity and floral scents of apricot, peach, citrus, acacia, jasmine. Elegant, pleasant, and fruity with soft tannins.",
      },
      {
        name: "Chardonnay",
        brand: "With Love",
        category: "wine",
        type: "white",
        description:
          "Crystalline straw yellow with golden reflections. Delicate aromas of white flowers and yellow pulp fruit.",
      },
      {
        name: "Pinot Grigio",
        brand: "Arento",
        category: "wine",
        type: "white",
        description:
          "Beautifully balanced Pinot Grigio from Alto Adige with bright citrus fruit flavors, underlying mineral notes and a lengthy finish.",
      },
      {
        name: "Chardonnay DOC",
        brand: "La Bergera",
        category: "wine",
        type: "white",
        description:
          "Intense straw yellow with golden shades. Spring blossoms, white stone fruit with mineral notes. Enveloping, balanced with fresh acidity and sapidity.",
      },
      {
        name: "Timorasso",
        brand: "Volpi",
        category: "wine",
        type: "white",
        description:
          "Made from the ancient and rare Timorasso grape from Colli Tortonesi. Enticing notes of ripe stone fruits, citrus, white flowers and a touch of honey.",
      },
      {
        name: "Oro di Gavi",
        brand: "Oro di Gavi",
        category: "wine",
        type: "white",
        description:
          "One of Italy\u2019s top-ranking whites. Reminiscent of white flowers, lemons, green apples, honeydew and a unique almond finish.",
      },
      {
        name: "Pinot Grigio",
        brand: "Good Fucking",
        category: "wine",
        type: "white",
        description:
          "From the high altitude vineyards of the Veneto region. A delicious expression of a classic Italian varietal. Fresh, light, refreshing, and infinitely enjoyable.",
      },
      {
        name: "Pinot Grigio",
        brand: "Costa Bella",
        category: "wine",
        type: "white",
        description:
          "Crisp yet delicate, this dry, light-bodied wine has refreshing citrus flavors. Perfect as an aperitif with light hors d\u2019oeuvres or seafood.",
      },
      {
        name: "Pinot Grigio",
        brand: "San Santo Biodynamic",
        category: "wine",
        type: "white",
        description:
          "A classic medium bodied pinot grigio from the heart of the Veneto region with honeyed lemony ripe apple and tropical fruit aromas.",
        tags: ["biodynamic"],
      },
      {
        name: "Sauvignon Blanc",
        brand: "San Santo Biodynamic",
        category: "wine",
        type: "white",
        description:
          "Dried apple, lemon, lime and lemon curd on the nose with hints of cedar. Medium-to full-bodied with a solid core of fruit and a fresh, vivid finish.",
        tags: ["biodynamic"],
      },
      {
        name: "Les Terrasses Blanc",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "white",
        description:
          "Clear and crystalline. Striking fruitiness with notes of litchi and exotic fruits. Lively and fresh, perfect with a seafood platter.",
      },
      {
        name: "Pinot Grigio",
        brand: "Amami Cinquesegni",
        category: "wine",
        type: "white",
        description:
          "Sicilian Pinot Grigio with ceramic embossed heart. Fresh hay, banana, yellow apple, pear, pine nuts and green melon. Fresh, light wine with a crisp finish.",
      },
      {
        name: "Pinot Grigio",
        brand: "365",
        category: "wine",
        type: "white",
        description:
          "Crisp yet delicate, this dry, light-bodied wine has refreshing citrus flavors. Excellent value as an aperitif or with seafood.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Bee Organic",
        category: "wine",
        type: "white",
        description:
          "Medium body style. Fresh and fruity notes with touches of tropical fruit, white peaches and grapefruit.",
        tags: ["organic"],
      },
      {
        name: "Chardonnay",
        brand: "Bee Organic",
        category: "wine",
        type: "white",
        description:
          "Medium bodied with flavors of apple and lemon. Crisp with notes of vanilla, butterscotch, and lush tropical fruit with a creamy finish.",
        tags: ["organic"],
      },
      {
        name: "Pinot Grigio",
        brand: "Bee Organic",
        category: "wine",
        type: "white",
        description:
          "Bright straw yellow with intense aromas of green apples. Inzolia indigenous grapes add balance, good acidity, and a fresh finish.",
        tags: ["organic"],
      },
      // RED
      {
        name: "Chianti",
        brand: "TocCo diVino",
        category: "wine",
        type: "red",
        description:
          "Ruby matures to garnet. Vibrant cherries, strawberries and plum. Dark red fruits enriched by oak aging with nuances of vanilla and spice complexity.",
      },
      {
        name: "Barolo",
        brand: "Volpi",
        category: "wine",
        type: "red",
        description:
          "Medium garnet. Cherries, violets, cinnamon, nutmeg, leather. Red flowers and forest floor. Smooth tannins with red currants and good minerality.",
      },
      {
        name: "Vino Rosso Semisweet",
        brand: "Villarria",
        category: "wine",
        type: "red",
        description:
          "Deep ruby red. Intense ripe cherries, blackberries, violets and spices. Light bodied, round and soft on the palate.",
      },
      {
        name: "Cabernet-Merlot Veneto IGT",
        brand: "Villarria",
        category: "wine",
        type: "red",
        description:
          "Bright ruby red. Intense ripe fruits, lightly herbaceous and intensively vinous. Dry and harmonious with a fruity finish.",
      },
      {
        name: "Emilia IGT Rosso",
        brand: "Matteotti",
        category: "wine",
        type: "red",
        description:
          "Ruby color. Intense flavors of red berries and cherries. Balanced and harmonious, lightly tannic.",
      },
      {
        name: "Valpolicella Ripasso DOC Superiore",
        brand: "Cinquesegni 4cento",
        category: "wine",
        type: "red",
        description:
          "Rich and deep, elegant and powerful. Typical notes of cherry and blackcurrant marry well with the complexity of the wine.",
        points: "99 Points - Luca Maroni",
      },
      {
        name: "Red Appassimento IGT Veneto",
        brand: "Cinquesegni 4cento",
        category: "wine",
        type: "red",
        description:
          "Intense garnet red with refined personality. Intense hints of red fruits. Soft, elegant and full-bodied.",
        points: "91 Points - Luca Maroni",
      },
      {
        name: "Amarone Valpolicella DOCG",
        brand: "Cinquesegni 4cento",
        category: "wine",
        type: "red",
        description:
          "Ruby red with violet reflections. Intense, complex and fruity with notes of cherries and blackberries. Soft, warm and tannic with great persistence.",
      },
      {
        name: "Corvina IGT Veneto",
        brand: "Cinquesegni 4cento",
        category: "wine",
        type: "red",
        description:
          "Deep ruby red. Cherry and morello cherry aromas with red fruits and spices. Velvety, soft, full-bodied, very persistent.",
      },
      {
        name: "De\u00ect\u00e0 Primitivo",
        brand: "Le Vigne Di Sammarco",
        category: "wine",
        type: "red",
        description:
          "Bright and impenetrable. Mulberry, cranberry juice and light menthol notes. Fruity return meets smooth, enveloping tannins.",
      },
      {
        name: "Negroamaro Salentino",
        brand: "Le Vigne Di Sammarco",
        category: "wine",
        type: "red",
        description:
          "Ruby red with purple hues. Cherries and cloves with floral violet notes. Smooth tannins and right freshness define balance and vigorous personality.",
      },
      {
        name: "Salice Salentino",
        brand: "Le Vigne Di Sammarco",
        category: "wine",
        type: "red",
        description:
          "Ruby red with garnet nuances. Black cherries and marasche in spirit, humus, cocoa powder. Persistence and fine tannins.",
      },
      {
        name: "Primitivo Di Manduria",
        brand: "Le Vigne Di Sammarco",
        category: "wine",
        type: "red",
        description:
          "Deep dark ruby. Blackberries and jam with berries, violet, chocolate and pepper. Warm and soft, closing with power and persistence.",
      },
      {
        name: "Nero Di Troia",
        brand: "Le Vigne Di Sammarco",
        category: "wine",
        type: "red",
        description:
          "Ruby lit. Blackberries, currants and violets chase spicy black pepper. Full and full-bodied with measured, soft tannins.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "With Love",
        category: "wine",
        type: "red",
        description:
          "Ruby red with purple hues. Spicy nose with aromas of red fruits.",
      },
      {
        name: "Montepulciano D\u2019Abruzzo DOC",
        brand: "With Love",
        category: "wine",
        type: "red",
        description:
          "Intense ruby red. Notes of red jam, raspberry and blueberry. In the mouth it is full and enveloping.",
      },
      {
        name: "Merlot",
        brand: "With Love",
        category: "wine",
        type: "red",
        description:
          "Ruby red with purple hues. Spicy nose with aromas of red fruits.",
      },
      {
        name: "Riserva Chianti",
        brand: "Santa Fina",
        category: "wine",
        type: "red",
        description:
          "Bright ruby red with intense, characteristic fruity bouquet and violet fragrance. Dry and harmonious with dark chocolate and black cherry notes.",
      },
      {
        name: "Barbaresco",
        brand: "La Bergera",
        category: "wine",
        type: "red",
        description:
          "Velvety, balanced and elegant. Ruby red aging to garnet. Wild berries, raspberry, white pepper, licorice and aromatic herbs.",
      },
      {
        name: "Nebbiolo DOC",
        brand: "La Bergera",
        category: "wine",
        type: "red",
        description:
          "Ruby red tending to garnet with aging. Clean and intense bouquet of violet, wild rose, raspberry and strawberry.",
      },
      {
        name: "Barolo DOCG",
        brand: "La Bergera",
        category: "wine",
        type: "red",
        description:
          "Complex, combining freshness with elegance. Red plums, cherry, strawberry compote, star anise, nutmeg, mint. Fresh acidity with great balance.",
      },
      {
        name: "Barbera d\u2019Alba",
        brand: "La Bergera",
        category: "wine",
        type: "red",
        description:
          "Brilliant ruby hue with purple highlights. Ripe cherries, plums, and wild berries accented by subtle floral and spice notes. Bright acidity and soft tannins.",
      },
      {
        name: "Barbera",
        brand: "Volpi",
        category: "wine",
        type: "red",
        description:
          "An everyday wine of the people. Made from Barbera grapes, a dry red wine that is both affordable and an amazing representation of this historic region.",
      },
      {
        name: "Montepulciano d\u2019Abruzzo DOC",
        brand: "Arcasto",
        category: "wine",
        type: "red",
        description:
          "Loaded with blackberry and red cherry flavors with a hint of spice. Soft tannins and a velvety finish.",
      },
      {
        name: "Brunello di Montalcino",
        brand: "Sasso Dante",
        category: "wine",
        type: "red",
        description:
          "Intense ruby red. Fine, ample red fruits with notes of flowering grapes and lavender. Dry but soft, full-bodied, velvety tannins. Longevity: 30 years.",
      },
      {
        name: "Rosso Toscano",
        brand: "Lei \u00e8 Venere",
        category: "wine",
        type: "red",
        description:
          "Hand-drawn masterpiece label. Super Tuscan! Red fruit, wild rose, mint, black currant, licorice, resin and roasted coffee. Can age gracefully for 20 years.",
      },
      {
        name: "Ripasso Valpolicella",
        brand: "Porta Erbe",
        category: "wine",
        type: "red",
        description:
          "Complex and intense blackberries, fruit juice with notes of leather, cedar and spices. Aged 18 months in Slavonian oak barrels.",
      },
      {
        name: "Amarone Valpolicella",
        brand: "Una Vita",
        category: "wine",
        type: "red",
        description:
          "Velvety with bold flavors of blackberry, plum jam, espresso and vanilla. Limited-edition Amarone aged in fine oak barrels. Rich with dried cherries, black figs and dark chocolate.",
        tags: ["limited"],
      },
      {
        name: "Ripasso",
        brand: "Podere Poiano",
        category: "wine",
        type: "red",
        description:
          "Creamy style with rich mid-palate, fresh acidity and structured tannins. Aromas of black cherries, ripe blueberries, and spice.",
      },
      {
        name: "Amarone",
        brand: "Podere Poiano",
        category: "wine",
        type: "red",
        description:
          "Spicy oak, black truffle and sweet cassis. Concentration of very ripe, raisiny plums with a long, extremely well balanced finish. Dark chocolate and roasted plums.",
      },
      {
        name: "Amarone",
        brand: "Porta Erbe",
        category: "wine",
        type: "red",
        description:
          "Corvina, Corvinone, Rondinella and Molinara. 3-4 month drying process. Slow fermentation with 40 days skin contact. 3-year aging in Slavonian oak and French barriques.",
        tags: ["coming-soon"],
      },
      {
        name: "Il Segno",
        brand: "Cinquesegni",
        category: "wine",
        type: "red",
        description:
          "Blend of grapes from the south of Italy. Garnet red with blackberry, plum, raspberry. Vanilla, tobacco, and licorice finish. Full-bodied with velvety tannins.",
      },
      {
        name: "Montepulciano",
        brand: "Amami Cinquesegni",
        category: "wine",
        type: "red",
        description:
          "From the Abruzzo region. Deep ruby red with violet highlights. Fruity bouquet with spicy cacao notes. Full-bodied with soft tannins.",
      },
      {
        name: "Primitivo",
        brand: "Amami Cinquesegni",
        category: "wine",
        type: "red",
        description:
          "\u2018Love\u2019 written in different languages on the label. Spicy, plummy Primitivo with hints of tobacco spice and orange zest.",
      },
      {
        name: "Luna Passante Nero D\u2019Avola",
        brand: "Cinquesegni",
        category: "wine",
        type: "red",
        description:
          "Harvested at night near Lake Arancio, Sicily. Deep ruby with purple hues. Balsamic herbs, red fruits, and floral scents. Soft, round tannins with wild raspberry.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Costa Bella",
        category: "wine",
        type: "red",
        description:
          "Goji berries. Firm but forgiving tannins with juicy umami mid-palate. Earthy, fruity and spicy notes pair well with grilled meats and hearty stews.",
      },
      {
        name: "Montepulciano d\u2019Abruzzo",
        brand: "Costa Bella",
        category: "wine",
        type: "red",
        description:
          "Deep color, supple tannins, strong aromas of oregano, pepper, tobacco, blackberry and cherry with a hint of spice and velvet finish.",
      },
      {
        name: "Chianti",
        brand: "San Santo Biodynamic",
        category: "wine",
        type: "red",
        description:
          "Sangiovese with merlot and cabernet sauvignon. Deep fruity plum and intense cherry flavors with hints of spice, hazelnut, and delicate violet aromas.",
        tags: ["biodynamic"],
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Puribus",
        category: "wine",
        type: "red",
        description:
          "Bold and expressive with aromas of blackberry, black currant, and dark cherry, layered with vanilla, cedar, and dried herbs.",
      },
      {
        name: "Nero D\u2019Avola",
        brand: "Bee Organic",
        category: "wine",
        type: "red",
        description:
          "Medium body. Typical fruit with touches of Morello cherry. Warm and lingering on the palate.",
        tags: ["organic"],
      },
      {
        name: "Merlot",
        brand: "Bee Organic",
        category: "wine",
        type: "red",
        description:
          "Medium body, sweet ripe fruit, black cherry aromas and flavors with a sweet cherry preserve finish.",
        tags: ["organic"],
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Bee Organic",
        category: "wine",
        type: "red",
        description:
          "Full body. Full of spices. Fresh bouquet of dark fruits, plums and licorice with a well balanced finish.",
        tags: ["organic"],
      },
      {
        name: "Pinot Noir",
        brand: "Bee Organic",
        category: "wine",
        type: "red",
        description:
          "Light bodied and fruit forward with flavors of dark cherries. Earthy, herbal and spicy nose with hints of vanilla and chocolate.",
        tags: ["organic"],
      },
      {
        name: "Chianti Riserva",
        brand: "Santa Fina",
        category: "wine",
        type: "red",
        description:
          "90% Sangiovese and 10% Canaiolo, aged in Slavonian oak. Bright ruby-red with fruity aromas and violet hints. Dark chocolate and black cherry flavors.",
        tags: ["organic"],
      },
      // ROS\u00c9
      {
        name: "Ros\u00e9",
        brand: "With Love",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Soft pink with very intense and endless aromas of spring fruit.",
      },
      {
        name: "Ros\u00e9",
        brand: "Good Fucking",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Chiaretto from the shores of Lake Garda. Corvina, Rondinella and Molinara. Intense cherry pink. Fragrant, smooth with good acid and great persistence.",
      },
      {
        name: "Pinot Noir",
        brand: "Costa Bella",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Red and black fruits on the palate framing blackberry, cherry and pomegranate flavors, drawing to a long, bright finish.",
      },
      {
        name: "Ros\u00e9",
        brand: "Bee Organic",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Bright ros\u00e9 color from Nero d\u2019Avola with cherry and red highlights. Fragrant with wild berries. Well balanced, fresh and lively.",
        tags: ["organic"],
      },
      // MOSCATO / DESSERT
      {
        name: "Moscato",
        brand: "Bomba",
        category: "wine",
        type: "dessert",
        description:
          "A sweet, fruity Moscato with delightful floral and fruit notes.",
      },
      {
        name: "Moscato Strawberry",
        brand: "Frizecco",
        category: "wine",
        type: "dessert",
        description:
          "A sweet and fruity sparkling Moscato with floral notes and berry on the nose.",
      },
      {
        name: "Moscato Mango",
        brand: "Frizecco",
        category: "wine",
        type: "dessert",
        description:
          "Bright and refreshing Moscato infused with mango. Layers of citrus, mango, guava and banana flavors.",
      },
      {
        name: "Moscato Peach",
        brand: "Frizecco",
        category: "wine",
        type: "dessert",
        description:
          "Sparkling Moscato bursting with sweet peach, honey and hints of orange. Refreshing with a crisp finish.",
      },
    ],
  },

  // ─── FRANCE ─────────────────────────────────────────────
  {
    id: "france",
    name: "France",
    flag: "\u{1F1EB}\u{1F1F7}",
    icon: "/icons/france.svg",
    region: "europe",
    mapPosition: { x: 2.2, y: 46.2 },
    description:
      "From the prestige of Ch\u00e2teauneuf-du-Pape to the artisan wines of La N\u00e9gly, France\u2019s winemaking heritage is unmatched.",
    products: [
      {
        name: "Ch\u00e2teauneuf du Pape",
        brand: "Naudin",
        category: "wine",
        type: "red",
        description:
          "Full bodied, blending prestige and finesse. Pure, ripe and concentrated aromas of blackberry, blueberry, plum, and mocha with subtle hints of oak.",
      },
      {
        name: "Clos Des Truffiers",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Intense ruby red. Black raspberries, blackberry liqueur, minerals, violet, herbs and espresso with captivating woody undertones. Voluptuous and velvety.",
        points: "100 Points",
        tags: ["coming-soon"],
      },
      {
        name: "La Porte du Ciel",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Cherry and cocoa aromas with vanilla and Virginia tobacco. Rich, dense and smooth with delicious blackberry flavors. Powerful and creamy.",
      },
      {
        name: "L\u2019Ancely",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Intense ruby red. Kirsch, mocha cocoa, soft spices. Rich, with silky tannins. Ripe fruit and roasted coffee bean finish with great ageing potential.",
      },
      {
        name: "La C\u00f4te",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Intense ruby robe. Blackcurrant and black pepper with notes of liquorice and grilling. Silky, racy texture.",
      },
      {
        name: "La Falaise",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Intense ruby color. Raspberry, blackberry, chocolate and black olive. Licorice and roasting aromas. Exceptional concentration with perfectly ripe sweet tannins.",
      },
      {
        name: "Les Terrasses Rouge",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "red",
        description:
          "Intensely colored, marked by the fullness of Syrahs. Undeniable red fruit with a notably fresh accent. Full palate of supple, soft and silky tannins.",
      },
      {
        name: "Bordeaux",
        brand: "Nokat",
        category: "wine",
        type: "red",
        description:
          "Fruity Bordeaux with attention-grabbing artwork. Medium-bodied, rich with black and red fruit flavors, well balanced with soft tannins.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Nokat",
        category: "wine",
        type: "white",
        description:
          "Fruity and pleasant. Delicate bouquet of fruits and flowers aroma with a lively and harmonious finish.",
      },
      {
        name: "Les Terrasses Blanc",
        brand: "La N\u00e9gly",
        category: "wine",
        type: "white",
        description:
          "Clear and crystalline. Striking fruitiness with notes of litchi and exotic fruits. Lively and fresh. Enjoy with a seafood platter.",
      },
    ],
  },

  // ─── SPAIN ──────────────────────────────────────────────
  {
    id: "spain",
    name: "Spain",
    flag: "\u{1F1EA}\u{1F1F8}",
    icon: "/icons/spain.svg",
    region: "europe",
    mapPosition: { x: -3.7, y: 40.4 },
    description:
      "Bold reds, refreshing whites, and innovative flavored wines from one of the world\u2019s most diverse wine regions.",
    products: [
      {
        name: "Sauvignon Blanc",
        brand: "Lawn Chair",
        category: "wine",
        type: "white",
        description:
          "Clean and bright. Intense yellow with green hints. Elegant aromas with grassy, green notes, citrus, tropical fruits, passion fruit, pineapple and melon.",
      },
      {
        name: "No. 12",
        brand: "Venta Del Puerto",
        category: "wine",
        type: "red",
        description:
          "Dark cherry-red with purple hints. Blackberries and red currants, dark-roasted balsamic, chocolate and white coffee hints. Complex and well-balanced.",
      },
      {
        name: "No. 18",
        brand: "Venta Del Puerto",
        category: "wine",
        type: "red",
        description:
          "Perfect combination of Cabernet Sauvignon, Tempranillo, Syrah and Merlot. Complex bouquet of fruit, balsamic notes, smoke, fruit liqueur, roasted coffee and bitter chocolate.",
      },
      {
        name: "Pink Moscato",
        brand: "Amatista",
        category: "wine",
        type: "sparkling",
        description:
          "Cherry red with purple hints. Varietal aroma with forest fruit and floral notes. Full, creamy foam. Pleasant and refreshing.",
      },
      {
        name: "Moscato",
        brand: "Amatista",
        category: "wine",
        type: "sparkling",
        description:
          "Pale yellow with green hints and fine bubbles. Pleasant, well-balanced acidity with creamy foam. Sweet, light and very refreshing.",
      },
      {
        name: "Red",
        brand: "La Bandida",
        category: "wine",
        type: "red",
        description:
          "Deep cherry red. Highly complex with very ripe black fruit aromas. Ocean-aged and perfectly balanced. Vanilla and coconut with hints of eucalyptus.",
      },
      {
        name: "White",
        brand: "La Bandida",
        category: "wine",
        type: "white",
        description:
          "Pale straw yellow. Intense white fruit, tropical and citrus with notes of white flower and honey. Ocean-aged, lingering and complex.",
      },
      {
        name: "Red",
        brand: "Cheap Bastard",
        category: "wine",
        type: "red",
        description:
          "Spicy blackberry and blueberry aromas and flavors. Sweet, rich with long blackberry and overripe plum flavors.",
      },
      {
        name: "Sangria",
        brand: "Tio Tio",
        category: "wine",
        type: "red",
        description:
          "Light-bodied, fruity and refreshing Spanish Sangria from fine red wine and natural citrus fruit flavors. Tempranillo and Garnacha grape varieties.",
        tags: ["coming-soon"],
      },
      {
        name: "Grapes & Blueberry",
        brand: "Grande Seventh",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      {
        name: "Grapes & Peach",
        brand: "Grande Seventh",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      {
        name: "Grapes & Pineapple",
        brand: "Grande Seventh",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      {
        name: "Grapes & Raspberry",
        brand: "Grande Seventh",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      {
        name: "Grapes & Strawberry",
        brand: "Grande Seventh",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      {
        name: "Grapes & Wild Berries",
        brand: "Grande Signature",
        category: "wine",
        type: "dessert",
        description:
          "A powerful and complex wine made from natural flavors and wine spirit. Aged to enhance depth and complexity.",
      },
      // SPIRITS
      {
        name: "Vodka",
        brand: "1405",
        category: "spirit",
        type: "vodka",
        description:
          "Over 600 years of tradition. Distilled in a copper still and filtered over charcoal. Gluten free, sulfite free, vegan and 7 times distilled.",
      },
    ],
  },

  // ─── PORTUGAL ───────────────────────────────────────────
  {
    id: "portugal",
    name: "Portugal",
    flag: "\u{1F1F5}\u{1F1F9}",
    icon: "/icons/portugal.svg",
    region: "europe",
    mapPosition: { x: -8.2, y: 39.4 },
    description:
      "Historic Port wines from the Douro Valley, crafted with traditional grape varieties and aged to perfection.",
    products: [
      {
        name: "Monge Porto White",
        brand: "Adega de Favaios",
        category: "wine",
        type: "fortified",
        description:
          "Blend of Rabigato, Malvasia Fina, Viosinho, Moscatel Galego, Gouveio and C\u00f3dega. Attractive yellow, bright with floral aromas, tropical fruit and nuts.",
      },
      {
        name: "Monge Porto Fine Ruby",
        brand: "Adega de Favaios",
        category: "wine",
        type: "fortified",
        description:
          "Touriga Franca, Tinta Roriz, Tinta Barroca and Tinta Amarela. Ruby coloured with intense red and black fruit. Full-bodied and balanced with sweet and morello cherries.",
      },
      {
        name: "Monge Porto Fine Tawny",
        brand: "Adega de Favaios",
        category: "wine",
        type: "fortified",
        description:
          "Red with lighter highlights. Ripe fruit, figs, nuts with caramel and spice notes. Rich, velvety, full-bodied with elegant balance between structure and sweetness.",
      },
      {
        name: "Monge Porto Tawny 10 Yr",
        brand: "Adega de Favaios",
        category: "wine",
        type: "fortified",
        description:
          "Light amber from careful wood ageing. Delicious aromas of nuts, caramel, spices and ripe fruit. Rich, velvety, smooth and delectably sweet.",
      },
    ],
  },

  // ─── GEORGIA ────────────────────────────────────────────
  {
    id: "georgia",
    name: "Georgia",
    flag: "\u{1F1EC}\u{1F1EA}",
    icon: "/icons/georgia.svg",
    region: "europe",
    mapPosition: { x: 43.4, y: 42.3 },
    description:
      "One of the oldest wine regions in the world, Georgia offers distinctive wines from indigenous grape varieties.",
    products: [
      {
        name: "Kakhuri (White)",
        brand: "Ranina",
        category: "wine",
        type: "white",
        description:
          "Sweet nose of dried apricot with a drier taste and pleasant hints of dried fruits. Georgian Rkatsiteli white wine.",
      },
      {
        name: "Rkatsiteli",
        brand: "Ranina",
        category: "wine",
        type: "white",
        description:
          "Dry white wine from the Kakheti region. Herbal, floral and citrus notes. Sherry-like aromas with roasted nuts, apple and honey.",
      },
      {
        name: "Kindzmarauli",
        brand: "Ranina",
        category: "wine",
        type: "red",
        description:
          "Semi-sweet red from Saperavi grapes of Kakheti. Lively and energetic with ripe red fruit, blackberry, cherry, raspberry and strawberry.",
      },
      {
        name: "Mukuzani",
        brand: "Ranina",
        category: "wine",
        type: "red",
        description:
          "Dry red with dark raspberry color. The top AOC wine from Kakheti, Georgia. Acquires unforgettable taste and scent after oak barrel aging.",
      },
      {
        name: "Saperavi",
        brand: "Ranina",
        category: "wine",
        type: "red",
        description:
          "Dry red from Kakheti. Strong with impressive scents. Peppery blackberry, dark cherry and gentle balanced tannins.",
      },
      {
        name: "Ros\u00e9",
        brand: "Ranina",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Semi-sweet, vibrant ros\u00e9 from Saperavi and Tavkveri. Aromatic field strawberries, raspberry and red currants. Pleasant blend of sweetness and acidity.",
      },
    ],
  },

  // ─── GREECE ─────────────────────────────────────────────
  {
    id: "greece",
    name: "Greece",
    flag: "\u{1F1EC}\u{1F1F7}",
    icon: "/icons/greece.svg",
    region: "europe",
    mapPosition: { x: 23.7, y: 37.9 },
    description:
      "Ancient winemaking traditions with indigenous grape varieties producing distinctive Mediterranean wines.",
    products: [
      {
        name: "Red (Syrah)",
        brand: "Emphasis",
        category: "wine",
        type: "red",
        description:
          "Spicy nose, enjoyable in the mouth with good balance of tannins, acidity and alcohol. An excellent Syrah aging.",
      },
      {
        name: "Red",
        brand: "Thema",
        category: "wine",
        type: "red",
        description:
          "Dark purple with violet reflections. Intense cherries and plums with chocolate, smoke and vanilla. Balanced, lively tannins. Long fruity aftertaste with a touch of oak.",
      },
      {
        name: "Assyrtiko",
        brand: "Emphasis",
        category: "wine",
        type: "white",
        description:
          "Rich lemon and white-flower nose. Fresh citrus fruit, vanilla and cigar smoke, balanced by lifted acidity and a pleasing chalky finish.",
      },
      {
        name: "Assyrtiko",
        brand: "Thema",
        category: "wine",
        type: "white",
        description:
          "Assyrtiko adapted to Drama region with a broader aromatic profile. Inherent minerality and high acidity. Sauvignon Blanc boosts grassy-vegetal character and stone fruit aromas.",
      },
    ],
  },

  // ─── SCOTLAND ───────────────────────────────────────────
  {
    id: "scotland",
    name: "Scotland",
    flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    icon: "/icons/scotland.svg",
    region: "europe",
    mapPosition: { x: -4.2, y: 56.5 },
    description:
      "World-renowned single malt and blended Scotch whiskies, crafted in the Highland and Speyside traditions.",
    products: [
      {
        name: "NAS Single Malt",
        brand: "Glengarry",
        category: "spirit",
        type: "whisky",
        description:
          "A truly Highland single malt matured in the finest oak casks. Refined, smooth taste with hints of smoke and peat. Barley sweetness, pear and vanilla.",
      },
      {
        name: "12-Year Single Malt",
        brand: "Glengarry",
        category: "spirit",
        type: "whisky",
        description:
          "Highland Single Malt matured in three types of finest casks. Exceptionally well-balanced. Floral notes of peach blossom, pear, golden barley and vanilla.",
      },
      {
        name: "4-Year Highland Blended Whisky",
        brand: "Glengarry",
        category: "spirit",
        type: "whisky",
        description:
          "Blend of finest Scotch grain and malt whiskies. Fruity and sweet with mild peat finish. Toffee, soft fruits and citrus orange notes.",
      },
      {
        name: "Special Reserve Blended Scotch",
        brand: "The Glen Silver\u2019s",
        category: "spirit",
        type: "whisky",
        description:
          "Blended whisky from Highlands and Speyside malt and grain whiskies aged in oak barrels. Golden, delicate aroma, subtle and elegant on the palate.",
      },
      {
        name: "Cristie Kerr 2002 US Open Edition",
        brand: "Loch Lomond",
        category: "spirit",
        type: "whisky",
        description:
          "Delicately aromatic and tropical. Pina colada, pistachio pudding, coconut and apple blossom. Elegant with vanilla milkshake, sweeping oak and tropical fruit finish.",
        tags: ["limited"],
      },
      {
        name: "Organic Speyside Vodka",
        brand: "Eight Lands",
        category: "spirit",
        type: "vodka",
        description:
          "Award-winning with tasting notes of marzipan and vanilla. Long smooth finish with a hint of spice. Unusual barley and wheat grain process.",
        tags: ["organic"],
      },
      {
        name: "Organic Speyside Gin",
        brand: "Eight Lands",
        category: "spirit",
        type: "gin",
        description:
          "Award-winning gin. Juniper complemented by cowberry, sorrel and eight other botanicals. Bold and bright juniper balanced with citrus and tart red berry.",
        tags: ["organic"],
      },
    ],
  },

  // ─── ARGENTINA ──────────────────────────────────────────
  {
    id: "argentina",
    name: "Argentina",
    flag: "\u{1F1E6}\u{1F1F7}",
    icon: "/icons/argentina.svg",
    region: "south-america",
    mapPosition: { x: -64.0, y: -34.6 },
    description:
      "High-altitude vineyards in the Andes foothills produce bold Malbecs and elegant Cabernets that define Argentine winemaking.",
    products: [
      {
        name: "Chardonnay",
        brand: "Tierra Alta",
        category: "wine",
        type: "white",
        description:
          "Tropical fruit aromas and minerality with a crisp, refreshing finish. Golden color with greenish highlights and a clean, bright appearance.",
      },
      {
        name: "Malbec",
        brand: "Un Mundo Chiquito",
        category: "wine",
        type: "red",
        description:
          "Classic Argentine Malbec from Mendoza with layers of chocolate syrup, cocoa powder, espresso, cinnamon and hits of clove.",
      },
      {
        name: "Malbec",
        brand: "Tierra Alta",
        category: "wine",
        type: "red",
        description:
          "From high-altitude vineyards where the Andes kiss the sky. Ripe blackberry, dark plum, hints of violet, cocoa and vanilla from oak aging. Silky tannins.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Tierra Alta",
        category: "wine",
        type: "red",
        description:
          "Rich and full bodied. Bold black cherry, cassis and subtle oak spice from the Andes foothills. Smooth, elegant with a long satisfying finish.",
        tags: ["coming-soon"],
      },
      {
        name: "Corte B",
        brand: "Vistalba",
        category: "wine",
        type: "red",
        description:
          "68% Malbec, 18% Cabernet Sauvignon, 14% Bonarda. Aged 15 months in French oak.",
        points: "94 Points - Tim Atkin MW",
      },
      {
        name: "Corte C",
        brand: "Vistalba",
        category: "wine",
        type: "red",
        description:
          "80% Malbec, 20% Cabernet Sauvignon. 20% of the blend aged in oak barrels for 12 months.",
        points: "93 Points - Tim Atkin MW",
      },
      {
        name: "Corte A",
        brand: "Vistalba",
        category: "wine",
        type: "red",
        description:
          "70% Malbec, 20% Cabernet Sauvignon, 10% Bonarda. Aged 18 months in French oak.",
        points: "92 Points - Wine Advocate",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Maximus",
        category: "wine",
        type: "red",
        description:
          "Intense ruby red with complex cassis, cherry, pepper, vanilla and tobacco aromas. Good structure with sweet, ripe tannins and a long finish.",
      },
      {
        name: "Malbec",
        brand: "Maximus",
        category: "wine",
        type: "red",
        description:
          "Hand picked from vines over 15 years old. Aged 6 months in French oak barrels. Intense red fruit aromas with delicate spices and pepper.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Bodegas Lopez",
        category: "wine",
        type: "white",
        description:
          "From the Los Carolinos estate (1927). Soft, fresh, fruity and balanced. Greenish yellow with golden sparkles.",
      },
      {
        name: "Malbec",
        brand: "Bodegas Lopez",
        category: "wine",
        type: "red",
        description:
          "Aged 6 months in French oak casks. Medium intensity, red violet with garnet reflections. Fresh red fruit, plum, blackberry, and cinnamon.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Bodegas Lopez",
        category: "wine",
        type: "red",
        description:
          "Aged 6 months in French oak casks. Ruby red with mahogany tones. Red currants, raspberry, black pepper and liquorice. Excellent structure with soft tannins.",
      },
      {
        name: "Malbec",
        brand: "Tomero",
        category: "wine",
        type: "red",
        description:
          "100% Malbec. 20% aged in oak barrels for 8 months, remaining 80% in stainless steel.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Tomero",
        category: "wine",
        type: "red",
        description:
          "100% Cabernet Sauvignon. 20% aged in French oak barrels for 6 months, remaining 80% in stainless steel.",
      },
      {
        name: "Single Vineyard Malbec",
        brand: "Tomero",
        category: "wine",
        type: "red",
        description:
          "100% Malbec from single reserve vineyard. Aged in 225L oak barrels, 500L casks and 3500L barrels for 12 months. Rested 6 months in bottle.",
        points: "91 Points - Tim Atkin MW",
      },
      {
        name: "Single Vineyard Pinot Noir",
        brand: "Tomero",
        category: "wine",
        type: "red",
        description:
          "100% Pinot Noir from single reserve vineyard. Aged in French oak barrels and 3500L barrels for 12 months.",
        points: "90 Points - Tim Atkin MW",
      },
    ],
  },

  // ─── BRAZIL ─────────────────────────────────────────────
  {
    id: "brazil",
    name: "Brazil",
    flag: "\u{1F1E7}\u{1F1F7}",
    icon: "/icons/brazil.svg",
    region: "south-america",
    mapPosition: { x: -47.9, y: -15.8 },
    description:
      "Home to the world\u2019s finest cacha\u00e7as and unique tropical wine traditions, Brazil brings vibrant flavors to the portfolio.",
    products: [
      {
        name: "Cacha\u00e7a Tatuzinho",
        brand: "Velho Barreiro",
        category: "spirit",
        type: "cacha\u00e7a",
        description:
          "Born in S\u00e3o Paulo from highly selected sugar cane juice. Crystalline white with pleasant citrus and white fruit notes. Clean and balanced.",
      },
      {
        name: "Cacha\u00e7a Boazinha",
        brand: "Boazinha",
        category: "spirit",
        type: "cacha\u00e7a",
        description:
          "From Minas Gerais. Stored 2.5 years in balm barrels. Mild and slightly astringent flavor with intense aroma of herbs.",
      },
      {
        name: "Cacha\u00e7a Tatuzinho Lime",
        brand: "Velho Barreiro",
        category: "spirit",
        type: "cacha\u00e7a",
        description:
          "From highly selected sugar cane juice. Crystalline white with citrus and white fruit notes heightened with bright citrus and fresh lime zest.",
      },
      {
        name: "Cacha\u00e7a Seleta Silver",
        brand: "Seleta",
        category: "spirit",
        type: "cacha\u00e7a",
        description:
          "Vegetable notes of freshly cut cane. Sweet aroma, soft flavor and velvety touch. Ideal for the caipirinha.",
      },
      {
        name: "Catuaba",
        brand: "Catuaba Generosa",
        category: "spirit",
        type: "liqueur",
        description:
          "Catuaba is a well-known Brazilian plant with antioxidant and vasodilatory properties. Carefully selected spices create a truly unique tropical flavor.",
      },
      {
        name: "Suave White",
        brand: "Cancao",
        category: "wine",
        type: "white",
        description:
          "Elaborated from American grapes: Niagara, Couderc 13, Villard Serve. Straw-colored, light and soft. Characteristic aroma with guava flavor.",
      },
    ],
  },

  // ─── CHILE ──────────────────────────────────────────────
  {
    id: "chile",
    name: "Chile",
    flag: "\u{1F1E8}\u{1F1F1}",
    icon: "/icons/chile.svg",
    region: "south-america",
    mapPosition: { x: -70.7, y: -33.4 },
    description:
      "Chile\u2019s diverse terroir produces exceptional wines at every level, from everyday favorites to premium selections.",
    products: [
      {
        name: "Chardonnay",
        brand: "Casa Monte",
        category: "wine",
        type: "white",
        description:
          "Aromas of toasty vanilla with ripe white peach and apricots. Tropical fruit flavors with a rich vanilla finish.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Casa Monte",
        category: "wine",
        type: "red",
        description:
          "Dark overripe cherry and dark chocolate aromas. Sweet ripe red and black cherry fruit, with well balanced acidity.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Casa Monte",
        category: "wine",
        type: "white",
        description:
          "Citrus and pink grapefruit aromas. Tropical fruit, sweet citrus acidity, ripe white peaches and grapefruit flavors.",
      },
      {
        name: "Merlot",
        brand: "Casa Monte",
        category: "wine",
        type: "red",
        description:
          "Medium bodied and ruby red in color with notes of plum and cherry.",
      },
    ],
  },

  // ─── USA ────────────────────────────────────────────────
  {
    id: "usa",
    name: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    icon: "/icons/california.svg",
    region: "north-america",
    mapPosition: { x: -95.7, y: 37.1 },
    description:
      "From California\u2019s premier wine regions to award-winning craft spirits, the USA delivers bold innovation and quality.",
    products: [
      // WINES
      {
        name: "Pinot Noir",
        brand: "Kyle Cellars",
        category: "wine",
        type: "red",
        description:
          "Beautiful red jewel tones. Raspberry, cherry, cola and spice notes. Sweet red fruit with hints of cinnamon spice and sweet vanilla.",
        points: "93 Points - The Grape Solution",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Kyle Cellars",
        category: "wine",
        type: "red",
        description:
          "Aromas of dried cranberry, cherry and dark chocolate. Rich dark fruits, baking spice and sweet oak lead to a long, lingering finish.",
        points: "94 Points - The Grape Solution",
      },
      {
        name: "Chardonnay",
        brand: "Kyle Cellars",
        category: "wine",
        type: "white",
        description:
          "Golden apple and lemon peel aromas with apricot essence, vanilla and spice. Rich and creamy mouthfeel with balanced acidity.",
        points: "94 Points - The Grape Solution",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Paw Print",
        category: "wine",
        type: "white",
        description:
          "Citrus and pink grapefruit aromas. Tropical notes, white peach and grapefruit with sweet acidity.",
      },
      {
        name: "White Zinfandel",
        brand: "Paw Print",
        category: "wine",
        type: "ros\u00e9",
        description:
          "Aromas of raspberry and a hint of plums. Crisp with loads of sweet ripe fruits.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Paw Print",
        category: "wine",
        type: "red",
        description:
          "Deep notes of jammy berries. Sweet ripe red cherry and berry notes on the palate.",
      },
      {
        name: "Pinot Grigio",
        brand: "Paw Print",
        category: "wine",
        type: "white",
        description:
          "Tart green apple flavors with luscious white peach, floral blossom and citrus.",
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Profanity Life Screw Off",
        category: "wine",
        type: "red",
        description:
          "Dark fruits, ripe blackberries and plums with oak and vanilla. Bold with layers of spice, black pepper and tobacco. Pairs with hearty dishes and robust cheeses.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Undressed",
        category: "wine",
        type: "white",
        description:
          "Crisp citrus and fresh green apple in harmonious natural simplicity. Aged 6 months, half in stainless steel and half in French oak.",
      },
      {
        name: "Paso Robles Cabernet Sauvignon",
        brand: "Puribus",
        category: "wine",
        type: "red",
        description:
          "Bold, expressive. Blackberry, black currant, dark cherry layered with vanilla, cedar and dried herbs. Rich and full-bodied with velvety tannins.",
      },
      {
        name: "Napa Cabernet",
        brand: "Golden Archer",
        category: "wine",
        type: "red",
        description:
          "Precise, powerful and true. Dark fruit, firm structure and a finish that never misses. From Napa Valley, California.",
        tags: ["limited", "coming-soon"],
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Cooper & Oak",
        category: "wine",
        type: "red",
        description:
          "Dark fruit, firm structure and a finish that never misses. From Red Hill, California.",
        tags: ["coming-soon"],
      },
      {
        name: "Pinot Noir",
        brand: "One Life",
        category: "wine",
        type: "red",
        description:
          "From prime terroir with high elevation and volcanic soils. Dried red fruit, cocoa, spices and blackberries from French oak. Lasting and pleasurable finish.",
      },
      {
        name: "Private Collection Napa Cabernet Sauvignon",
        brand: "One Life",
        category: "wine",
        type: "red",
        description:
          "Once a year allocated production. Royal cassis, silky black cherry, dark berry fruit framed by bakers\u2019 chocolate, cedar and toasted sage. Best from 2025 through 2036.",
        tags: ["limited", "coming-soon"],
      },
      {
        name: "Cabernet Sauvignon",
        brand: "Good Fucking Wine",
        category: "wine",
        type: "red",
        description:
          "A bold California Cabernet Sauvignon with rich, deep flavors.",
        tags: ["coming-soon"],
      },
      {
        name: "Red Blend",
        brand: "Good Fucking Wine",
        category: "wine",
        type: "red",
        description:
          "A flavorful California red blend.",
        tags: ["coming-soon"],
      },
      {
        name: "Sweet Red",
        brand: "Good Fucking Wine",
        category: "wine",
        type: "red",
        description:
          "Delicious blend of sweet California red grapes, wonderfully smooth with bright fruity taste and ruby-red color. Refreshingly crisp and just sweet enough.",
      },
      // SPIRITS
      {
        name: "92 Proof Straight Bourbon",
        brand: "American Woman Spirit Co.",
        category: "spirit",
        type: "bourbon",
        description:
          "Rich corn mash bill aged in 4 distinct char 100 year-old forest oak barrels. Creamy vanilla nose with caramel and honey. 99% Corn, 1% Barley.",
      },
      {
        name: "102 Proof Straight Bourbon",
        brand: "American Woman Spirit Co.",
        category: "spirit",
        type: "bourbon",
        description:
          "95% Rye, 5% Malted Barley aged in 4 distinct char 100 year-old forest oak barrels for over 3 years. Rich oak, cinnamon, pear, honey and spice.",
      },
      {
        name: "Cask Strength Straight Bourbon",
        brand: "American Woman Spirit Co.",
        category: "spirit",
        type: "bourbon",
        description:
          "Buttery cask strength bourbon. Coffee nose with honey. 99% Corn, 1% Barley. Bottled at barrel strength 126-132 Proof.",
      },
      {
        name: "Tequila Blanco",
        brand: "American Woman Spirit Co.",
        category: "spirit",
        type: "tequila",
        description:
          "100% Blue Weber Agave. Fresh and herbaceous with grapefruit and green apple notes. Pepper and cloves warmth. Whiskey barrel stave finishing process.",
      },
      {
        name: "Small Batch Bourbon",
        brand: "Good Fucking Bourbon",
        category: "spirit",
        type: "bourbon",
        description:
          "70% corn, 30% wheat. Distilled in authentic copper pot still. Aged 4 years. Non chill-filtered. Caramel and honey with a long, gentle finish.",
      },
      {
        name: "Small Batch Tequila",
        brand: "Good Fucking Tequila",
        category: "spirit",
        type: "tequila",
        description:
          "100% Blue Weber Agave. Oxygenated Blanco for a smoother finish. Light, clean and smooth finish. From Jalisco, Mexico.",
      },
      {
        name: "Small Batch Vodka",
        brand: "Good Fucking Vodka",
        category: "spirit",
        type: "vodka",
        description:
          "Small batch craft vodka from American corn. Ultra smooth. Shenandoah Valley, Blue Ridge Limestone water for silky texture. No mixers needed.",
      },
      {
        name: "Bourbon",
        brand: "Reserve 1787",
        category: "spirit",
        type: "bourbon",
        description:
          "Straight Bourbon Whiskey with medium to light body. Rich notes of leather, tobacco, vanilla and hints of caramel.",
      },
      {
        name: "Gin",
        brand: "Axis",
        category: "spirit",
        type: "gin",
        description:
          "Premium spirit from Long Island. Blend of exotic botanicals delivering a crisp and invigorating flavor. Perfect for elegant cocktails.",
      },
      {
        name: "Cognac",
        brand: "Revanche",
        category: "spirit",
        type: "cognac",
        description:
          "Finest grapes from the best areas of Cognac, France. Blend of 80% VS (3yr), 15% VSOP (5yr), and 5% XO (10yr). The Rolls Royce of Cognac.",
      },
    ],
  },

  // ─── NEW ZEALAND ────────────────────────────────────────
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    icon: "/icons/new-zealand.svg",
    region: "oceania",
    mapPosition: { x: 174.9, y: -41.3 },
    description:
      "Marlborough\u2019s renowned Sauvignon Blancs offer vibrant, punchy aromatics that have captivated the world.",
    products: [
      {
        name: "Sauvignon Blanc",
        brand: "Coco Bay",
        category: "wine",
        type: "white",
        description:
          "Traditional punchy herbal nose with cut grass, green peppercorns, gooseberry and marjoram. Chalky, gravelly texture with steely acidity.",
      },
      {
        name: "Sauvignon Blanc",
        brand: "Tiki Grove",
        category: "wine",
        type: "white",
        description:
          "Hallmark Marlborough aromatics. Tropical and citrusy with fresh herbs and pepper notes. Bright, lively acidity.",
        tags: ["coming-soon"],
      },
      {
        name: "Sauvignon Blanc",
        brand: "Blue Bay",
        category: "wine",
        type: "white",
        description:
          "Crisp freshness with vibrant grape aromas. Citrus and tropical fruit burst, balanced by zesty acidity and a clean, lingering finish.",
        tags: ["coming-soon"],
      },
    ],
  },

  // ─── SOUTH KOREA ────────────────────────────────────────
  {
    id: "south-korea",
    name: "South Korea",
    flag: "\u{1F1F0}\u{1F1F7}",
    icon: "/icons/south-korea.svg",
    region: "asia",
    mapPosition: { x: 127.0, y: 37.6 },
    description:
      "Korea\u2019s vibrant soju culture brings refreshing fruit-infused spirits perfect for social occasions.",
    products: [
      {
        name: "Soju Yogurt",
        brand: "7Drops",
        category: "spirit",
        type: "soju",
        description:
          "Delicious Korean drink with honey dew melon flavor. Newtro prepared with Korean pear and apple wine.",
      },
      {
        name: "Soju Passion Fruit",
        brand: "7Drops",
        category: "spirit",
        type: "soju",
        description:
          "Smooth richness of Soju with sweet and fragrant notes of lychee. Perfect companion for any occasion.",
      },
      {
        name: "Apple Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Crisp and refreshing with high-quality apple juice and natural rock water. 12.5% ABV.",
      },
      {
        name: "Blueberry Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Smooth and enjoyable with fresh blueberry flavor and natural rock water. 12.5% ABV.",
      },
      {
        name: "Grapefruit Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Crisp and refreshing with grapefruit juice and natural rock water. 12.5% ABV.",
      },
      {
        name: "Lychee Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Smooth with delicate lychee flavor harmonized with natural rock water. 12.5% ABV.",
      },
      {
        name: "Pomegranate Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Refreshing with pomegranate juice and natural rock water. 12.5% ABV.",
      },
      {
        name: "Green Grape Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Light and refreshing with green grape flavor and natural rock water. 12.5% ABV.",
      },
      {
        name: "Pineapple Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Tropical and refreshing with pineapple juice and natural rock water. 12.5% ABV.",
      },
      {
        name: "Mango Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Rich mango flavor harmonized with natural rock water. 12.5% ABV.",
      },
      {
        name: "Strawberry Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Sweet strawberry flavor balanced with natural rock water. 12.5% ABV.",
      },
      {
        name: "Peach Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Delicate peach flavor with natural rock water. 12.5% ABV.",
      },
      {
        name: "Watermelon Soju",
        brand: "Better Tomorrow",
        category: "spirit",
        type: "soju",
        description:
          "Refreshing watermelon flavor with natural rock water. 12.5% ABV.",
      },
    ],
  },

  // ─── JAPAN ──────────────────────────────────────────────
  {
    id: "japan",
    name: "Japan",
    flag: "\u{1F1EF}\u{1F1F5}",
    icon: "/icons/japan.svg",
    region: "asia",
    mapPosition: { x: 139.7, y: 35.7 },
    description:
      "Japanese sake\u2014crafted with premium rice and pure spring water\u2014embodies centuries of meticulous brewing artistry.",
    products: [
      {
        name: "Junmai Ginjo Sake",
        brand: "Sakeberto",
        category: "spirit",
        type: "sake",
        description:
          "Excellent balance of gorgeous aroma and acidity. Premium Japanese rice and local spring water. Medium, crisp dryness with a fruity, exotic profile.",
      },
      {
        name: "Junmai Sake",
        brand: "Sakeberto",
        category: "spirit",
        type: "sake",
        description:
          "Extra crispy with umami and deep richness of rice. Best served warm or at room temperature. Slight apple and melon-like aromas.",
      },
    ],
  },

  // ─── INDIA ──────────────────────────────────────────────
  {
    id: "india",
    name: "India",
    flag: "\u{1F1EE}\u{1F1F3}",
    icon: "/icons/india.svg",
    region: "asia",
    mapPosition: { x: 78.0, y: 21.0 },
    description:
      "India\u2019s Smoke Lab brings the rich heritage of spices to premium vodka, creating globally acclaimed spirits.",
    products: [
      {
        name: "Classic Vodka",
        brand: "Smoke Lab",
        category: "spirit",
        type: "vodka",
        description:
          "5 times distilled ultra pure spirit. Certified Gluten Free and Kosher.",
      },
      {
        name: "Aniseed Flavored Vodka",
        brand: "Smoke Lab",
        category: "spirit",
        type: "vodka",
        description:
          "Aniseed (saunf) first discovered in the Mediterranean. Refreshing notes of fennel and liquorice. Certified Gluten Free and Kosher.",
      },
      {
        name: "Saffron Vodka",
        brand: "Smoke Lab",
        category: "spirit",
        type: "vodka",
        description:
          "Ultra Pure Spirit infused with Kashmiri Saffron, the most expensive spice. First and most awarded premium vodka from India.",
      },
    ],
  },

  // ─── CHINA ──────────────────────────────────────────────
  {
    id: "china",
    name: "China",
    flag: "\u{1F1E8}\u{1F1F3}",
    icon: "/icons/china.svg",
    region: "asia",
    mapPosition: { x: 104.2, y: 35.9 },
    description:
      "Innovative ready-to-drink cocktails blending vodka and brandy with refreshing fruit flavors.",
    products: [
      {
        name: "Peach & Brandy Flavor",
        brand: "Rio Light",
        category: "spirit",
        type: "rtd",
        description:
          "Vodka, grape wine and grape brandy with peach flavor. Refreshing and unique taste.",
      },
      {
        name: "Passion Fruit & Vodka Flavor",
        brand: "Rio Light",
        category: "spirit",
        type: "rtd",
        description:
          "Refreshing passion fruit flavor with vodka. Light and easy to drink.",
      },
      {
        name: "Ros\u00e9 Lychee & Brandy Flavor",
        brand: "Rio Light",
        category: "spirit",
        type: "rtd",
        description:
          "Sweetness of lychee flavor with brandy. Refreshing and unique taste.",
      },
      {
        name: "Yogurt & Vodka Flavor",
        brand: "Rio Light",
        category: "spirit",
        type: "rtd",
        description:
          "Creamy yogurt flavor paired with vodka. Light and refreshing.",
      },
    ],
  },

  // ─── MEXICO ─────────────────────────────────────────────
  {
    id: "mexico",
    name: "Mexico",
    flag: "\u{1F1F2}\u{1F1FD}",
    icon: "/icons/mexico.svg",
    region: "north-america",
    mapPosition: { x: -102.6, y: 23.6 },
    description:
      "Mexico\u2019s tequila tradition delivers smooth, artisanal spirits crafted from organic Blue Weber agave.",
    products: [
      {
        name: "Tequila Blanco",
        brand: "La Brune Ed Catrina",
        category: "spirit",
        type: "tequila",
        description:
          "Collected from organic Blue Weber Agaves. Clean, refined taste. Impeccable sweet and herbal flavor with softness of taste. Perfect for experimental cocktails or classic margaritas.",
      },
    ],
  },

  // ─── CARIBBEAN ──────────────────────────────────────────
  {
    id: "caribbean",
    name: "Caribbean",
    flag: "\u{1F3DD}\u{FE0F}",
    icon: "/icons/caribbean.svg",
    region: "north-america",
    mapPosition: { x: -72.0, y: 19.0 },
    description:
      "Authentic Caribbean rums with bold spices, tropical warmth, and smooth character.",
    products: [
      {
        name: "Spiced Rum",
        brand: "Blue Coco Beach",
        category: "spirit",
        type: "rum",
        description:
          "Traditional Caribbean rum with coconut liqueur. Smooth, tasty and flavorful. Great in Pi\u00f1a Coladas.",
      },
      {
        name: "Black Spiced Rum",
        brand: "Black Sand Beach",
        category: "spirit",
        type: "rum",
        description:
          "Deep dark brown with ruby and mahogany hints. Sweet vanilla, caramel, dark chocolate with cinnamon, clove and nutmeg. Bold with burnt caramel and coffee.",
      },
    ],
  },
];

// ─── VALUED WINES (Italy value line) ──────────────────────
// These are included in the Italy section above or as separate "value" products
export const valuedWines: Product[] = [
  {
    name: "Pinot Grigio",
    brand: "Zuccotti",
    category: "wine",
    type: "white",
    description:
      "Beautifully ripe green apple and lemon with hints of honeydew. Crisp and refreshing. The perfect everyday wine.",
  },
  {
    name: "Pinot Grigio",
    brand: "San Nicola",
    category: "wine",
    type: "white",
    description:
      "Crisp and refreshing in style with hints of lemon, peach and melon.",
  },
  {
    name: "Sauvignon Blanc",
    brand: "San Nicola",
    category: "wine",
    type: "white",
    description:
      "Fragrant bouquet with vibrant lime zest, ruby grapefruit and pineapple with a crisp, refreshing finish.",
  },
  {
    name: "Cabernet Sauvignon",
    brand: "San Nicola",
    category: "wine",
    type: "red",
    description:
      "Full bodied with rich ruby red color. Black cherry, plum and blackberry flavors.",
  },
  {
    name: "Moscato",
    brand: "San Nicola",
    category: "wine",
    type: "dessert",
    description:
      "Lusciously refreshing with the perfect amount of sweetness. White peach, apricot and tropical fruit flavors.",
  },
  {
    name: "Montepulciano",
    brand: "San Nicola",
    category: "wine",
    type: "red",
    description:
      "Leather and earthy notes with a wild, deep nose. Dark cherry and blackcurrant fill the palate.",
  },
  {
    name: "Merlot",
    brand: "San Nicola",
    category: "wine",
    type: "red",
    description:
      "Medium bodied and ruby red with notes of plum and cherry.",
  },
  {
    name: "Pinot Noir",
    brand: "San Nicola",
    category: "wine",
    type: "red",
    description:
      "Brilliant ruby color. Medium bodied and refreshing with cherry and wild berry notes.",
  },
  {
    name: "Chianti",
    brand: "San Marco",
    category: "wine",
    type: "red",
    description:
      "Sangiovese, merlot and cabernet sauvignon. Deep fruity plum and intense cherry with hints of spice, hazelnut and violet aromas.",
  },
  {
    name: "Montepulciano",
    brand: "San Marco",
    category: "wine",
    type: "red",
    description:
      "Leather and earthy notes with a wild, deep nose. Dark cherry and blackcurrant fill the palate.",
  },
];
