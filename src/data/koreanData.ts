export interface HangeulChar {
  char: string;
  name: string;
  romaja: string;
  sound: string;
  type: "consonant_basic" | "consonant_double" | "vowel_basic" | "vowel_compound";
}

export const CONSONANTS: HangeulChar[] = [
  // 14 basic consonants
  { char: "ㄱ", name: "Giyeok", romaja: "g / k", sound: "k/g", type: "consonant_basic" },
  { char: "ㄴ", name: "Nieun", romaja: "n", sound: "n", type: "consonant_basic" },
  { char: "ㄷ", name: "Digeut", romaja: "d / t", sound: "d/t", type: "consonant_basic" },
  { char: "ㄹ", name: "Rieul", romaja: "r / l", sound: "r/l", type: "consonant_basic" },
  { char: "ㅁ", name: "Mieum", romaja: "m", sound: "m", type: "consonant_basic" },
  { char: "ㅂ", name: "Bieup", romaja: "b / p", sound: "b/p", type: "consonant_basic" },
  { char: "ㅅ", name: "Siot", romaja: "s", sound: "s", type: "consonant_basic" },
  { char: "ㅇ", name: "Ieung", romaja: "ng / muet", sound: "ng", type: "consonant_basic" },
  { char: "ㅈ", name: "Jieut", romaja: "j / ch", sound: "dj/tch", type: "consonant_basic" },
  { char: "ㅊ", name: "Chieut", romaja: "ch", sound: "tch (expiré)", type: "consonant_basic" },
  { char: "ㅋ", name: "Kieuk", romaja: "k", sound: "k (expiré)", type: "consonant_basic" },
  { char: "ㅌ", name: "Tieut", romaja: "t", sound: "t (expiré)", type: "consonant_basic" },
  { char: "ㅍ", name: "Pieup", romaja: "p", sound: "p (expiré)", type: "consonant_basic" },
  { char: "ㅎ", name: "Hieut", romaja: "h", sound: "h (aspiré)", type: "consonant_basic" },
  // 5 double consonants (14 + 5 = 19)
  { char: "ㄲ", name: "Ssang-giyeok", romaja: "kk", sound: "k ferme", type: "consonant_double" },
  { char: "ㄸ", name: "Ssang-digeut", romaja: "tt", sound: "t ferme", type: "consonant_double" },
  { char: "ㅃ", name: "Ssang-bieup", romaja: "pp", sound: "p ferme", type: "consonant_double" },
  { char: "싸", name: "Ssang-siot", romaja: "ss", sound: "s ferme", type: "consonant_double" },
  { char: "ㅉ", name: "Ssang-jieut", romaja: "jj", sound: "dj ferme", type: "consonant_double" },
];

export const VOWELS: HangeulChar[] = [
  // 10 basic vowels
  { char: "ㅏ", name: "A", romaja: "a", sound: "a", type: "vowel_basic" },
  { char: "ㅑ", name: "Ya", romaja: "ya", sound: "ya", type: "vowel_basic" },
  { char: "ㅓ", name: "Eo", romaja: "eo", sound: "o ouvert (comme dans 'bol')", type: "vowel_basic" },
  { char: "ㅕ", name: "Yeo", romaja: "yeo", sound: "yo ouvert", type: "vowel_basic" },
  { char: "ㅗ", name: "O", romaja: "o", sound: "o fermé (comme dans 'eau')", type: "vowel_basic" },
  { char: "ㅛ", name: "Yo", romaja: "yo", sound: "yo", type: "vowel_basic" },
  { char: "ㅜ", name: "U", romaja: "u", sound: "ou", type: "vowel_basic" },
  { char: "ㅠ", name: "Yu", romaja: "yu", sound: "you", type: "vowel_basic" },
  { char: "ㅡ", name: "Eu", romaja: "eu", sound: "eu (dents serrées)", type: "vowel_basic" },
  { char: "ㅣ", name: "I", romaja: "i", sound: "i", type: "vowel_basic" },
  // 11 compound vowels (10 + 11 = 21)
  { char: "ㅐ", name: "Ae", romaja: "ae", sound: "è", type: "vowel_compound" },
  { char: "ㅒ", name: "Yae", romaja: "yae", sound: "yè", type: "vowel_compound" },
  { char: "ㅔ", name: "E", romaja: "e", sound: "é", type: "vowel_compound" },
  { char: "ㅖ", name: "Ye", romaja: "ye", sound: "yé", type: "vowel_compound" },
  { char: "ㅘ", name: "Wa", romaja: "wa", sound: "oua", type: "vowel_compound" },
  { char: "ㅙ", name: "Wae", romaja: "wae", sound: "ouè", type: "vowel_compound" },
  { char: "ㅚ", name: "Oe", romaja: "oe", sound: "oé", type: "vowel_compound" },
  { char: "ㅝ", name: "Wo", romaja: "wo", sound: "ouo", type: "vowel_compound" },
  { char: "ㅞ", name: "We", romaja: "we", sound: "oué", type: "vowel_compound" },
  { char: "ㅟ", name: "Wi", romaja: "wi", sound: "oui", type: "vowel_compound" },
  { char: "ㅢ", name: "Ui", romaja: "ui", sound: "eui", type: "vowel_compound" },
];

