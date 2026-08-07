import { Agency, ChoreographyItem, SkinQuizQuestion } from "../types";

export const SKIN_ROUTINES = {
  morning: [
    { step: 1, title: "Nettoyant doux", desc: "Nettoie le sébum accumulé pendant la nuit sans agresser la barrière cutanée." },
    { step: 2, title: "Toner / Actif hydratant", desc: "Rebalance le pH et prépare la peau à absorber les nutriments." },
    { step: 3, title: "Sérum ciblé (Ex: Niacinamide)", desc: "Régule les pores et donne de l'éclat (Glow K-beauty)." },
    { step: 4, title: "Émulsion / Hydratant léger", desc: "Maintient l'eau dans les tissus durant les répétitions." },
    { step: 5, title: "SPF 50+ (Indispensable)", desc: "Protège contre les UV sous les projecteurs et en extérieur." }
  ],
  evening: [
    { step: 1, title: "Double Nettoyage : Huile démaquillante", desc: "Dissout le maquillage de scène, le sébum et le fixateur." },
    { step: 2, title: "Nettoyant mousseux aqueux", desc: "Élimine la transpiration et les résidus de pollution des pores." },
    { step: 3, title: "Exfoliant doux (1 à 2x / semaine)", desc: "AHA/BHA doux pour lisser le grain de peau sans rougeur." },
    { step: 4, title: "Sérum réparateur (Ex: Centella)", desc: "Aapaise l'inflammation due au stress et aux longues séances." },
    { step: 5, title: "Crème nourrissante / Masque de nuit", desc: "Régénère la peau pendant le sommeil réparateur." }
  ]
};

export const SKIN_APPLICATION_ORDER = [
  { rank: 1, category: "Nettoyant", name: "Nettoyage aqueux/huile", rule: "De la consistance la plus fluide à la plus épaisse." },
  { rank: 2, category: "Actif / Sérum", name: "Vitamine C, Niacinamide, Acide Hyaluronique", rule: "Pénètre profondément sur peau propre." },
  { rank: 3, category: "Hydratant", name: "Crème ou gel", rule: "Scelle l'hydratation et les actifs dans la peau." },
  { rank: 4, category: "Protection SPF", name: "Écran solaire / SPF 50+", rule: "Toujours en toute dernière étape le matin !" }
];

export const SKIN_COMMON_ERRORS = [
  "Sauter l'hydratation quand on a la peau grasse (ce qui augmente la production de sébum !)",
  "Oublier de se démaquiller immédiatement après un entraînement intensif.",
  "Utiliser des gommages physiques à grains trop abrasifs qui créent des micro-lésions.",
  "Dormir moins de 7 heures, ce qui nuit à la régénération cellulaire cutanée."
];

export const SKIN_STAGE_TIPS = [
  "Fixateur de maquillage à brume fine appliqués en 'X' et 'T' à 20cm du visage.",
  "Poudre matifiante transparente ciblée sur la zone T pour garder l'éclat 'Dewy' sur les pommettes sans luire.",
  "Papier matifiant buvard en coulisses avant de monter sur scène pour absorber la sueur sans déplacer le maquillage."
];

export const SKIN_QUIZ_QUESTIONS: SkinQuizQuestion[] = [
  {
    id: 1,
    question: "Comment réagit votre peau quelques heures après le lavage du matin ?",
    options: [
      { label: "Elle tire et tiraille sur tout le visage", type: "seche" },
      { label: "Elle brille uniquement sur le front, nez et menton (zone T)", type: "mixte" },
      { label: "Elle brille partout et les pores sont bien visibles", type: "grasse" },
      { label: "Elle rougit facilement ou picote aux produits", type: "sensible" }
    ]
  },
  {
    id: 2,
    question: "À quelle fréquence observez-vous de petites rougeurs ou imperfections ?",
    options: [
      { label: "Rarement, mais la peau pèle parfois", type: "seche" },
      { label: "Occasionnellement sur la zone T lors des répétitions", type: "mixte" },
      { label: "Fréquemment après avoir transpiré", type: "grasse" },
      { label: "Très souvent dès que le climat change ou après l'effort", type: "sensible" }
    ]
  },
  {
    id: 3,
    question: "Quel fini préférez-vous ressentir sur votre peau ?",
    options: [
      { label: "Un baume ultra-confortable et riche", type: "seche" },
      { label: "Une fraîcheur équilibrée sans brillance excessive", type: "mixte" },
      { label: "Un gel matifiant très frais", type: "grasse" },
      { label: "Une formule neutre, apaisante et sans parfum", type: "sensible" }
    ]
  }
];

