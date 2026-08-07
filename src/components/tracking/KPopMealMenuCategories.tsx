import React, { useState } from "react";
import { Utensils, Sun, Coffee, Moon, Apple, Sparkles, CheckCircle2, Heart, Search, Filter } from "lucide-react";

export interface FoodExample {
  id: string;
  category: "breakfast" | "lunch" | "snack" | "dinner";
  title: string;
  koreanName?: string;
  description: string;
  ingredients: string[];
  benefits: string;
  prepTime: string;
  icon: string;
  tag: string;
}

const FOOD_DATABASE: FoodExample[] = [
  // --- PETIT-DÉJEUNER ---
  {
    id: "b1",
    category: "breakfast",
    title: "Porridge d'Avoine, Banane & Myrtilles",
    koreanName: "오트밀 바나나 죽",
    description: "Un petit-déjeuner chaud à libération d'énergie lente, idéal pour tenir sans baisse de régime jusqu'au déjeuner.",
    ingredients: ["Flocons d'avoine complets", "Lait d'amande ou d'avoine", "1/2 Banane mûre", "Poignée de myrtilles", "Graines de chia"],
    benefits: "Glucides complexes & Potassium anti-crampes musculaires",
    prepTime: "8 min",
    icon: "🥣",
    tag: "Énergie Lente"
  },
  {
    id: "b2",
    category: "breakfast",
    title: "Toast Avocat, Saumon Fumé & Œuf Poché",
    koreanName: "아보카도 연어 토스트",
    description: "Combinaison haute qualité de protéines et de graisses saines pour stimuler la concentration et la mémoire des chorégraphies.",
    ingredients: ["1 tranche de pain au levain", "1/2 Avocat écrasé au citron", "1 Œuf bio poché", "Tranche de saumon fumé", "Sésame noir"],
    benefits: "Oméga-3 & Protéines pour la clarté mentale",
    prepTime: "10 min",
    icon: "🥑",
    tag: "Protéines & Oméga-3"
  },
  {
    id: "b3",
    category: "breakfast",
    title: "Omelette aux Épinards, Champignons & Patate Douce",
    koreanName: "시금치 버섯 오믈렛",
    description: "Repas salé ultra-complet, sans gluten lourd, parfait avant une séance de chant ou de sport matinale.",
    ingredients: ["2 Œufs bio battus", "Pousses d'épinards frais", "Champignons Shiitake émincés", "1/2 Patate douce cuite à la vapeur"],
    benefits: "Fer, Antioxydants & Digestion facile",
    prepTime: "12 min",
    icon: "🍳",
    tag: "Riche en Fer"
  },
  {
    id: "b4",
    category: "breakfast",
    title: "Gimbap Léger Matinal au Tofu & Omelette",
    koreanName: "조식 두부 계란 김밥",
    description: "Le rouleau de riz coréen revisité en version légère et pratique à emporter en studio.",
    ingredients: ["Feuille d'algue Nori", "Riz brun vinaigré", "Lanières d'omelette", "Tofu grillé", "Concombre & Carottes croquantes"],
    benefits: "Rassasiant, nomade & équilibré",
    prepTime: "15 min",
    icon: "🍱",
    tag: "Spécialité Seoul"
  },
  {
    id: "b5",
    category: "breakfast",
    title: "Açaï Bowl Éclat & Fruits Rouges",
    koreanName: "아사이 베리 볼",
    description: "Un bol glacé rafraîchissant gorgé de vitamines pour une peau éclatante avant les tournages.",
    ingredients: ["Purée d'açaï pure", "Kiwis & Fraises tranchées", "Granola complet maison", "Graines de courge"],
    benefits: "Vitamines C, E & Éclat du teint",
    prepTime: "5 min",
    icon: "🫐",
    tag: "Peau & Éclat"
  },
  {
    id: "b6",
    category: "breakfast",
    title: "Smoothie Bowl Mangue, Ananas & Lait de Coco",
    koreanName: "망고 코코넛 스무디볼",
    description: "Un petit-déjeuner exotique riche en enzymes digestives naturelles (bromélaïne) pour éviter les ballonnements.",
    ingredients: ["Mangue congelée", "Ananas frais", "Lait de coco léger", "Noix de coco râpée", "Graines de chia"],
    benefits: "Enzymes digestives & Hydratation intense",
    prepTime: "6 min",
    icon: "🥭",
    tag: "Exotique & Digestif"
  },
  {
    id: "b7",
    category: "breakfast",
    title: "Pancakes d'Avoine & Banane sans Sucre Ajouté",
    koreanName: "오트밀 바나나 팬케이크",
    description: "La version gourmande et ultra-saine du pancake matinal, parfaite pour se faire plaisir sans culpabilité.",
    ingredients: ["Flocons d'avoine mixés", "1 Banane écrasée", "1 Œuf bio", "Pincée de cannelle", "Quartiers de fraises"],
    benefits: "Satiété durable & Plaisir sain",
    prepTime: "10 min",
    icon: "🥞",
    tag: "Gourmandise Saine"
  },
  {
    id: "b8",
    category: "breakfast",
    title: "Porridge Coréen Doux au Sésame Noir & Riz Brun (Heukimja-Juk)",
    koreanName: "흑임자 현미죽",
    description: "Le bouillie traditionnelle au sésame noir très prisée à Seoul pour fortifier les cheveux et apporter une énergie douce.",
    ingredients: ["Sésame noir moulu", "Riz brun gluant", "Eau de source", "Graines de tournesol", "Miel brut bio"],
    benefits: "Cheveux forts, Minéraux & Douceur stomacale",
    prepTime: "15 min",
    icon: "🥣",
    tag: "Tradition Seoul"
  },

  // --- DÉJEUNER ---
  {
    id: "l1",
    category: "lunch",
    title: "Bibimbap Équilibré au Tofu & Légumes Sautés",
    koreanName: "채식 비빔밥",
    description: "Le plat star des cafétérias d'agences : un bol coloré réunissant tous les macronutriments essentiels.",
    ingredients: ["Riz brun ou noir complet", "Tofu mariné aux herbes", "Carottes râpées", "Épinards au sésame", "Courgettes sautées", "Gochujang doux"],
    benefits: "Équilibre parfait Protéines / Glucides / Fibres",
    prepTime: "20 min",
    icon: "🍲",
    tag: "Incontournable K-Pop"
  },
  {
    id: "l2",
    category: "lunch",
    title: "Poké Bowl Saumon, Edamame & Concombre",
    koreanName: "연어 에다마메 포케볼",
    description: "Un repas frais, très hydratant et pauvre en sodium pour éviter toute rétention d'eau lors des performances.",
    ingredients: ["Dés de saumon cru ou grillé", "Fèves d'edamame", "Concombre croquant", "Radis roses", "Riz de chou-fleur ou riz noir", "Sauce soja légère"],
    benefits: "Anti-inflammation & Hydratation cellulaire",
    prepTime: "15 min",
    icon: "🥗",
    tag: "Frais & Anti-Rétention"
  },
  {
    id: "l3",
    category: "lunch",
    title: "Poulet Grillé, Quinoa & Patate Douce Rôtie",
    koreanName: "닭가슴살 퀴노아 샐러드",
    description: "Reconstitution optimale des réserves de glycogène musculaire après 2h de danse intensive.",
    ingredients: ["Emincé de poulet aux herbes", "Quinoa cuit", "Cubes de patate douce au four", "Avocat", "Vinaigrette citron-huile d'olive"],
    benefits: "Reconstruction musculaire & Zéro coup de fatigue",
    prepTime: "25 min",
    icon: "🍗",
    tag: "Récupération Danse"
  },
  {
    id: "l4",
    category: "lunch",
    title: "Soupe Doenjang-Jgiiyae Douce au Tofu & Champignons",
    koreanName: "순한 된장찌개",
    description: "Soupe fermentée traditionnelle coréenne réconfortante qui prend soin de la flore intestinale.",
    ingredients: ["Bouillon Doenjang (pâte de soja fermentée)", "Tofu ferme en cubes", "Champignons Enoki", "Courgettes", "Riz vapeur"],
    benefits: "Probiotiques naturels & Confort digestif",
    prepTime: "18 min",
    icon: "🍲",
    tag: "Santé Intestinale"
  },
  {
    id: "l5",
    category: "lunch",
    title: "Wrap Complet Dinde, Houmous & Crudités",
    koreanName: "칠면조 훌 머스 랩",
    description: "Déjeuner rapide à déguster entre un cours de chant et une évaluation de positionnement scénique.",
    ingredients: ["Galette de blé complet", "Filet de dinde grillée", "Houmous au citron", "Pousses d'épinards", "Poivrons rouges croquants"],
    benefits: "Riche en fibres & Pratique en studio",
    prepTime: "10 min",
    icon: "🌯",
    tag: "Pratique & Rapide"
  },
  {
    id: "l6",
    category: "lunch",
    title: "Japchae Lighter aux Nouilles de Patate Douce & Champignons Shiitake",
    koreanName: "야채 잡채",
    description: "Plat festif coréen à base de vermicelles de patate douce sautés aux légumes croquants et sésame grillé.",
    ingredients: ["Nouilles Dangmyeon (patate douce)", "Champignons Shiitake", "Carottes", "Poivrons jaunes", "Épinards sautés", "Sauce soja & huile de sésame"],
    benefits: "Glucides complexes faciles à digérer & Plaisir coréen",
    prepTime: "20 min",
    icon: "🍜",
    tag: "Classique Coréen"
  },
  {
    id: "l7",
    category: "lunch",
    title: "Salade de Crevettes Grillées, Avocat & Pamplemousse Rose",
    koreanName: "구운 새우 자몽 샐러드",
    description: "Un déjeuner hyper-frais et coloré apportant des protéines légères et des antioxydants stimulants.",
    ingredients: ["Crevettes décortiquées grillées", "1/2 Pamplemousse rose en quartiers", "Avocat", "Mâche & Roquette", "Graines de grenade"],
    benefits: "Vitamines C, B12 & Drainage naturel",
    prepTime: "15 min",
    icon: "🍤",
    tag: "Vitalité & Drainage"
  },
  {
    id: "l8",
    category: "lunch",
    title: "Kimbap Protéiné au Thon Léger & Mayonnaise Végétale",
    koreanName: "참치 비건 마요 김밥",
    description: "Le rouleau de riz au thon au naturel retravaillé avec une sauce mayonnaise légère à base de soja.",
    ingredients: ["Feuille de Nori", "Thon au naturel", "Mayonnaise légère soja", "Radis jaune mariné (Danmuji)", "Concombre"],
    benefits: "Super pratique en déplacement & Protéines marines",
    prepTime: "12 min",
    icon: "🍙",
    tag: "Nomade & Protéiné"
  },

  // --- CASSE-CROÛTE & COLLATION ---
  {
    id: "s1",
    category: "snack",
    title: "Smoothie Proteiné Banane, Amande & Lait Végétal",
    koreanName: "바나나 아몬드 스무디",
    description: "Encas liquide à absorption rapide 30 minutes avant de monter sur scène ou de commencer le cours de danse.",
    ingredients: ["1 Banane mûre", "1 cuillère de beurre d'amande pur", "250ml Lait d'avoine", "Pincée de cannelle"],
    benefits: "Potassium anti-crampes & Énergie immédiate",
    prepTime: "3 min",
    icon: "🥤",
    tag: "Pre-Workout"
  },
  {
    id: "s2",
    category: "snack",
    title: "Energy Balls Dattes, Avoine & Cacao Brut",
    koreanName: "카카오 오트 에너 볼",
    description: "Petites bouchées énergétiques maison 100% naturelles sans sucres raffinés.",
    ingredients: ["Dattes Medjool", "Flocons d'avoine", "Cacao brut en poudre", "Graines de lin moulues", "Eclats de noisettes"],
    benefits: "Magnésium anti-stress & Coup de boost",
    prepTime: "10 min",
    icon: "🍫",
    tag: "Anti-Fatigue"
  },
  {
    id: "s3",
    category: "snack",
    title: "Edamames Vapeur à la Fleur de Sel & Sésame",
    koreanName: "에다마메 콩 스낵",
    description: "Le snack salé coréen par excellence : protéiné, ludique et ultra-sain.",
    ingredients: ["Fèves d'edamame dans leur cosse", "Pincée de fleur de sel", "Graines de sésame grillées"],
    benefits: "Protéines végétales & Faible indice glycémique",
    prepTime: "5 min",
    icon: "🫛",
    tag: "Snack Salé Coréen"
  },
  {
    id: "s4",
    category: "snack",
    title: "Bâtonnets de Concombre, Carotte & Houmous Citronné",
    koreanName: "야채 스틱과 후무스",
    description: "Encas croquant très riche en eau pour combler une petite faim tout en restant très léger.",
    ingredients: ["Concombre en bâtonnets", "Carottes croquantes", "Houmous maison à l'huile d'olive & jus de citron"],
    benefits: "Hydratation & Satiété sans lourdeur",
    prepTime: "5 min",
    icon: "🥕",
    tag: "Ultra-Hydratant"
  },
  {
    id: "s5",
    category: "snack",
    title: "Tranches de Pomme & Beurre de Cacahuète Pure",
    koreanName: "사과 피넛버터 슬라이스",
    description: "Le mariage parfait entre la fraîcheur croquante des fibres de la pomme et les graisses saines de la cacahuète.",
    ingredients: ["1 Pomme croquante (Gala ou Pink Lady)", "1 à 2 cuillères de beurre de cacahuète 100% arachide"],
    benefits: "Fibres & Maintien de la glycémie",
    prepTime: "3 min",
    icon: "🍎",
    tag: "Gourmand & Sain"
  },
  {
    id: "s6",
    category: "snack",
    title: "Brochettes de Fruits Frais (Fraise, Kiwi, Raisin)",
    koreanName: "제철 과일 꼬치",
    description: "Un encas vitaminé et naturellement sucré pour étancher la soif entre deux sessions de vocalises.",
    ingredients: ["Fraises bien mûres", "Kiwis en dés", "Raisins noirs sans pépins", "Jus de citron vert"],
    benefits: "Vitamines anti-fatigue & Sucre naturel rapide",
    prepTime: "5 min",
    icon: "🍓",
    tag: "Frais & Vitaminé"
  },
  {
    id: "s7",
    category: "snack",
    title: "Chips de Kale Rôties au Four à l'Huile d'Olive",
    koreanName: "바삭한 케일 칩스",
    description: "Alternative croustillante aux chips industrielles, riche en calcium et antioxydants.",
    ingredients: ["Feuilles de Kale effeuillées", "1 cuillère d'huile d'olive bio", "Fleur de sel & paprika doux"],
    benefits: "Calcium, Minéraux & Sens sensation 'Snack'",
    prepTime: "12 min",
    icon: "🥬",
    tag: "Croustillant Sain"
  },
  {
    id: "s8",
    category: "snack",
    title: "Yaourt Grec au Miel de Fleurs & Noix de Grenoble",
    koreanName: "그릭 요거트 꿀 견과류",
    description: "Probiotiques de haute qualité associés aux graisses protectrices des noix pour la santé du cerveau.",
    ingredients: ["Yaourt grec nature 0% ou 2%", "1 cuillère de miel de montagne", "Noix de Grenoble concassées"],
    benefits: "Probiotiques & Protection cérébrale",
    prepTime: "2 min",
    icon: "🍯",
    tag: "Probiotiques & Protéines"
  },
  {
    id: "s9",
    category: "snack",
    title: "Matcha Latte Glacé au Lait d'Avoine",
    koreanName: "아이시스 말차 라떼",
    description: "Une boisson énergisante sans pic d'anxiété grâce à la L-théanine contenue naturellement dans le thé vert matcha de Jeju.",
    ingredients: ["Poudre de Matcha cérémonial de Jeju", "Lait d'avoine froid", "Glaçons", "Légère touche de sirop d'agave"],
    benefits: "Énergie calme, Concentration & Antioxydants",
    prepTime: "4 min",
    icon: "🍵",
    tag: "Matcha de Jeju"
  },

  // --- DÎNER ---
  {
    id: "d1",
    category: "dinner",
    title: "Pavé de Saumon au Four, Brocolis Vapeur & Riz Noir",
    koreanName: "연어 구이와 브로콜리",
    description: "Un dîner régénérant qui favorise la réparation cellulaire pendant le sommeil sans surcharger l'estomac.",
    ingredients: ["Pavé de saumon rôti au citron", "Têtes de brocolis vapeur", "Portion de riz noir ou riz sauvage", "Filet d'huile de sésame"],
    benefits: "Réparation nocturne & Sommeil réparateur",
    prepTime: "20 min",
    icon: "🐟",
    tag: "Réparation Nocturne"
  },
  {
    id: "d2",
    category: "dinner",
    title: "Sundubu-Jjigae Douce au Tofu Tendre & Œuf Poché",
    koreanName: "순두부찌개",
    description: "Soupe coréenne chaude au tofu soyeux réconfortante pour détendre les muscles fatigués en fin de journée.",
    ingredients: ["Tofu soyeux (Sundubu)", "Bouillon doux aux légumes", "Champignons Shiitake", "Pousses de bambou", "1 Œuf pochè à la fin"],
    benefits: "Apaisant, Chaud & Digestion ultra-facile",
    prepTime: "15 min",
    icon: "🍲",
    tag: "Réconfort & Apaisement"
  },
  {
    id: "d3",
    category: "dinner",
    title: "Wok de Poulet & Légumes Croquants au Sésame",
    koreanName: "닭고기 야채 볶음",
    description: "Sauté rapide et coloré riche en micronutriments sans lourdeur digestive avant d'aller se coucher.",
    ingredients: ["Emincé de poulet", "Poivrons multicolores", "Pois gourmands", "Brocolis", "Noix de cajou grillées", "Sauce soja pauvre en sel"],
    benefits: "Riche en antioxydants & Zéro ballonnement",
    prepTime: "15 min",
    icon: "🥘",
    tag: "Léger & Vitaminé"
  },
  {
    id: "d4",
    category: "dinner",
    title: "Curry Doux de Lentilles Corail, Coco & Épinards",
    koreanName: "렌틸콩 코코넛 커리",
    description: "Plat mijoté végétalien riche en curcuma anti-inflammatoire pour apaiser les articulations sollicitées par les sauts.",
    ingredients: ["Lentilles corail", "Lait de coco léger", "Poudre de curcuma & gingembre", "Pousses d'épinards frais", "Portion de quinoa"],
    benefits: "Anti-inflammatoire naturel & Protéines végétales",
    prepTime: "20 min",
    icon: "🍛",
    tag: "Anti-Inflammatoire"
  },
  {
    id: "d5",
    category: "dinner",
    title: "Plaque de Légumes Rôtis & Tofu Grillé Mariné",
    koreanName: "구운 야채와 두부 구이",
    description: "Légumes de saison dorés au four (patate douce, courgettes, poivrons) servis avec du tofu bien croustillant.",
    ingredients: ["Dés de patate douce & courgettes au four", "Tofu ferme mariné au soja & ail", "Herbes de Provence", "Huile d'olive"],
    benefits: "Digestibilité optimale & Vitamines du soir",
    prepTime: "25 min",
    icon: "🍠",
    tag: "100% Végétal & Réconfort"
  },
  {
    id: "d6",
    category: "dinner",
    title: "Dak-Galbi Léger au Poulet, Chou Doux & Poivrons",
    koreanName: "순한 닭갈비",
    description: "Le fameux sauté de poulet coréen revisité en version douce sans excès de piment pour préserver l'estomac le soir.",
    ingredients: ["Morceaux de blanc de poulet", "Chou blanc émincé", "Patate douce", "Sauce Gochujang allégée", "Oignons verts"],
    benefits: "Protéines maigres & Maintien de la température corporelle",
    prepTime: "20 min",
    icon: "🥘",
    tag: "Protéines Douces"
  },
  {
    id: "d7",
    category: "dinner",
    title: "Filet de Cabillaud Vapeur au Gingembre & Légumes Croquants",
    koreanName: "대구 생선찜",
    description: "Poisson blanc extra-maigre précuit à la vapeur avec du gingembre apaisant pour les cordes vocales.",
    ingredients: ["Filet de cabillaud frais", "Gingembre râpé", "Pois gourmands", "Champignons Enoki", "Feuille de chou chinois"],
    benefits: "Poisson ultra-digestible & Apaisement vocal",
    prepTime: "15 min",
    icon: "🐟",
    tag: "Léger & Apaisant Vocal"
  },
  {
    id: "d8",
    category: "dinner",
    title: "Soupe d'Algues Réconfortante Traditionnelle (Miyeok-Guk)",
    koreanName: "미역국",
    description: "La soupe d'algues sacrée en Corée, consommée par les idoles pour purifier l'organisme et recharger en iode.",
    ingredients: ["Algues Wakame réhydratées", "Bouillon léger au sésame", "Ail haché", "Dés de tofu tendre"],
    benefits: "Iode, Détoxification & Pureté corporelle",
    prepTime: "15 min",
    icon: "🍲",
    tag: "Détox & Iode Coréen"
  }
];