export interface NumberSystemItem {
  number: number;
  sinoKorean: string;
  sinoRomaja: string;
  nativeKorean: string;
  nativeRomaja: string;
  sinoUsage: string;
  nativeUsage: string;
}

export const NUMBERS_DATA: NumberSystemItem[] = [
  { number: 1, sinoKorean: "일", sinoRomaja: "Il", nativeKorean: "하나", nativeRomaja: "Hana", sinoUsage: "Minutes, argent, numéros de téléphone", nativeUsage: "Compter les personnes, heures, objets" },
  { number: 2, sinoKorean: "이", sinoRomaja: "I", nativeKorean: "둘", nativeRomaja: "Dul", sinoUsage: "Dates, numéros d'étage", nativeUsage: "Compter le nombre de personnes/éléments" },
  { number: 3, sinoKorean: "삼", sinoRomaja: "Sam", nativeKorean: "셋", nativeRomaja: "Set", sinoUsage: "Mois (3월), mesures", nativeUsage: "Décompte dans la danse (1,2,3,4)" },
  { number: 4, sinoKorean: "사", sinoRomaja: "Sa", nativeKorean: "넷", nativeRomaja: "Net", sinoUsage: "Prix, numéros de bus", nativeUsage: "Compte des mouvements de danse" },
  { number: 5, sinoKorean: "오", sinoRomaja: "O", nativeKorean: "다섯", nativeRomaja: "Daseot", sinoUsage: "Minutes (5분)", nativeUsage: "Âge, objets" },
  { number: 6, sinoKorean: "육", sinoRomaja: "Yuk", nativeKorean: "여섯", nativeRomaja: "Yeoseot", sinoUsage: "Numérotation", nativeUsage: "Compter répétitions d'exercices" },
  { number: 7, sinoKorean: "칠", sinoRomaja: "Chil", nativeKorean: "일곱", nativeRomaja: "Ilgop", sinoUsage: "Jours de calendrier", nativeUsage: "Compter personnes" },
  { number: 8, sinoKorean: "팔", sinoRomaja: "Pal", nativeKorean: "여덟", nativeRomaja: "Yeodeol", sinoUsage: "Mois d'août (8월)", nativeUsage: "Les 8 temps du décompte de danse ! (Hana, Dul, Set, Net...)" },
  { number: 9, sinoKorean: "구", sinoRomaja: "Gu", nativeKorean: "아홉", nativeRomaja: "Ahop", sinoUsage: "Numéros", nativeUsage: "Séries d'exercices" },
  { number: 10, sinoKorean: "십", sinoRomaja: "Sip", nativeKorean: "열", nativeRomaja: "Yeol", sinoUsage: "Dizaines, prix", nativeUsage: "Heures (열 시)" },
];

export interface EssentialPhrase {
  id: string;
  korean: string;
  romaja: string;
  translation: string;
  category: "Salutation" | "Audition" | "Entraînement" | "Politesse";
}

