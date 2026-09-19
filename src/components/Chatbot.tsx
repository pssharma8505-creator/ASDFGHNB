import React, { useState, useRef, useEffect } from "react";
import { X, Send, Cpu, Bot, User } from "lucide-react";
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

    const userMessage: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const historyPayload = messages.slice(1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

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
      
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-13 h-13 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all text-sm font-semibold cursor-pointer group"
          id="chatbot-open-badge"
          title="Consult AI engineering core"
        >
          <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {isOpen && (
        <div
          className="w-[340px] sm:w-[400px] h-[55vh] min-h-[460px] max-h-[600px] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden"
          id="chatbot-window-panel"
        >
          
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4 text-emerald-400 fill-current" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight">EAA AI Engine</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-300">Grid Online</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              id="chatbot-close-action"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chatbot-message-scroll">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3.5 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user" ? "bg-slate-200 text-slate-800" : "bg-slate-900 text-white"
                }`}>
                  {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-slate-900 text-white rounded-tr-none font-medium"
                      : "bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-xs"
                  }`}>
                    {m.text}
                  </div>
                  <span className="block text-[9px] text-slate-400 px-1 font-sans">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 mr-auto max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                </div>
                <div className="p-3 bg-white rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 shadow-xs">
                  <span>Analyzing parameters...</span>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>

          {messages.length === 1 && !loading && (
            <div className="p-3 bg-slate-100/80 border-t border-slate-200 shrink-0">
              <span className="block text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">
                Consultation Prompts
              </span>
              <div className="flex flex-wrap gap-1.5" id="chatbot-prompts-group">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp)}
                    className="text-[10px] bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-slate-700 font-bold transition-colors text-left truncate max-w-full cursor-pointer shadow-xs"
                  >
                    {qp}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2 shrink-0">
            <input
              type="text"
              placeholder="Query electrical specs, PLC solutions..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white disabled:opacity-50"
              id="chatbot-text-input"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputVal.trim()}
              className="p-2.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
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