export const HAIR_TYPES_INFO = [
  { type: "Lisse (Type 1)", desc: "Cheveux raides sans ondulations. Tendance à briller rapidement à la sueur.", care: "Utiliser un shampooing clarifiant doux et shampoing sec avant scène." },
  { type: "Ondulé (Type 2)", desc: "Ondulations légères en forme de S. Nécessite de la définition sans alourdir.", care: "Mousse coiffante légère et séchage au diffuseur." },
  { type: "Bouclé (Type 3)", desc: "Boucles bien définies et rebondies. sensible à l'humidité.", care: "Crème de boucles sans rinçage et sérum anti-frisottis pour la scène." },
  { type: "Crépu (Type 4)", desc: "Frisures très serrées ou en Z. Très versatile pour tresses et styles de scène uniques.", care: "Besoins d'hydratation intense (bains d'huile) et coiffures protectrices." }
];

export const STAGE_HAIRSTYLES = [
  { title: "Queue haute dynamique (High Pony)", desc: "Accompagne merveilleusement les mouvements de tête et donne une allure puissante.", difficulty: "Facile" },
  { title: "Tresses collées de scène (Dutch Braids)", desc: "Maintient les cheveux parfaitement en place pendant des chorégraphies intenses.", difficulty: "Moyen" },
  { title: "Chignon bas structuré (Sleek Low Bun)", desc: "Élégant, chic et moderne, idéal pour les concepts girl crush et élégants.", difficulty: "Moyen" },
  { title: "Demi-queue avec ruban / Accessoires", desc: "Donne un style dynamique, idéal pour les concepts frais et pop.", difficulty: "Facile" }
];

export const TONGUE_TWISTERS = [
  { fr: "Un chasseur sachant chasser doit savoir chasser sans son chien.", kr: "내가 그린 기린 그림은 잘 그린 기린 그림이고 네가 그린 기린 그림은 잘 못 그린 기린 그림이다." },
  { fr: "Trois petites trites truites cuites, trois petites trites truites crues.", kr: "간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다." },
  { fr: "Si six scies scient six cyprès, six cent six scies scient six cent six cyprès.", kr: "경찰청 철창살은 외철창살이고 검찰청 철창살은 쌍철창살이다." }
];