export const ESSENTIAL_PHRASES: EssentialPhrase[] = [
  { id: "p1", korean: "안녕하세요!", romaja: "Annyeonghaseyo!", translation: "Bonjour ! (formel, indispensable en audition)", category: "Salutation" },
  { id: "p2", korean: "잘 부탁드립니다!", romaja: "Jal 부탁deurimnida!", translation: "S'il vous plaît, prenez soin de moi / Je ferai de mon mieux !", category: "Audition" },
  { id: "p3", korean: "감사합니다!", romaja: "Gamsahamnida!", translation: "Merci beaucoup !", category: "Politesse" },
  { id: "p4", korean: "저는 [Nom]입니다.", romaja: "Jeoneun [Nom]-imnida.", translation: "Je m'appelle [Nom].", category: "Audition" },
  { id: "p5", korean: "다시 한번 해주세요.", romaja: "Dasi hanbeon haejuseyo.", translation: "Pourriez-vous refaire une fois s'il vous plaît ?", category: "Entraînement" },
  { id: "p6", korean: "연습 시작합시다!", romaja: "Yeonseup sijakhapsida!", translation: "Commençons l'entraînement !", category: "Entraînement" },
  { id: "p7", korean: "수고하셨습니다!", romaja: "Sugohasyeosseumnida!", translation: "Beau travail à tous / Merci pour vos efforts !", category: "Politesse" },
  { id: "p8", korean: "화이팅 / 파이팅!", romaja: "Hwaiting / Paiting!", translation: "Courage ! / Fighting !", category: "Entraînement" },
];

export interface ParticleItem {
  particle: string;
  name: string;
  usage: string;
  exampleKorean: string;
  exampleTranslation: string;
}

export const GRAMMAR_PARTICLES: ParticleItem[] = [
  { particle: "은 / 는", name: "Particule de Thème", usage: "Indique le sujet principal / thème dont on parle. '은' après consonne, '는' après voyelle.", exampleKorean: "저는 연습생입니다.", exampleTranslation: "Quant à moi, je suis trainee." },
  { particle: "이 / 가", name: "Particule de Sujet", usage: "Met l'accent sur le sujet qui accomplit l'action. '이' après consonne, '가' après voyelle.", exampleKorean: "음악이 좋아요.", exampleTranslation: "C'est la musique qui est bonne." },
  { particle: "을 / 를", name: "Particule de COD", usage: "Marque le complément d'objet direct (ce que l'on fait). '을' après consonne, '를' après voyelle.", exampleKorean: "춤을 춰요.", exampleTranslation: "Je danse une danse." },
  { particle: "에 / 에서", name: "Particule de Lieu/Temps", usage: "'에' indique la destination ou le temps. '에서' indique le lieu où se déroule une action.", exampleKorean: "연습실에서 연습해요.", exampleTranslation: "S'entraîner DANS la salle d'entraînement." },
];

export interface VocabItem {
  korean: string;
  romaja: string;
  french: string;
  category: string;
}

export const ARTISTIC_VOCABULARY: VocabItem[] = [
  { korean: "연습생", romaja: "Yeonseupsaeng", french: "Strainee / Élève stagiaire en agence", category: "Statut" },
  { korean: "데뷔", romaja: "Debwi", french: "Débuts officiels sur scène", category: "Carrière" },
  { korean: "안무", romaja: "Anmu", french: "Chorégraphie", category: "Danse" },
  { korean: "보컬", romaja: "Bokeol", french: "Vocal / Chant", category: "Chant" },
  { korean: "래퍼", romaja: "Raepeo", french: "Rappeur / Rappeuse", category: "Rap" },
  { korean: "무대", romaja: "Mudae", french: "Scène de spectacle", category: "Performance" },
  { korean: "기획사", romaja: "Gihoeksa", french: "Agence de divertissement / Label", category: "Industrie" },
  { korean: "오디션", romaja: "Odiseyon", french: "Audition de sélection", category: "Audition" },
  { korean: "컨셉", romaja: "Keonsep", french: "Concept visuel & musical de groupe", category: "Performance" },
  { korean: "센터", romaja: "Senteo", french: "Position centrale dans la formation de danse", category: "Danse" },
  { korean: "리더", romaja: "Rideeo", french: "Leader de groupe", category: "Rôle" },
  { korean: "막내", romaja: "Maknae", french: "Le/la plus jeune membre du groupe", category: "Rôle" },
];

