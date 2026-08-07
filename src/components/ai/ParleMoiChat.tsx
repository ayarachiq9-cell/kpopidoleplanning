import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ImagePlus, X, Sparkles, Loader2, Bot, User } from "lucide-react";
import { ChatMessage } from "../../types";

export const ParleMoiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      sender: "mentor",
      text: "Annyeonghaseyo ! 🌟 Je suis ton K-Mentor IA. Je suis là pour t'accompagner dans toutes tes questions : chant, danse, rap, hygiène de vie, confiance en toi ou préparation d'audition. Tu peux aussi m'envoyer une photo pour obtenir mon avis !",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError("L'image est trop lourde (max 8 Mo).");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText.trim(),
      image: selectedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptToSend = inputText;
    const imageToSend = selectedImage;

    setInputText("");
    setSelectedImage(null);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          image: imageToSend,
          history: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite.");
      }

      const mentorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "mentor",
        text: data.reply || "Fighting ! ✊ continue de donner le meilleur !",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err: any) {
      setError(err?.message || "Erreur de connexion avec K-Mentor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-200/80 shadow-sm">
        <div className="flex items-center gap-3 text-purple-700 font-bold uppercase tracking-wider text-xs mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Assistant Conversationnel IA Intégré</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
          Parle-moi — K-Mentor IA
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl">
          Posez vos questions sur la pratique artistique, demandez des conseils ou joignez une photo pour un retour instantané et motivant !
        </p>
      </div>

      {/* Chat Window */}
      <div className="bg-white border border-slate-200/80 rounded-2xl flex flex-col h-[580px] overflow-hidden shadow-sm">
        {/* Messages Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>K-Mentor IA</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <span className="text-[11px] text-purple-700 font-medium">Coach Trainee & Support Multimodal</span>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                  m.sender === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gradient-to-tr from-purple-600 to-pink-600 text-white"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                    m.sender === "user"
                      ? "bg-purple-600 text-white rounded-tr-none"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="Pièce jointe"
                      className="max-h-48 rounded-xl mb-2 object-cover border border-purple-200"
                    />
                  )}
                  {m.text}
                </div>

                <span
                  className={`text-[10px] text-slate-400 block ${
                    m.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none text-xs text-slate-500 italic shadow-2xs">
                K-Mentor réfléchit à la meilleure réponse...
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 text-center font-medium">
              {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-slate-200/80 space-y-2">
          {selectedImage && (
            <div className="relative inline-block rounded-lg overflow-hidden border border-purple-300 max-h-20">
              <img src={selectedImage} alt="Pièce jointe" className="h-16 object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-1 right-1 bg-slate-900/80 text-white p-0.5 rounded-full hover:bg-rose-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-purple-300 transition-colors cursor-pointer"
              title="Joindre une photo"
            >
              <ImagePlus className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Pose une question à K-Mentor (ex: Conseils pour l'énergie scénique ?)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-500 focus:bg-white placeholder-slate-400"
            />

            <button
              type="submit"
              disabled={loading || (!inputText.trim() && !selectedImage)}
              className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