export const DANCE_CHOREOGRAPHIES_INIT: ChoreographyItem[] = [
  { id: "c1", title: "Hype Boy", artist: "NewJeans", difficulty: "Débutant", mastered: false, notes: "Focus sur la musicalité et les isolations d'épaule." },
  { id: "c2", title: "Love Dive", artist: "IVE", difficulty: "Débutant", mastered: false, notes: "Mouvements de bras élégants et synchronisation du regard." },
  { id: "c3", title: "Super Shy", artist: "NewJeans", difficulty: "Débutant", mastered: false, notes: "Waacking rapide et endurance cardio." },
  { id: "c4", title: "As If It's Your Last", artist: "BLACKPINK", difficulty: "Débutant", mastered: false, notes: "Attitude pop festive et énergie constante." },
  { id: "c5", title: "Fancy", artist: "TWICE", difficulty: "Débutant", mastered: false, notes: "Lignes de bras nettes et transitions de formation." },
  { id: "c6", title: "Antifragile", artist: "LE SSERAFIM", difficulty: "Intermédiaire", mastered: false, notes: "Gainage du buste, squats profonds et groove hip-hop." },
  { id: "c7", title: "Dynamite", artist: "BTS", difficulty: "Intermédiaire", mastered: false, notes: "Jeu de jambes disco et précision des arrêts (freeze)." },
  { id: "c8", title: "Wannabe", artist: "ITZY", difficulty: "Intermédiaire", mastered: false, notes: "L'isolation mythique des épaules de Ryujin !" },
  { id: "c9", title: "Maniac", artist: "Stray Kids", difficulty: "Intermédiaire", mastered: false, notes: "Mouvements saccadés et contrôle d'intensité." },
  { id: "c10", title: "S-Class", artist: "Stray Kids", difficulty: "Intermédiaire", mastered: false, notes: "Groove rapide et changement de niveaux." },
  { id: "c11", title: "Next Level", artist: "aespa", difficulty: "Intermédiaire", mastered: false, notes: "Le fameux plié de bras à 90° et l'attitude captivante." },
  { id: "c12", title: "Smart", artist: "LE SSERAFIM", difficulty: "Intermédiaire", mastered: false, notes: "Mouvements de hanches et fluidité afro-beat." },
  { id: "c13", title: "Psycho", artist: "Red Velvet", difficulty: "Intermédiaire", mastered: false, notes: "Sensualité fluide et gestuelle délicate." },
  { id: "c14", title: "Good Boy Gone Bad", artist: "TXT", difficulty: "Intermédiaire", mastered: false, notes: "Expressivité scénique et puissance des frappes." },
  { id: "c15", title: "Kick It", artist: "NCT 127", difficulty: "Avancé", mastered: false, notes: "Arts martiaux, coups de pied sautés et puissance extrême." },
  { id: "c16", title: "Guerrilla", artist: "ATEEZ", difficulty: "Avancé", mastered: false, notes: "Cardio explosif et headbanging contrôlé." },
  { id: "c17", title: "The Feels", artist: "TWICE", difficulty: "Intermédiaire", mastered: false, notes: "Jeu de jambes rapide et bonne humeur constante." },
  { id: "c18", title: "Fast Forward", artist: "SOMI", difficulty: "Avancé", mastered: false, notes: "Tecktonik, jeu de bras ultra-rapide et précision." },
  { id: "c19", title: "God's Menu", artist: "Stray Kids", difficulty: "Avancé", mastered: false, notes: "Chorégraphie 'Cuisinier' tranchante et charisme de groupe." },
  { id: "c20", title: "Super", artist: "SEVENTEEN", difficulty: "Avancé", mastered: false, notes: "Synchronisation de masse, rapidité et fluidité du corps." }
];

export const DANCE_WARMUP_STEPS = [
  { step: 1, title: "Nuque & Épaules", durationSec: 40, instruction: "Lents cercles de tête de gauche à droite, puis roulements d'épaules vers l'arrière pour délier les tensions." },
  { step: 2, title: "Buste & Isolations", durationSec: 40, instruction: "Isolez le haut du corps sans bouger les hanches : gauche, droite, avant, arrière, puis cercles fluides." },
  { step: 3, title: "Hanches & Bassin", durationSec: 40, instruction: "Grands cercles de bassin pour assouplir les lombaires et préparer les mouvements de groove." },
  { step: 4, title: "Jambes & Chevilles", durationSec: 40, instruction: "Flexions légères sur les genoux, rotations de chevilles pour sécuriser les réceptions de sauts." },
  { step: 5, title: "Cardio & Groove 8-temps", durationSec: 40, instruction: "Petits rebonds légers sur place en marquant les 8 temps avec les bras pour faire monter le cœur." },
  { step: 6, title: "Étirements doux actifs", durationSec: 40, instruction: "Fentes latérales douces pour adducteurs sans forcer de manière passive." }
];

export const SPORT_CIRCUIT_EXERCISES = [
  { name: "Jumping Jacks", workSec: 40, restSec: 15, desc: "Échauffe le cœur et travaille la coordination globale." },
  { name: "Gainage dynamique (Plank)", workSec: 40, restSec: 15, desc: "Renforce la ceinture abdominale indispensable à la stabilité du chant." },
  { name: "Squats sautés légers", workSec: 40, restSec: 15, desc: "Développe l'explosivité des cuisses pour les sauts de chorégraphie." },
  { name: "Mountain Climbers", workSec: 40, restSec: 15, desc: "Renforcement du centre du corps et endurance cardio." },
  { name: "Fentes alternées", workSec: 40, restSec: 15, desc: "Stabilité unilatérale et équilibre sur une leg." },
  { name: "Burpees doux (sans pompe)", workSec: 40, restSec: 15, desc: "Conditionnement physique complet pour simuler l'effort de scène." }
];

