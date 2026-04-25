"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2, TrendingUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: string;
  timestamp: number;
};

type TrendingItem = { question: string; count: number };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "trending">("chat");
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved messages on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("cyber-chat-history");
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      localStorage.setItem("cyber-chat-history", JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Poll trending
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/chat/trending");
        if (res.ok) {
          const data = await res.json();
          setTrending(data.trending || []);
        }
      } catch { /* ignore */ }
    };
    fetchTrending();
    const interval = setInterval(fetchTrending, 30000);
    return () => clearInterval(interval);
  }, []);

  const clearHistory = () => {
    setMessages([]);
    setError(null);
    localStorage.removeItem("cyber-chat-history");
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I couldn't generate a response. Please try again.",
        source: data.source,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      if (errorMessage.includes("fetch")) {
        setError("Cannot reach the server. Please make sure 'npm run dev' is running.");
      } else {
        setError(`Error: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (prompt: string) => {
    setActiveTab("chat");
    sendMessage(prompt);
  };

  // Simple markdown-like rendering for bot messages
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      // Bold
      let rendered = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Links
      rendered = rendered.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-cyan-400 underline hover:text-cyan-300">$1</a>');
      // Standalone URLs
      rendered = rendered.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" class="text-cyan-400 underline hover:text-cyan-300">$1</a>');
      // Bullet points
      if (rendered.startsWith("• ") || rendered.startsWith("- ")) {
        return <div key={i} className="flex gap-1.5 ml-1"><span className="text-cyan-500 flex-shrink-0">•</span><span dangerouslySetInnerHTML={{ __html: rendered.replace(/^[•\-]\s/, '') }} /></div>;
      }
      // Empty line
      if (!rendered.trim()) return <div key={i} className="h-2" />;
      // Normal line
      return <div key={i} dangerouslySetInnerHTML={{ __html: rendered }} />;
    });
  };

  const suggestedPrompts = [
    { emoji: "🎣", text: "What is Phishing?" },
    { emoji: "💳", text: "How to secure my UPI?" },
    { emoji: "📱", text: "Social media safety tips" },
    { emoji: "🛡️", text: "What is Cyber Chetana?" },
    { emoji: "🗺️", text: "Give me a website tour" },
    { emoji: "🔗", text: "Show official helpline links" },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 300); }}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all ${isOpen ? "hidden" : "flex"}`}
        aria-label="Open Chatbot"
      >
        <MessageSquare size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 sm:bottom-[20px] sm:right-[20px] z-50 w-full sm:w-[420px] h-[100dvh] sm:h-[620px] sm:max-h-[80vh] flex flex-col bg-zinc-950 border-t sm:border border-cyan-500/30 sm:rounded-2xl shadow-2xl shadow-cyan-900/30 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-zinc-900 to-zinc-950">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Cyber Chetana AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[11px] text-green-400">Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button onClick={clearHistory} className="p-2 text-zinc-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" title="Clear chat">
                    <Trash2 size={16} />
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "chat" ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Bot size={14} /> Chat
              </button>
              <button
                onClick={() => setActiveTab("trending")}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "trending" ? "text-orange-400 border-b-2 border-orange-400 bg-orange-500/5" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <TrendingUp size={14} /> Trending
                {trending.length > 0 && (
                  <span className="bg-orange-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {trending.length}
                  </span>
                )}
              </button>
            </div>

            {/* ═══ Chat Tab ═══ */}
            {activeTab === "chat" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-5 px-2">
                    <div className="p-5 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <Bot size={44} className="text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base mb-1">Welcome to HacFy Cyber Chetana</h4>
                      <p className="text-zinc-400 text-sm mb-5">
                        Your AI cybersecurity companion. Tap a topic or type your question!
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      {suggestedPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(prompt.text)}
                          className="p-3 text-xs text-left bg-white/5 border border-white/10 rounded-xl text-zinc-300 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all flex items-start gap-2"
                        >
                          <span className="text-base">{prompt.emoji}</span>
                          <span>{prompt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 max-w-[88%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`p-1.5 rounded-full h-fit flex-shrink-0 ${m.role === "user" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                      {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-tr-none shadow-lg shadow-cyan-500/20"
                          : "bg-zinc-900 border border-white/5 text-zinc-200 rounded-tl-none"
                      }`}
                    >
                      {m.role === "user" ? m.content : renderContent(m.content)}
                      {m.source === "huggingface" && (
                        <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-cyan-500/60 flex items-center gap-1">
                          <Bot size={10} /> Powered by HuggingFace AI
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-2.5 max-w-[85%] mr-auto">
                    <div className="p-1.5 rounded-full h-fit flex-shrink-0 bg-purple-500/20 text-purple-400">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 rounded-tl-none flex items-center gap-1.5">
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0, duration: 0.5 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.15, duration: 0.5 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: 0.3, duration: 0.5 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <span className="text-xs text-zinc-500 ml-2">Thinking...</span>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center space-y-2">
                    <p className="text-xs text-red-400">{error}</p>
                    <button
                      onClick={() => { setError(null); if (messages.length > 0) { const last = messages[messages.length - 1]; if (last.role === "user") sendMessage(last.content); }}}
                      className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/30 transition-all inline-flex items-center gap-1"
                    >
                      <RefreshCw size={12} /> Try Again
                    </button>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* ═══ Trending Tab ═══ */}
            {activeTab === "trending" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-orange-400" />
                  <h4 className="text-sm font-bold text-white">Trending Questions</h4>
                  <span className="text-[10px] text-zinc-500 ml-auto bg-zinc-800 px-2 py-0.5 rounded-full">Live · 30s</span>
                </div>
                {trending.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center space-y-2">
                    <TrendingUp size={32} className="text-zinc-700" />
                    <p className="text-zinc-500 text-sm">No trending questions yet.</p>
                    <p className="text-zinc-600 text-xs">Start chatting to see trends!</p>
                  </div>
                ) : (
                  trending.map((item, i) => (
                    <motion.button
                      key={item.question}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handlePromptClick(item.question)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-left group"
                    >
                      <span className={`text-lg font-bold w-6 text-center flex-shrink-0 ${
                        i === 0 ? "text-yellow-400" : i === 1 ? "text-zinc-300" : i === 2 ? "text-amber-600" : "text-zinc-600"
                      }`}>
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                      </span>
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors flex-1">{item.question}</span>
                      <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        {item.count}x
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 pb-safe border-t border-white/10 bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cybersecurity..."
                  disabled={isLoading}
                  className="w-full bg-zinc-800/80 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 disabled:bg-zinc-700 disabled:text-zinc-500 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
