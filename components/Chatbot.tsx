"use client";

import { useChat, Message } from "ai/react";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat({
    id: "cyber-chetana-chat",
    initialMessages: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("chat-history") || "[]") : [],
    onFinish: (message) => {
      // Save history after each message is finished
      if (typeof window !== "undefined") {
        localStorage.setItem("chat-history", JSON.stringify([...messages, message]));
      }
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync messages to localStorage whenever they change
  useEffect(() => {
    if (isMounted && messages.length > 0) {
      localStorage.setItem("chat-history", JSON.stringify(messages));
    }
  }, [messages, isMounted]);

  useEffect(() => {
    setIsMounted(true);
    const savedMessages = localStorage.getItem("chat-history");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [setMessages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("chat-history");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors ${isOpen ? "hidden" : "flex"}`}
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
            className="fixed bottom-0 right-0 sm:bottom-[20px] sm:right-[20px] z-50 w-full sm:w-[400px] h-[100dvh] sm:h-[600px] sm:max-h-[80vh] flex flex-col bg-zinc-950 border-t sm:border border-cyan-500/30 sm:rounded-2xl shadow-2xl shadow-cyan-900/20 overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Cyber Chetana AI</h3>
                  <p className="text-xs text-zinc-400">Security Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3 px-4">
                  <Bot size={48} className="text-cyan-500/50" />
                  <p className="text-zinc-400 text-sm">
                    Hello! I'm the Cyber Chetana AI assistant. How can I help you with cybersecurity today?
                  </p>
                </div>
              )}
              
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`p-2 rounded-full h-fit flex-shrink-0 ${m.role === "user" ? "bg-cyan-500/20 text-cyan-400" : "bg-purple-500/20 text-purple-400"}`}>
                    {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      m.role === "user"
                        ? "bg-cyan-500 text-black rounded-tr-none shadow-lg shadow-cyan-500/20"
                        : "bg-zinc-900 border border-white/5 text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                   <div className="p-2 rounded-full h-fit flex-shrink-0 bg-purple-500/20 text-purple-400">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 rounded-tl-none flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: 0, duration: 0.6 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: 0.2, duration: 0.6 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: 0.4, duration: 0.6 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                  </div>
                </div>
              )}
              
              {/* Error Handling */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center mx-4">
                  <p className="text-xs text-red-400 font-medium">
                    {error.message.includes('HUGGINGFACE_API_KEY') 
                      ? "Configuration Error: Please check your .env.local file." 
                      : `Error: ${error.message}`}
                  </p>
                </div>
              )}
              
              {!isLoading && !error && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                <div className="text-center p-2">
                   <p className="text-xs text-zinc-500 italic">Connecting to agent...</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 pb-safe border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 text-cyan-500 hover:text-cyan-400 disabled:text-zinc-600 disabled:hover:text-zinc-600 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
