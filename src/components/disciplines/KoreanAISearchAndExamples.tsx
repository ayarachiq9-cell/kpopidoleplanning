import React, { useState, useMemo } from "react";
import { Search, Volume2, Sparkles, BookOpen, MessageSquare, Play, Pause, RefreshCw, Zap, CheckCircle2, Heart } from "lucide-react";
import { soundEngine } from "../../utils/audio";

export interface KPopVocabItem {
  id: string;
  korean: string;
  romaja: string;
  french: string;
  category: "Scène & Performance" | "Agences & Auditions" | "Fandom & Vocabulaire Idol" | "Répétitions & Quotidien";
  exampleKorean: string;
  exampleRomaja: string;
  exampleFrench: string;
  agencyContext: string;
}

const EXTENSIVE_KPOP_DATABASE: KPopVocabItem[] = [
  {
    id: "v1",
    korean: "데뷔 (Debut)",
    romaja: "Debu",
    french: "Début officiel de l'artiste ou du groupe sur scène",
    category: "Agences & Auditions",
    exampleKorean: "저는 내년에 반드시 데뷔할 수 있도록 매일 8시간씩 연습해요.",
    exampleRomaja: "Jeoneun naenyeone bandeusi debuihal su issdoroek maeil 8siganssik yeonseubhaeyo.",
    exampleFrench: "Je m'entraîne 8 heures par jour pour être certain(e) de débuter l'année prochaine.",
    agencyContext: "Utilisé lors des évaluations mensuelles pour affirmer sa détermination devant les juges."
  },
  {
    id: "v2",
    korean: "엔딩 요정 (Ending Fairy)",
    romaja: "Ending Yojeong",
    french: "La pose expressive captée en gros plan par la caméra à la toute fin d'une performance",
    category: "Scène & Performance",
    exampleKorean: "오늘 무대의 엔딩 요정 카메라 아이컨택을 완벽하게 성공했어요!",
    exampleRomaja: "Oneul mudaeui ending yojeong kamera aikeontaeg-eul wanbyeokhage seonggonghaess-eoyo!",
    exampleFrench: "J'ai réussi à la perfection le contact visuel caméra pour l'ending fairy de la scène d'aujourd'hui !",
    agencyContext: "Éléments clés de charisme évalués pour captiver le public à la fin du refrain."
  },
  {
    id: "v3",
    korean: "연습생 (Trainee)",
    romaja: "Yeonseubsaeng",
    french: "Aspirant idole en formation dans une agence de divertissement",
    category: "Agences & Auditions",
    exampleKorean: "저는 HYBE의 연습생으로서 보컬과 댄스 수업을 열심히 듣고 있습니다.",
    exampleRomaja: "Jeoneun HYBEui yeonseubsaeng-euroseo bokeol-gwa daenseu sueob-eul yeolsimhi deudgo isseumnida.",
    exampleFrench: "En tant que trainee chez HYBE, je suis assidûment les cours de chant et de danse.",
    agencyContext: "Présentation de soi officielle lors des auditions d'agences à Seoul."
  },
  {
    id: "v4",
    korean: "월말 평가 (Monthly Evaluation)",
    romaja: "Wolmal Pyeongga",
    french: "Évaluation mensuelle décisive devant les directeurs artistiques",
    category: "Agences & Auditions",
    exampleKorean: "다음 주 월말 평가를 위해 새로운 창작 안무를 준비하고 있어요.",
    exampleRomaja: "Daeum ju wolmal pyeonggareul wihae saerowon changjak anmureul junbihago isseoyo.",
    exampleFrench: "Je prépare une nouvelle chorégraphie originale pour l'évaluation mensuelle de la semaine prochaine.",
    agencyContext: "Moments cruciaux pour valider le maintien dans le groupe d'entraînement."
  },
  {
    id: "v5",
    korean: "칼군무 (Knife Dance)",
    romaja: "Kalgunmu",
    french: "Chorégraphie synchronisée à la milliseconde près avec des angles d'bras identiques",
    category: "Scène & Performance",
    exampleKorean: "우리 그룹은 완벽한 칼군무를 맞추기 위해 거울을 보며 반복 연습해요.",
    exampleRomaja: "Uri geureub-eun wanbyeokhan kalgunmureul matchugi wihae geowul-eul bomyeo banbok yeonseubhaeyo.",
    exampleFrench: "Notre groupe s'entraîne en boucle devant le miroir pour synchroniser parfaitement la knife dance.",
    agencyContext: "Marque de fabrique des meilleures performances K-Pop sur scène."
  },
  {
    id: "v6",
    korean: "덕후 / 입덕 (Deokhu / Ibdeok)",
    romaja: "Deokhu / Ibdeok",
    french: "Devenir passionné / Le moment exact où un fan tombe amoureux d'un membre",
    category: "Fandom & Vocabulaire Idol",
    exampleKorean: "그 멤버의 보컬 음색을 듣자마자 바로 입덕했어요.",
    exampleRomaja: "Geu membeoui bokeol eumsaeg-eul deutjamaja baro ibdeokhaess-eoyo.",
    exampleFrench: "Dès que j'ai entendu le timbre de voix de ce membre, je suis immédiatement devenu fan.",
    agencyContext: "Facteur d'attraction 'Point de Charisme' (Mude-chwae)."
  },
  {
    id: "v7",
    korean: "화이팅 / 파이팅 (Fighting!)",
    romaja: "Hwaiting / Paiting",
    french: "Encouragement coréen incontournable : 'Donne le meilleur de toi-même !'",
    category: "Répétitions & Quotidien",
    exampleKorean: "오늘 무대 올라가기 전에 다 함께 '화이팅'을 외쳤습니다!",
    exampleRomaja: "Oneul mudae ollagagi jeone da hamkke 'hwaiting'-eul oechyeossseumnida!",
    exampleFrench: "Avant de monter sur scène aujourd'hui, nous avons tous crié 'Fighting' ensemble !",
    agencyContext: "Cris de ralliement en coulisses avant d'entrer en scène."
  },
  {
    id: "v8",
    korean: "음색 요정 (Vocal Tone Fairy)",
    romaja: "Eumsaek Yojeong",
    french: "Chanteur/Chanteuse possédant un timbre de voix unique et envoûtant",
    category: "Scène & Performance",
    exampleKorean: "선생님께서 제 음색이 독특하다며 음색 요정이라는 칭찬을 해주셨어요.",
    exampleRomaja: "Seonsaengnimkkeoseo je eumsaeg-i dokteukhadamyeo eumsaek yojeong-iraneun chingchan-eul haejusyeoss-eoyo.",
    exampleFrench: "Le professeur m'a complimenté sur mon timbre unique en me qualifiant de féerie vocale.",
    agencyContext: "Valorisation de l'identité vocale lors des cours de chant."
  },
  {
    id: "v9",
    korean: "센터 (Center)",
    romaja: "Senteo",
    french: "Position centrale stratégique occupée sur scène lors des refrains",
    category: "Scène & Performance",
    exampleKorean: "이번 킬링파트에서 제가 센터에 서서 댄스 솔로를 선보입니다.",
    exampleRomaja: "Ibeon killingpateueseo jega senteoe seoseo daenseu solloreul seonboimnida.",
    exampleFrench: "Pendant la killing part de cette chanson, je suis au centre pour le solo de danse.",
    agencyContext: "Attribution des positions clés dans la répartition des lignes et formations."
  },
  {
    id: "v10",
    korean: "비주얼 (Visual)",
    romaja: "Bijueol",
    french: "Prestance physique, élégance et charme photogénique capté par l'objectif",
    category: "Agences & Auditions",
    exampleKorean: "카메라 테스트에서 자연스러운 비주얼과 미소를 보여주는 것이 중요해요.",
    exampleRomaja: "Kamera teseteueseo jayeonseureowon bijueolgwa misoreul boyeojuneun geos-i jungyohaeyo.",
    exampleFrench: "Il est important de montrer un visual naturel et un sourire chaleureux lors du test caméra.",
    agencyContext: "Critère fondamental lors des tests d'expression et de maquillage photo."
  },
  {
    id: "v11",
    korean: "컴백 (Comeback)",
    romaja: "Keombaek",
    french: "Lancement d'un nouvel album avec de nouveaux concepts visuels et chorégraphiques",
    category: "Scène & Performance",
    exampleKorean: "이번 컴백 컨셉은 강력한 다크 걸크러시 분위기입니다.",
    exampleRomaja: "Ibeon keombaek keonsebeun gangryeokhan dakeu geolkeureosi bunwigiimnida.",
    exampleFrench: "Le concept de ce comeback est une ambiance Girl Crush sombre et puissante.",
    agencyContext: "Cycle de préparation intensive de 3 mois avant les promotions télévisées."
  },
  {
    id: "v12",
    korean: "체력 관리 (Stamina / Health Management)",
    romaja: "Cheryeok Gwanri",
    french: "Gestion de l'endurance physique et respiratoire pour chanter en dansant",
    category: "Répétitions & Quotidien",
    exampleKorean: "라이브 보컬을 유지하면서 춤추기 위해 체력 관리를 꾸준히 하고 있어요.",
    exampleRomaja: "Labeu bokeol-eul yujihamyeonseo chumchugi wihae cheryeok gwanrireul kkeojunhi hago isseoyo.",
    exampleFrench: "Je travaille constamment mon endurance pour maintenir un chant live stable tout en dansant.",
    agencyContext: "Entraînement cardio hebdomadaire recommandé par les préparateurs physiques de Seoul."
  }
];

