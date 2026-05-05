import { useState, useEffect } from "react";

export interface GeoData {
  countryCode: string;
  country: string;
  loading: boolean;
}

// Países onde V.Vegas deve aparecer
const VVEGAS_COUNTRIES = [
  "DE", // Germany
  "BE", // Belgium
  "AT", // Austria
  "PL", // Poland
  "LV", // Latvia
  "LT", // Lithuania
  "EE", // Estonia
  "SI", // Slovenia
  "SK", // Slovakia
  "PT", // Portugal
  "HR", // Croatia
  "BA", // Bosnia
  "LU", // Luxembourg
  "IS", // Iceland
  "CH", // Switzerland
  "RO", // Romania
  "HU", // Hungary
  "GR", // Greece
  "DK", // Denmark
  "NO", // Norway
  "FI", // Finland
  "SE", // Sweden
  "IE", // Ireland
  "BG", // Bulgaria
  "CA", // Canada
  "GE", // Georgia
  "RS", // Serbia
  "MD", // Moldova
  "IT", // Italy
  "AL", // Albania
  "AD", // Andorra
];

export type BookmakerGeo = "elephantbet-angola" | "elephantbet-mozambique" | "hollywoodbets" | "888bets" | "premierbet" | "betway" | "vvegas";

/**
 * Determina quais casas de apostas mostrar com base no país do visitante
 */
export function getVisibleBookmakers(countryCode: string): BookmakerGeo[] {
  const code = countryCode.toUpperCase();

  // Angola: ElephantBet Angola + PremierBet
  if (code === "AO") {
    return ["elephantbet-angola", "premierbet"];
  }

  // Moçambique: ElephantBet Moçambique + 888
  if (code === "MZ") {
    return ["elephantbet-mozambique", "888bets"];
  }

  // África do Sul: HollywoodBets
  if (code === "ZA") {
    return ["hollywoodbets"];
  }

  // Países V.Vegas (Europa + Canadá)
  if (VVEGAS_COUNTRIES.includes(code)) {
    return ["vvegas"];
  }

  // Fallback: mostrar todas (para países não mapeados)
  return ["elephantbet-angola", "elephantbet-mozambique", "hollywoodbets", "888bets", "premierbet", "vvegas"];
}

export function useGeolocation(): GeoData {
  const [geo, setGeo] = useState<GeoData>({
    countryCode: "",
    country: "",
    loading: true,
  });

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Tentar ipapi.co (gratuito, sem chave)
        const res = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          setGeo({
            countryCode: data.country_code || "",
            country: data.country_name || "",
            loading: false,
          });
          return;
        }
      } catch {
        // Fallback
      }

      try {
        // Fallback: ip-api.com (gratuito)
        const res = await fetch("http://ip-api.com/json/?fields=countryCode,country", {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const data = await res.json();
          setGeo({
            countryCode: data.countryCode || "",
            country: data.country || "",
            loading: false,
          });
          return;
        }
      } catch {
        // Fallback final
      }

      // Se tudo falhar, não filtrar (mostrar tudo)
      setGeo({ countryCode: "", country: "", loading: false });
    };

    detectCountry();
  }, []);

  return geo;
}