export const RAP_RHYME_DICTIONARY = [
  { soundFamily: "Son -I (Pari, Vie, Energie)", words: ["Vie", "Énergie", "Envie", "Scène", "Nuit", "Harmonie", "Galaxie", "Infinie", "Magie"] },
  { soundFamily: "Son -A (Eclat, Pas, Combat)", words: ["Eclat", "Combat", "Pas", "Haut", "Au-delà", "Cinéma", "Karma", "Rythme", "Aura"] },
  { soundFamily: "Son -OU (Fou, Bout, Coup)", words: ["Fou", "Bout", "Coup", "Debout", "Partout", "Rendez-vous", "Bijou", "Tabou"] },
  { soundFamily: "Son -ON (Vision, Champion, Passion)", words: ["Vision", "Passion", "Champion", "Horizons", "Création", "Ambition", "Illusion", "Sensations"] },
  { soundFamily: "Son -É (Réalité, Volonté, Briller)", words: ["Briller", "Volonté", "Vérité", "Sommet", "Destinée", "Éternité", "Propulsé", "Liberté"] }
];

export const RAP_FREESTYLE_WORDS = [
  "Rêve", "Spotlight", "Studio", "Micro", "Flow", "Impact", "Couronne", "Rhythm",
  "Trainee", "Début", "Étoile", "Flamme", "Effort", "Vitesse", "Rime", "Lumière", "Focus", "Vision"
];

