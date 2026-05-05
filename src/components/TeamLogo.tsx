import { useState } from "react";

// api-sports.io CDN team IDs — covers worldwide leagues
const teamLogoMap: Record<string, number> = {
  // Premier League
  "Manchester City": 50,
  "Arsenal": 42,
  "Liverpool": 40,
  "Chelsea": 49,
  // La Liga
  "Barcelona": 529,
  "Real Madrid": 541,
  // Bundesliga
  "Borussia Dortmund": 165,
  "RB Leipzig": 173,
  "Bayern Munich": 157,
  // Serie A
  "Juventus": 496,
  "AC Milan": 489,
  // Ligue 1
  "PSG": 85,
  // Champions League / Portuguese
  "Benfica": 211,
  "Porto": 212,
  // Egyptian Premier
  "Al Ahly": 1080,
  "Zamalek": 1081,
  // Brazilian
  "Flamengo": 127,
  "Palmeiras": 121,
  // Scottish
  "Celtic": 247,
  "Rangers": 248,
  // Dutch
  "Ajax": 194,
  "Feyenoord": 215,
};

const colors = [
  "bg-primary/20 text-primary",
  "bg-accent/20 text-accent",
  "bg-blue-500/20 text-blue-400",
  "bg-red-500/20 text-red-400",
  "bg-yellow-500/20 text-yellow-400",
  "bg-purple-500/20 text-purple-400",
  "bg-orange-500/20 text-orange-400",
  "bg-teal-500/20 text-teal-400",
];

function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 3).toUpperCase();
}

const TeamLogo = ({ name, size = "md" }: { name: string; size?: "sm" | "md" }) => {
  const [imgError, setImgError] = useState(false);
  const teamId = teamLogoMap[name];
  const sz = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";
  const imgSz = size === "sm" ? "h-7 w-7" : "h-9 w-9";

  if (teamId && !imgError) {
    return (
      <img
        src={`https://media.api-sports.io/football/teams/${teamId}.png`}
        alt={`${name} logo`}
        className={`${imgSz} shrink-0 object-contain`}
        onError={() => setImgError(true)}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`${sz} ${hashColor(name)} flex shrink-0 items-center justify-center rounded-full font-bold`}>
      {initials(name)}
    </div>
  );
};

export default TeamLogo;
