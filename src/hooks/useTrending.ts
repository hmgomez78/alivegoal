import { useState, useEffect } from "react";
import type { Language } from "./useLanguage";

export interface TrendingItem {
  id: string;
  title: string;
  title_en: string;
  summary: string;
  summary_en: string;
  tag: "BREAKING" | "SCANDAL" | "TRANSFER" | "HOT";
  source: string;
  url: string;
  time: string;
  engagement: string;
}

interface TrendingState {
  items: TrendingItem[];
  loading: boolean;
  error: string | null;
  updated: string | null;
}

export function useTrending(): TrendingState {
  const [state, setState] = useState<TrendingState>({
    items: [],
    loading: true,
    error: null,
    updated: null,
  });

  const fetchTrending = async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch("/api/trending");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setState({
        items: data.items || [],
        loading: false,
        error: null,
        updated: data.updated || null,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Não foi possível carregar o trending.",
      }));
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return state;
}

/**
 * Retorna o título e resumo na língua correta
 */
export function getTrendingText(
  item: TrendingItem,
  lang: Language
): { title: string; summary: string } {
  return {
    title: lang === "pt" ? item.title : item.title_en,
    summary: lang === "pt" ? item.summary : item.summary_en,
  };
}
