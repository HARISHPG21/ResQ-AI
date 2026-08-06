'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';

// ─── Gemini API Key (set in .env.local as NEXT_PUBLIC_GEMINI_API_KEY) ────────
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
// Verified available models in priority order
const GEMINI_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-2.0-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
];
const getGeminiUrl = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_CONTEXT = `You are ResQ Gemini AI, an expert Disaster Response Assistant embedded in ResQ-AI — India's National Disaster Management Intelligence Platform (NDMA).

You have deep knowledge of:
- NDMA (National Disaster Management Authority) Standard Operating Procedures
- Indian Red Cross First-Aid Manuals
- Flood, Cyclone, Landslide, Earthquake, and Fire emergency guidelines
- Evacuation SOPs for all Indian states
- NDRF, SDRF, and local emergency contact numbers

Rules:
- Always provide calm, clear, and actionable step-by-step guidance
- Prioritize human safety above all else
- Mention nearest shelter, NDRF helpline (011-24363260) or State Control Room (1070) where relevant
- Keep responses concise and easy to follow under stress
- Use bullet points for clarity
- If asked in Hindi or regional languages, respond in that language`;

interface Message {
  sender: 'user' | 'bot';
  text: string;
  actions?: string[];
  timestamp: Date;
}

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '👋 Namaste! I am **ResQ Gemini AI**, your real-time AI Disaster Advisor powered by Google Gemini 1.5 Flash.\n\nI can help with:\n• Flood / Cyclone / Earthquake survival steps\n• Nearest shelter & hospital locations\n• First-aid instructions\n• Evacuation route guidance\n• NDRF emergency contacts\n\nHow can I assist you today?',
      actions: ['Flood survival steps', 'How to help injured person', 'Nearest shelter info', 'Emergency helpline numbers'],
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const callGeminiAPI = async (userText: string): Promise<string> => {
    const conversationHistory = messages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_CONTEXT }]
      },
      contents: [
        ...conversationHistory,
        { role: 'user', parts: [{ text: userText }] }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
      ]
    };

    // Try each model in order until one succeeds
    let lastError = '';
    for (const model of GEMINI_MODELS) {
      try {
        const response = await fetch(getGeminiUrl(model), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
          lastError = data?.error?.message || `HTTP ${response.status}`;
          // If "not found" error, try next model; otherwise throw immediately
          if (lastError.toLowerCase().includes('not found') || lastError.toLowerCase().includes('not supported')) {
            continue;
          }
          throw new Error(lastError);
        }
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
        lastError = 'Empty response from model';
      } catch (e: any) {
        lastError = e?.message || String(e);
        if (lastError.toLowerCase().includes('not found') || lastError.toLowerCase().includes('not supported')) {
          continue;
        }
        throw e;
      }
    }
    throw new Error(`All Gemini models failed. Last error: ${lastError}. Please provide a valid API key from https://aistudio.google.com/app/apikey`);
  };

  const getSuggestedActions = (responseText: string): string[] => {
    const lowerText = responseText.toLowerCase();
    if (lowerText.includes('flood') || lowerText.includes('water')) {
      return ['Show Evacuation Route on Map', 'Nearest Relief Shelter', 'Call NDRF Helpline'];
    } else if (lowerText.includes('first aid') || lowerText.includes('injur') || lowerText.includes('bleed')) {
      return ['Find Nearest Hospital', 'Call 108 Ambulance', 'More First Aid Tips'];
    } else if (lowerText.includes('earthquake') || lowerText.includes('seismic')) {
      return ['Drop-Cover-Hold Instructions', 'Structural Safety Checklist', 'Gas Leak Protocol'];
    } else if (lowerText.includes('cyclone') || lowerText.includes('storm')) {
      return ['Cyclone Preparedness Checklist', 'Shelter In Place vs Evacuate', 'Wind Safety Tips'];
    }
    return ['Flood survival steps', 'Emergency contacts', 'First aid help'];
  };

  const handleSend = async (textOverride?: string) => {
    const userText = (textOverride ?? query).trim();
    if (!userText) return;

    setQuery('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, timestamp: new Date() }
    ]);
    setLoading(true);

    try {
      const reply = await callGeminiAPI(userText);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          actions: getSuggestedActions(reply),
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      const errMsg = err?.message || 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `⚠️ **Gemini API Error**: ${errMsg}\n\n**Fallback NDMA Advisory:**\n• Stay calm and move to high ground immediately.\n• Do NOT wade through moving water deeper than 6 inches.\n• Signal rescue drones by waving bright cloth from rooftop.\n• Call NDRF Helpline: **011-24363260** or State Control Room: **1070**`,
          actions: ['Call NDRF: 011-24363260', 'State Control Room: 1070', 'Share GPS Location'],
          timestamp: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                ResQ Gemini 2.5 Flash AI Advisor
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Gemini 1.5 Flash · NDMA Knowledge Base · Real-Time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs leading-relaxed">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-slate-950" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl p-3 ${
                  m.sender === 'user'
                    ? 'bg-cyan-600 text-white rounded-br-none font-medium'
                    : 'glass-card border border-slate-700 text-slate-200 rounded-bl-none whitespace-pre-wrap'
                }`}
              >
                {m.text}
                {m.actions && m.sender === 'bot' && (
                  <div className="mt-3 pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                    {m.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleSend(act)}
                        className="bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer outline-none"
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-1.5 text-[10px] opacity-50 text-right">
                  {m.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
              <div className="glass-card border border-slate-700 rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0ms]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:150ms]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:300ms]"></span>
                <span className="text-slate-400 text-[11px] ml-1">Gemini is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
            placeholder="Ask e.g. 'Trapped in flood, what to do?' ..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !query.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-glow-cyan outline-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
