import { useGeolocation } from "./useGeolocation";

export type Language = "pt" | "en";

// Países que recebem o site em Português
const PT_COUNTRIES = ["PT", "BR", "AO", "MZ"];

export function useLanguage(): Language {
  const { countryCode, loading } = useGeolocation();

  // Enquanto carrega, usar idioma do browser como fallback rápido
  if (loading || !countryCode) {
    const lang = (navigator.language || "").toLowerCase();
    if (lang.startsWith("pt")) return "pt";
    return "en";
  }

  return PT_COUNTRIES.includes(countryCode.toUpperCase()) ? "pt" : "en";
}