export const KPOP_AGENCIES: Agency[] = [
  {
    id: "hybe",
    name: "HYBE Labels",
    koreanName: "하이브",
    description: "Geant mondial de l'industrie, connu pour son accent sur le storytelling visuel, l'innovation créative et les performances athlétiques.",
    knownFor: ["Performance physique intense", "Storytelling transmédia", "Polyvalence artistique"],
    auditionStyle: "Recherche de personnalités fortes avec un haut potentiel d'apprentissage et une forte présence scénique.",
    famousGroups: ["BTS", "SEVENTEEN", "TXT", "ENHYPEN", "LE SSERAFIM", "NewJeans", "BOYNEXTDOOR", "ILLIT"],
    logoBg: "bg-neutral-900 text-white"
  },
  {
    id: "sm",
    name: "SM Entertainment",
    koreanName: "SM 엔터테인먼트",
    description: "Pionnier historique de la K-Pop. Réputé pour sa précision vocale vocale exceptionnelle et sa complexité expérimentale.",
    knownFor: ["Technique vocale irréprochable", "Visuels classiques & futuristes", "Complexité des chorégraphies"],
    auditionStyle: "Accorde une priorité immense à la justesse vocale, à l'amplitude de voix et au charme visuel naturel.",
    famousGroups: ["EXO", "NCT", "aespa", "RIIZE", "Red Velvet", "SHINee", "Girls' Generation"],
    logoBg: "bg-pink-600 text-white"
  },
  {
    id: "jyp",
    name: "JYP Entertainment",
    koreanName: "JYP 엔터테인먼트",
    description: "Fondée par J.Y. Park. Accent mis sur la personnalité, l'éthique de travail irréprochable et les hymnes pop accrocheurs.",
    knownFor: ["Chorégraphies énergiques", "Infectieuse bonne humeur", "Éthique & humilité"],
    auditionStyle: "Recherche l'authenticité, un sourire naturel, le groove rythmique naturel et la gentillesse.",
    famousGroups: ["TWICE", "Stray Kids", "ITZY", "NMIXX", "NiziU", "DAY6", "2PM"],
    logoBg: "bg-blue-600 text-white"
  },
  {
    id: "yg",
    name: "YG Entertainment",
    koreanName: "YG 엔터테인먼트",
    description: "Empreinte hip-hop historique, charisme scénique imposant, confiance et attitude 'swag'.",
    knownFor: ["Hip-hop & Swag", "Capacité à composer/écrire", "Présence scénique dominante"],
    auditionStyle: "Cherche des profils avec un style unique, du flow rap, une grande aisance sur scène et de l'assurance.",
    famousGroups: ["BLACKPINK", "BABYMONSTER", "TREASURE", "BIGBANG", "2NE1", "WINNER"],
    logoBg: "bg-black text-amber-400 border border-amber-500/30"
  },
  {
    id: "starship",
    name: "Starship Entertainment",
    koreanName: "스타쉽",
    description: "Construit des groupes aux concepts élégants, vocaux solides et visuels accrocheurs.",
    knownFor: ["Hooks accrocheurs", "Concepts sophistiqués", "Synergie de groupe"],
    auditionStyle: "Évalue la polyvalence chant/danse et la capacité à incarner un concept haut de gamme.",
    famousGroups: ["IVE", "MONSTA X", "CRAVITY", "WJSN"],
    logoBg: "bg-purple-900 text-purple-200"
  },
  {
    id: "cube",
    name: "Cube Entertainment",
    koreanName: "큐브",
    description: "Connue pour encourager les artistes producteurs et l'écriture de leurs propres titres.",
    knownFor: ["Autonomie artistique", "Vocaux puissants", "Idoles compositrices"],
    auditionStyle: "Recherche des profils créatifs capables de chanter avec émotion et de composer.",
    famousGroups: ["(G)I-DLE", "NOWADAYS", "PENTAGON", "BTOB"],
    logoBg: "bg-cyan-800 text-cyan-100"
  },
  {
    id: "pledis",
    name: "Pledis Entertainment",
    koreanName: "플레디스",
    description: "Spécialiste des chorégraphies parfaitement synchronisées à la seconde près.",
    knownFor: ["Synchronisation légendaire", "Harmonies de groupe", "Énergie débordante"],
    auditionStyle: "Accorde une attention extrême au sens du rythme et à la rigueur d'entraînement.",
    famousGroups: ["SEVENTEEN", "TWS", "NU'EST", "AFTER SCHOOL"],
    logoBg: "bg-rose-800 text-rose-100"
  },
  {
    id: "ador",
    name: "ADOR",
    koreanName: "어도어",
    description: "Filiale novatrice axée sur l'esthétique r'n'b rétro-futuriste, la spontanéité et le naturel.",
    knownFor: ["Esthétique Y2K / R&B", "Mouvements fluides & légers", "Charme naturel"],
    auditionStyle: "Cherche la fraîcheur, l'absence d'artifices excessifs et la sensibilité artistique naturelle.",
    famousGroups: ["NewJeans"],
    logoBg: "bg-indigo-900 text-indigo-100"
  },
  {
    id: "fnc",
    name: "FNC Entertainment",
    koreanName: "FNC 엔터테인먼트",
    description: "Spécialisée à la fois dans les groupes de dance-pop et les groupes d'idoles musiciens/rock.",
    knownFor: ["Polyvalence instrumentale", "Vocaux de poitrine", "Charisme de scène"],
    auditionStyle: "Évalue l'aisance vocale et éventuellement le jeu d'instrument ou la puissance de scène.",
    famousGroups: ["SF9", "P1Harmony", "AMPERS&ONE", "FTISLAND", "CNBLUE", "AOA"],
    logoBg: "bg-red-800 text-red-100"
  }
];

export const PRE_AUDITION_CHECKLIST = [
  { id: "chk1", label: "Préparer 1 morceau de chant (1 min 30 s) sans instru trop chargée (a cappella ou instru claire)", completed: false },
  { id: "chk2", label: "Préparer 1 chorégraphie marquante (1 min) démontrant votre meilleur style de danse", completed: false },
  { id: "chk3", label: "Préparer une brève présentation d'introduction naturelle en coréen et/ou anglais", completed: false },
  { id: "chk4", label: "Tenue propre, simple et ajustée (pas de vêtements trop amples qui cachent la posture)", completed: false },
  { id: "chk5", label: "Visage dégagé (cheveux attachés ou bien rangés) pour laisser voir les expressions", completed: false },
  { id: "chk6", label: "Bouteille d'eau et serviette prêtes pour garder de l'énergie", completed: false },
  { id: "chk7", label: "Chauffe vocale et échauffement corporel réalisés 30 minutes avant l'audition", completed: false }
];