export const KPopMealMenuCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "breakfast" | "lunch" | "snack" | "dinner">("breakfast");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("kpop_favorite_meals");
    return saved ? JSON.parse(saved) : ["b1", "l1", "s1", "d1"];
  });

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("kpop_favorite_meals", JSON.stringify(updated));
  };

  const filteredFoods = FOOD_DATABASE.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.koreanName && item.koreanName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "breakfast", label: "Petit-Déjeuner", sub: "아침 (Morning)", icon: Sun, color: "text-amber-500 bg-amber-50 border-amber-200" },
    { id: "lunch", label: "Déjeuner", sub: "점심 (Midday)", icon: Utensils, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "snack", label: "Casse-Croûte & Collation", sub: "간식 (Snack)", icon: Apple, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { id: "dinner", label: "Dîner", sub: "저녁 (Evening)", icon: Moon, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { id: "all", label: "Tout Voir", sub: "전체 (All Items)", icon: Sparkles, color: "text-purple-600 bg-purple-50 border-purple-200" },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              Guide des Repas & Menus Vitalité par Catégorie
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Découvrez des exemples de repas équilibrés, savoureux et adaptés aux besoins énergétiques des artistes en formation à Seoul.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{favorites.length} Plats Favoris Enregistrés</span>
        </span>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-emerald-600 border-emerald-700 text-white shadow-md shadow-emerald-200 scale-[1.02]"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <IconComp className={`w-4 h-4 ${isSelected ? "text-white" : "text-emerald-600"}`} />
                <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
                  {FOOD_DATABASE.filter((f) => cat.id === "all" || f.category === cat.id).length} plats
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-xs leading-tight">{cat.label}</h4>
                <span className={`text-[10px] font-medium block mt-0.5 ${isSelected ? "text-emerald-100" : "text-slate-500"}`}>
                  {cat.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un aliment, un ingrédient (ex: saumon, avoine, tofu, banane)..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFoods.map((item) => {
          const isFav = favorites.includes(item.id);
          return (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-4 transition-all duration-200 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.title}</h4>
                      {item.koreanName && (
                        <span className="text-[11px] font-mono text-emerald-700 font-semibold block">
                          {item.koreanName}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isFav ? "bg-rose-100 text-rose-600" : "bg-white text-slate-300 hover:text-rose-400 border border-slate-200"
                    }`}
                    title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>

                {/* Ingredients Pills */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block">
                    Ingrédients Clés :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{item.benefits}</span>
                </span>
                <span className="text-slate-500 text-[11px] font-mono bg-slate-200/60 px-2 py-0.5 rounded">
                  ⏱️ {item.prepTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredFoods.length === 0 && (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <p className="text-sm font-bold text-slate-700">Aucun plat ne correspond à votre recherche "{searchQuery}"</p>
          <p className="text-xs text-slate-500">Essayez d'autres mots-clés ou réinitialisez les filtres.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
          >
            Afficher tous les plats
          </button>
        </div>
      )}
    </div>
  );
};
