import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Initialize Gemini client lazily or safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY non configurée.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Parle-moi / AI Chat mentor endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, image, history = [] } = req.body;
    if (!prompt && !image) {
      return res.status(400).json({ error: "Un message ou une image est requis." });
    }

    const ai = getGeminiClient();
    const systemInstruction = `Tu es "K-Mentor", un assistant et coach bienveillant, inspirant et expert de l'industrie K-Pop. 
Ta mission est d'accompagner un futur trainee (artiste) dans son parcours d'entraînement : chant, danse, rap, condition physique, soin de soi, nutrition saine et santé mentale.
Consignes clés :
- Sois toujours encourageant, chaleureux, constructif et positif.
- Ne porte JAMAIS de jugement sur le corps, le poids ou le physique. Donne des conseils axés sur le style, la présence scénique, le confort et la confiance en soi.
- Réponds en français fluide avec une touche inspirante (utilise parfois des expressions K-Pop bienveillantes comme "Fighting ! ✊", "Hwayaing !").
- Si l'utilisateur envoie une photo (tenue, chevelure, aliment, exercice), donne-lui un retour utile, constructif et positif.`;

    const contents: Array<any> = [];

    // Add chat history if present
    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.role && item.parts) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: item.parts,
          });
        }
      }
    }

    const currentParts: Array<any> = [];
    if (image && typeof image === "string") {
      const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      currentParts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    if (prompt) {
      currentParts.push({ text: prompt });
    }

    contents.push({
      role: "user",
      parts: currentParts,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "Pardon, je n'ai pas pu générer de réponse." });
  } catch (error: any) {
    console.error("Erreur API Chat Gemini:", error);
    res.status(500).json({ error: error?.message || "Erreur lors de la communication avec l'assistant." });
  }
});

// Multimodal Analysis endpoint for Scanner (Skin, Hair, Outfit, Food, Performance Video/Audio review)
app.post("/api/analyze-multimodal", async (req, res) => {
  try {
    const { type, image, mediaNote } = req.body;
    const ai = getGeminiClient();

    let systemInstruction = "Tu es un spécialiste bienveillant de l'industrie artistique K-Pop.";
    let promptText = "";

    switch (type) {
      case "hair":
        systemInstruction = "Tu es un styliste capillaire K-Pop professionnel.";
        promptText = `Analyse cette image pour donner une orientation sur la texture des cheveux (lisses, ondulés, bouclés, crépus) et suggère 3 idées de coiffures de scène adaptées (ex: queue haute dynamique, tresses collées, chignon bas structuré), ainsi que des conseils d'entretien après transpiration. Sois très positif et constructif.`;
        break;

      case "outfit":
        systemInstruction = "Tu es un styliste de scène K-Pop bienveillant et créatif.";
        promptText = `Examine cette photo de tenue. Donne un avis bienveillant et stylistique sur la tenue pour la scène (harmonie des couleurs, style K-Pop/streetwear/chic, coupe du vêtement, accessoires). RÈGLE ABSOLUE : Donne des conseils UNIQUEMENT sur l'esthétique et les vêtements, JAMAIS sur le corps ou la morphologie. Propose 2 ajustements d'accessoires ou de superposition (layering).`;
        break;

      case "skin":
        systemInstruction = "Tu es un expert en dermatologie douce et maquillage de scène K-Beauty.";
        promptText = `Examine cette photo (visage / peau / maquillage). Donne des conseils bienveillants pour préserver l'éclat de la peau (hydratation, nettoyage après la sueur de danse) et un conseil de maquillage scénique naturel (teint lumineux, fixateur). RÈGLE STRICTE : Sois hyper encourageant, pas de diagnostic médical effrayant, juste des conseils de bien-être et de soin K-Beauty.`;
        break;

      case "sport_posture":
        systemInstruction = "Tu es un coach sportif et préparateur physique spécialisé pour artistes K-Pop.";
        promptText = `Examine cette photo ou vidéo de posture (gainage, étirement, squat, posture scénique). Évalue la posture : alignement de la colonne, niveau de sécurité, engagement du tronc. Donne 2 conseils pratiques pour améliorer la stabilité et prévenir les blessures lors des répétitions de danse.`;
        break;

      case "korean_hangeul":
        systemInstruction = "Tu es un professeur de langue coréenne chaleureux et pédagogue.";
        promptText = `Examine cette photo d'écriture coréenne manuscrite (Hangeul) ou de cahier d'exercices. Analyse la lisibilité des lettres, l'équilibre des syllabes et la clarté de l'écriture. Félicite l'apprenant(e) et donne 2 conseils très précis pour perfectionner la calligraphie des consonnes et voyelles coréennes !`;
        break;

      case "journal_board":
        systemInstruction = "Tu es un coach en préparation mentale et bien-être pour artistes K-Pop.";
        promptText = `Examine cette photo de page de journal, carnet manuscrit ou mood board. Donne une réaction chaleureuse et inspirante qui valorise l'introspection, la positivité et la régularité du trainee dans sa quête d'expression personnelle.`;
        break;

      case "food":
        systemInstruction = "Tu es un coach en hygiène de vie et vitalité K-Pop.";
        promptText = `Analyse cette photo de plat/snack. Donne une orientation générale sur la vitalité et les nutriments (ex: super apport en fibres/vitamines, idéal avant la danse/effort). RÈGLE STRICTE : NE PARLE PAS de calories ni de régimes stricts. Donne juste un conseil d'énergie bienveillant.`;
        break;

      case "performance_singing":
      case "performance_dance":
      case "performance_rap":
        systemInstruction = "Tu es un juré d'évaluation de trainee K-Pop chevronné, constructif et encourageant.";
        promptText = `Tu évalues la performance (note/discipline : ${type}). Donne une note sur 5, puis détaille 3 points forts et 2 conseils d'amélioration technique (posture, énergie, précision rhythmique ou charisme). Note supplémentaire : ${mediaNote || "Aucune note"}. Propose un avis constructif et stimulant.`;
        break;

      default:
        promptText = mediaNote || "Analyse et donne des conseils bienveillants pour cet élément.";
    }

    const parts: Array<any> = [];
    if (image && typeof image === "string") {
      const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      parts.push({
        inlineData: {
          mimeType,
          data: cleanBase64,
        },
      });
    }

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ analysis: response.text || "Analyse terminée avec succès." });
  } catch (error: any) {
    console.error("Erreur API Analyze Gemini:", error);
    res.status(500).json({ error: error?.message || "Erreur lors de l'analyse." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] K-Pop Trainee Companion running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