export const DAYS_OF_WEEK = [
  { day: "Lundi", korean: "월요일", romaja: "Wol-yo-il", element: "Lune 🌙" },
  { day: "Mardi", korean: "화요일", romaja: "Hwa-yo-il", element: "Feu 🔥" },
  { day: "Mercredi", korean: "수요일", romaja: "Su-yo-il", element: "Eau 💧" },
  { day: "Jeudi", korean: "목요일", romaja: "Mok-yo-il", element: "Bois 🌲" },
  { day: "Vendredi", korean: "금요일", romaja: "Geum-yo-il", element: "Métal / Or 🪙" },
  { day: "Samedi", korean: "토요일", romaja: "To-yo-il", element: "Terre 🌍" },
  { day: "Dimanche", korean: "일요일", romaja: "Il-yo-il", element: "Soleil ☀️" },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  audioText?: string;
}

export const QUIZ_HANGEUL: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle est la voyelle Hangeul correspondant au son 'A' ?",
    options: ["ㅏ", "ㅓ", "ㅗ", "ㅜ"],
    correctIndex: 0,
    explanation: "ㅏ se prononce 'A' (comme dans 'arbre').",
    audioText: "아",
  },
  {
    id: 2,
    question: "Comment se prononce la consonne 'ㄱ' ?",
    options: ["n", "m", "g / k", "s"],
    correctIndex: 2,
    explanation: "ㄱ (Giyeok) se prononce entre G et K selon sa position.",
    audioText: "가",
  },
  {
    id: 3,
    question: "Combien de consonnes au total compte l'alphabet Hangeul (de base + doubles) ?",
    options: ["14", "19", "21", "24"],
    correctIndex: 1,
    explanation: "L'alphabet compte 19 consonnes (14 simples + 5 doubles).",
  },
  {
    id: 4,
    question: "Que signifie le nombre '여덟' (Yeodeol) dans le système natif coréen ?",
    options: ["6", "7", "8", "10"],
    correctIndex: 2,
    explanation: "Yeodeol signifie 8. C'est le fameux 8ème temps du décompte de danse !",
    audioText: "여덟",
  },
];

export const QUIZ_PHRASES: QuizQuestion[] = [
  {
    id: 1,
    question: "Que signifie la formule indispensable '잘 부탁드립니다!' (Jal 부탁deurimnida) ?",
    options: [
      "Au revoir et à bientôt !",
      "Je ferai de mon mieux / Prenez soin de moi !",
      "Où se trouve la salle d'entraînement ?",
      "Puis-je boire de l'eau ?",
    ],
    correctIndex: 1,
    explanation: "C'est la phrase clé prononcée au début d'une audition pour montrer son enthousiasme et sa politesse.",
    audioText: "잘 부탁드립니다",
  },
  {
    id: 2,
    question: "Quelle particule marque le complément d'objet direct (ex: danser une danse) ?",
    options: ["은 / 는", "이 / 가", "을 / 를", "에서"],
    correctIndex: 2,
    explanation: "을 (après consonne) et 를 (après voyelle) sont les particules d'objet direct.",
  },
  {
    id: 3,
    question: "Comment dit-on 'Strainee / Stagiaire en agence' en coréen ?",
    options: ["데뷔 (Debwi)", "연습생 (Yeonseupsaeng)", "안무 (Anmu)", "막내 (Maknae)"],
    correctIndex: 1,
    explanation: "연습생 (Yeonseupsaeng) désigne un élève trainee sous contrat de formation.",
    audioText: "연습생",
  },
  {
    id: 4,
    question: "Quel jour de la semaine correspond à '금요일' (Geum-yo-il) ?",
    options: ["Mercredi", "Jeudi", "Vendredi", "Samedi"],
    correctIndex: 2,
    explanation: "Geum-yo-il signifie Vendredi (associé au métal/or 🪙).",
    audioText: "금요일",
  },
];
