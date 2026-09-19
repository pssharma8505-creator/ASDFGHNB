import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Cpu, Bot, User, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "Welcome to Eastern Alliance Automation. I am your specialized Siemens and drives AI engineering assistant. Ask me anything about our customised panel ratings, PLC programming, or spares coordinates.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What specialized panels do you fabricate?",
    "Tell me about AC Drive panels specs.",
    "Can you program Siemens PLCs?",
    "Get EAA contact details.",
  ];

  // Auto scroll logic to keep chat view pinned at end
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || loading) return;

    if (!customText) {
      setInputVal("");
    }

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Reconstruct simple history format from current array
      const historyPayload = messages.slice(1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      // Submit to server endpoint using standard parameters
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to contact corporate AI grid.");
      }

      const botMessage: ChatMessage = {
        role: "model",
        text: resData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: ChatMessage = {
        role: "model",
        text: "Error: " + (error.message || "Failed to reach EAA industrial node. Please check your network and retry."),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="floating-chatbot-block">
      
      {/* Floating Circle Launcher Action Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all text-sm font-semibold cursor-pointer group"
          id="chatbot-open-badge"
          title="Consult AI engineering core"
        >
          <Bot className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Actual Expanded Chat Window Context */}
      {isOpen && (
        <div
          className="w-[340px] sm:w-[400px] h-[55vh] min-h-[460px] max-h-[640px] rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl flex flex-col justify-between overflow-hidden"
          id="chatbot-window-panel"
        >
          
          {/* Header Console */}
          <div className="px-5 py-4 bg-zinc-950 text-white dark:bg-zinc-950 dark:text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-100">
                <Cpu className="w-4 h-4 text-emerald-400 fill-current animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">EAA AI Engine</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400">Grid Online</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-zinc-850 text-zinc-400 hover:text-white transition-colors"
              id="chatbot-close-action"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation history area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-55/40 dark:bg-zinc-950/20" id="chatbot-message-scroll">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3.5 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200" : "bg-zinc-950 text-white"
                }`}>
                  {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message bubble */}
                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-black rounded-tr-none font-medium"
                      : "bg-white text-zinc-8D dark:bg-zinc-850 dark:text-zinc-100 rounded-tl-none border border-zinc-150 dark:border-zinc-800"
                  }`}>
                    {m.text}
                  </div>
                  <span className="block text-[8px] text-zinc-400 px-1 font-mono">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Simulated generation loading state */}
            {loading && (
              <div className="flex items-center space-x-2 mr-auto max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div className="p-3 bg-zinc-100 dark:bg-zinc-850 rounded-2xl rounded-tl-none border border-zinc-150 dark:border-zinc-800 text-xs text-zinc-400">
                  <span className="inline-flex space-x-1">
                    <span className="animate-ping">.</span>
                    <span className="animate-ping [animation-delay:0.2s]">.</span>
                    <span className="animate-ping [animation-delay:0.4s]">.</span>
                  </span>
                  <span> Analyzing parameters</span>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>

          {/* Quick recommendations panel */}
          {messages.length === 1 && !loading && (
            <div className="p-3 bg-zinc-100/50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
              <span className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5 pl-1">
                Consultation Prompts
              </span>
              <div className="flex flex-wrap gap-1.5" id="chatbot-prompts-group">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp)}
                    className="text-[10px] bg-white hover:bg-zinc-50 border border-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg text-zinc-700 dark:text-zinc-200 font-medium transition-colors text-left truncate max-w-full"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input text controls bar */}
          <div className="p-3 border-t border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              placeholder="Query electrical specs, PLC solutions..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-50"
              id="chatbot-text-input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputVal.trim()}
              className="p-2.5 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-40 transition-all cursor-pointer"
              id="chatbot-send-action"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