export const KoreanAISearchAndExamples: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  // Custom AI Generator State
  const [customKeyword, setCustomKeyword] = useState("");
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customGeneratedPhrase, setCustomGeneratedPhrase] = useState<{
    korean: string;
    romaja: string;
    french: string;
    agencyNote: string;
  } | null>(null);

  const categories = ["Tous", "Scène & Performance", "Agences & Auditions", "Fandom & Vocabulaire Idol", "Répétitions & Quotidien"];

  // Real-time filtering
  const filteredDatabase = useMemo(() => {
    return EXTENSIVE_KPOP_DATABASE.filter((item) => {
      const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      return (
        matchesCategory &&
        (item.korean.toLowerCase().includes(q) ||
          item.romaja.toLowerCase().includes(q) ||
          item.french.toLowerCase().includes(q) ||
          item.exampleKorean.toLowerCase().includes(q) ||
          item.exampleFrench.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleSpeak = (id: string, koreanText: string) => {
    setCurrentlySpeakingId(id);
    soundEngine.speakKorean(koreanText);
    setTimeout(() => setCurrentlySpeakingId(null), 3000);
  };

  // Simulate Instant AI Sentence Builder for Any Custom Term
  const generateCustomAISentence = () => {
    if (!customKeyword.trim()) return;
    setIsGeneratingCustom(true);
    setCustomGeneratedPhrase(null);

    setTimeout(() => {
      const term = customKeyword.trim();
      setIsGeneratingCustom(false);

      // Create a contextual K-Pop sentence dynamically
      setCustomGeneratedPhrase({
        korean: `저는 오늘 연습실에서 '${term}' 관련 표현을 집중적으로 연습하며 보컬과 춤의 디테일을 다듬었습니다.`,
        romaja: `Jeoneun oneul yeonseubsil-eseo '${term}' gwanryeon pyeohyeon-eul jipjungjeog-euro yeonseubhamyeo bokeol-gwa chum-ui diteil-eul dadadeum-eosseumnida.`,
        french: `Aujourd'hui dans la salle de répétition, j'ai travaillé intensivement l'expression liée à '${term}' pour peaufiner les détails du chant et de la danse.`,
        agencyNote: `Phrase générée par l'IA K-Mentor : Idéale pour rédiger votre journal de trainee ou répondre aux questions du directeur casting lors des bilans.`
      });
      soundEngine.playSuccess();
    }, 800);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg">
              Recherche en Temps Réel & Générateur de Phrases K-Pop IA
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Tapez n'importe quel mot du vocabulaire K-Pop ou artistique pour obtenir des exemples de phrases contextualisés avec prononciation vocale.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          <span>Synthèse Vocale Coréenne Intégrée</span>
        </span>
      </div>

      {/* Main Search Input & Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un terme (ex: debut, ending fairy, center, trainee,월말 평가, fighting)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs"
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

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Instant AI Custom Sentence Generator Input Box */}
      <div className="p-4 bg-gradient-to-r from-red-950 via-slate-900 to-purple-950 rounded-2xl border border-red-500/30 text-white space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-400" />
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-red-200">
            Générateur IA de Phrases Personnalisées sur Mesure
          </h4>
        </div>
        <p className="text-xs text-slate-300">
          Entrez un mot-clé spécifique (ex: "High Note", "Chorégraphie", "Camera Eye Contact", "Audition", "Seoul") et l'IA formulera une phrase d'entraînement coréenne complète :
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="Exemple: High Note, Center, Aegyo, Visual..."
            onKeyDown={(e) => e.key === "Enter" && generateCustomAISentence()}
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={generateCustomAISentence}
            disabled={isGeneratingCustom || !customKeyword.trim()}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
          >
            {isGeneratingCustom ? (
              <RefreshCw className="w-4 h-4 animate-spin text-red-200" />
            ) : (
              <Zap className="w-4 h-4 fill-current" />
            )}
            <span>Générer</span>
          </button>
        </div>

        {/* Custom Result Display */}
        {customGeneratedPhrase && (
          <div className="mt-3 p-4 bg-slate-950/90 border border-red-500/40 rounded-xl space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
                ✨ Phrase Coréenne Générée :
              </span>
              <button
                onClick={() => handleSpeak("custom_ai", customGeneratedPhrase.korean)}
                className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Écouter la Prononciation</span>
              </button>
            </div>
            <p className="text-base font-extrabold text-white">{customGeneratedPhrase.korean}</p>
            <p className="text-xs font-mono text-red-300">{customGeneratedPhrase.romaja}</p>
            <p className="text-xs text-slate-300">{customGeneratedPhrase.french}</p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
              💡 {customGeneratedPhrase.agencyNote}
            </div>
          </div>
        )}
      </div>

      {/* Filtered Vocabulary & Example Sentences Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Exemples de Vocabulaire & Phrases ({filteredDatabase.length} trouvés) :
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDatabase.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-50 border border-slate-200 hover:border-red-300 rounded-2xl space-y-3 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                      {item.category}
                    </span>
                    <h5 className="text-base font-black text-slate-900 mt-1">{item.korean}</h5>
                    <span className="text-xs font-bold text-red-600 font-mono block">{item.romaja}</span>
                  </div>

                  <button
                    onClick={() => handleSpeak(item.id, item.exampleKorean)}
                    className="p-2.5 rounded-xl bg-white hover:bg-red-50 border border-slate-200 text-red-600 hover:text-red-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                    title="Écouter la phrase d'exemple"
                  >
                    <Volume2 className={`w-4 h-4 ${currentlySpeakingId === item.id ? "animate-bounce text-red-600" : ""}`} />
                    <span className="hidden sm:inline">Écouter</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2 font-medium">
                  {item.french}
                </p>

                {/* Example Sentence Box */}
                <div className="mt-3 p-3 bg-white border border-slate-200/90 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">
                    Exemple de Phrase en Contexte :
                  </span>
                  <p className="text-xs font-extrabold text-slate-900 leading-snug">{item.exampleKorean}</p>
                  <p className="text-[11px] font-mono text-red-700 font-medium">{item.exampleRomaja}</p>
                  <p className="text-[11px] text-slate-600 italic pt-0.5">{item.exampleFrench}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-red-500 shrink-0" />
                <span className="truncate">{item.agencyContext}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredDatabase.length === 0 && (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">
              Aucun résultat pour "{searchQuery}"
            </p>
            <p className="text-xs text-slate-500">
              Utilisez le générateur IA ci-dessus pour construire automatiquement une phrase sur mesure avec ce mot !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
