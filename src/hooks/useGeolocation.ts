import { useState, useEffect } from "react";

export interface GeoData {
  countryCode: string;
  country: string;
  loading: boolean;
}

// Países onde V.Vegas deve aparecer
const VVEGAS_COUNTRIES = [
  "DE", "BE", "AT", "PL", "LV", "LT", "EE", "SI", "SK", "PT",
  "HR", "BA", "LU", "IS", "CH", "RO", "HU", "GR", "DK", "NO",
  "FI", "SE", "IE", "BG", "CA", "GE", "RS", "MD", "IT", "AL", "AD",
];

export type BookmakerGeo =
  | "elephantbet-angola"
  | "elephantbet-mozambique"
  | "hollywoodbets"
  | "888bets"
  | "premierbet"
  | "betway"
  | "vvegas";

/**
 * Determina quais casas de apostas mostrar com base no país do visitante
 */
export function getVisibleBookmakers(countryCode: string): BookmakerGeo[] {
  const code = countryCode.toUpperCase();

  if (code === "AO") return ["elephantbet-angola", "premierbet"];
  if (code === "MZ") return ["elephantbet-mozambique", "888bets"];
  if (code === "ZA") return ["hollywoodbets"];
  if (VVEGAS_COUNTRIES.includes(code)) return ["vvegas"];

  // Fallback: mostrar todas
  return ["elephantbet-angola", "elephantbet-mozambique", "hollywoodbets", "888bets", "premierbet", "vvegas"];
}

/**
 * Tenta adivinhar o país a partir do idioma do browser como fallback rápido
 */
function guessCountryFromLanguage(): string {
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("pt-pt") || lang === "pt") return "PT";
  if (lang.startsWith("pt-mz")) return "MZ";
  if (lang.startsWith("pt-ao")) return "AO";
  if (lang.startsWith("pt-br")) return "BR";
  if (lang.startsWith("af") || lang.startsWith("zu") || lang.startsWith("xh")) return "ZA";
  if (lang.startsWith("de")) return "DE";
  if (lang.startsWith("fr-be")) return "BE";
  if (lang.startsWith("fr")) return "FR";
  if (lang.startsWith("it")) return "IT";
  if (lang.startsWith("es")) return "ES";
  if (lang.startsWith("pl")) return "PL";
  if (lang.startsWith("ro")) return "RO";
  if (lang.startsWith("hu")) return "HU";
  if (lang.startsWith("el")) return "GR";
  if (lang.startsWith("sv")) return "SE";
  if (lang.startsWith("da")) return "DK";
  if (lang.startsWith("fi")) return "FI";
  if (lang.startsWith("nb") || lang.startsWith("no")) return "NO";
  if (lang.startsWith("en-ie")) return "IE";
  if (lang.startsWith("en-ca")) return "CA";
  if (lang.startsWith("en-gb")) return "GB";
  if (lang.startsWith("en-za")) return "ZA";
  return "";
}

export function useGeolocation(): GeoData {
  const [geo, setGeo] = useState<GeoData>({
    countryCode: "",
    country: "",
    loading: true,
  });

  useEffect(() => {
    const detectCountry = async () => {
      // 1. Tentar ipapi.co (gratuito, sem chave)
      try {
        const res = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(4000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.country_code) {
            setGeo({
              countryCode: data.country_code,
              country: data.country_name || data.country_code,
              loading: false,
            });
            return;
          }
        }
      } catch {
        // continuar
      }

      // 2. Tentar cloudflare trace (muito rápido, sem CORS)
      try {
        const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          const text = await res.text();
          const match = text.match(/loc=([A-Z]{2})/);
          if (match) {
            const code = match[1];
            const names: Record<string, string> = {
              PT: "Portugal", MZ: "Moçambique", AO: "Angola", ZA: "África do Sul",
              DE: "Alemanha", BE: "Bélgica", AT: "Áustria", PL: "Polónia",
              IT: "Itália", FR: "França", ES: "Espanha", GB: "Reino Unido",
              CA: "Canadá", BR: "Brasil", US: "Estados Unidos",
            };
            setGeo({
              countryCode: code,
              country: names[code] || code,
              loading: false,
            });
            return;
          }
        }
      } catch {
        // continuar
      }

      // 3. Tentar ip-api.com (gratuito, HTTP)
      try {
        const res = await fetch("https://ip-api.com/json/?fields=countryCode,country", {
          signal: AbortSignal.timeout(4000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.countryCode) {
            setGeo({
              countryCode: data.countryCode,
              country: data.country || data.countryCode,
              loading: false,
            });
            return;
          }
        }
      } catch {
        // continuar
      }

      // 4. Fallback: tentar adivinhar pelo idioma do browser
      const langCode = guessCountryFromLanguage();
      if (langCode) {
        const names: Record<string, string> = {
          PT: "Portugal", MZ: "Moçambique", AO: "Angola", ZA: "África do Sul",
          DE: "Alemanha", BE: "Bélgica", AT: "Áustria", PL: "Polónia",
          IT: "Itália", FR: "França", ES: "Espanha", GB: "Reino Unido",
          CA: "Canadá", BR: "Brasil",
        };
        setGeo({
          countryCode: langCode,
          country: names[langCode] || langCode,
          loading: false,
        });
        return;
      }

      // 5. Último fallback: sem filtro
      setGeo({ countryCode: "", country: "", loading: false });
    };

    detectCountry();
  }, []);

  return geo;
}
