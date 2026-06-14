import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import "./App.css";

/* ─── WEAPONS ─── */
const WEAPONS = [
  { id: "Axe" }, { id: "Battle Boots" }, { id: "Blasters" }, { id: "Bow" },
  { id: "Cannon" }, { id: "Chakram" }, { id: "Gauntlets" }, { id: "Greatsword" },
  { id: "Hammer" }, { id: "Katars" }, { id: "Orb" }, { id: "Rocket Lance" },
  { id: "Scythe" }, { id: "Spear" }, { id: "Sword" },
];

const WEAPON_EMOJI = {
  Axe: "🪓", "Battle Boots": "🥾", Blasters: "🔫", Bow: "🏹",
  Cannon: "💣", Chakram: "💫", Gauntlets: "🥊", Greatsword: "⚔️",
  Hammer: "🔨", Katars: "🗡️", Orb: "🔮", "Rocket Lance": "🚀",
  Scythe: "🌙", Spear: "🎯", Sword: "⚡",
};

const WEAPON_CATEGORIES = {
  Axe: "Melee", "Battle Boots": "Melee", Gauntlets: "Melee",
  Hammer: "Melee", Katars: "Melee", Greatsword: "Melee", Sword: "Melee",
  Blasters: "Ranged", Bow: "Ranged", Cannon: "Ranged",
  Orb: "Ranged", Chakram: "Ranged",
  "Rocket Lance": "Hybrid", Scythe: "Hybrid", Spear: "Hybrid",
};

const WEAPON_IMAGES = {
  Axe:            "https://cms.brawlhalla.com/c/uploads/2022/03/AxeIcon2_96_1.jpg",
  "Battle Boots": "https://cms.brawlhalla.com/c/uploads/2023/01/boots-1-e1673854748156.png",
  Blasters:       "https://cms.brawlhalla.com/c/uploads/2022/03/BlasterIcon2_96.jpg",
  Bow:            "https://cms.brawlhalla.com/c/uploads/2021/05/Bow_Icon.png",
  Cannon:         "https://cms.brawlhalla.com/c/uploads/2022/06/CannonIcon2_96.jpg",
  Chakram:        "https://cms.brawlhalla.com/c/uploads/2025/01/ChakramIcon_A.png",
  Gauntlets:      "https://cms.brawlhalla.com/c/uploads/2022/06/Guantlets_Icon_1.png",
  Greatsword:     "https://cms.brawlhalla.com/c/uploads/2022/06/Greatsword2_Icon.jpg",
  Hammer:         "https://cms.brawlhalla.com/c/uploads/2022/03/Hammer_Icon_2.png",
  Katars:         "https://cms.brawlhalla.com/c/uploads/2022/03/Katar_Icon_2.png",
  Orb:            "https://cms.brawlhalla.com/c/uploads/2022/06/OrbIcon2_96_2.jpg",
  "Rocket Lance": "https://cms.brawlhalla.com/c/uploads/2021/05/Lance_Icon.png",
  Scythe:         "https://cms.brawlhalla.com/c/uploads/2022/06/Scythe_Icon_1.png",
  Spear:          "https://cms.brawlhalla.com/c/uploads/2022/03/SpearIcon2_96_1.jpg",
  Sword:          "https://cms.brawlhalla.com/c/uploads/2022/06/Sword_Icon_2.png",
};

const LEGENDS = [
  { name: "Bodvar",      weapons: ["Sword","Hammer"],          stats: { str:6, dex:6, def:5, spd:5 } },
  { name: "Cassidy",     weapons: ["Hammer","Blasters"],       stats: { str:6, dex:8, def:4, spd:4 } },
  { name: "Orion",       weapons: ["Rocket Lance","Spear"],    stats: { str:4, dex:5, def:6, spd:7 } },
  { name: "Lord Vraxx",  weapons: ["Rocket Lance","Blasters"], stats: { str:4, dex:8, def:4, spd:6 } },
  { name: "Gnash",       weapons: ["Hammer","Spear"],          stats: { str:7, dex:3, def:6, spd:6 } },
  { name: "Queen Nai",   weapons: ["Spear","Katars"],          stats: { str:7, dex:4, def:8, spd:3 } },
  { name: "Hattori",     weapons: ["Sword","Spear"],           stats: { str:4, dex:6, def:4, spd:8 } },
  { name: "Sir Roland",  weapons: ["Sword","Rocket Lance"],    stats: { str:5, dex:5, def:8, spd:4 } },
  { name: "Scarlet",     weapons: ["Hammer","Rocket Lance"],   stats: { str:8, dex:5, def:5, spd:4 } },
  { name: "Thatch",      weapons: ["Sword","Blasters"],        stats: { str:7, dex:6, def:3, spd:6 } },
  { name: "Ada",         weapons: ["Blasters","Spear"],        stats: { str:6, dex:7, def:3, spd:6 } },
  { name: "Sentinel",    weapons: ["Hammer","Katars"],         stats: { str:6, dex:4, def:7, spd:5 } },
  { name: "Lucien",      weapons: ["Katars","Blasters"],       stats: { str:3, dex:6, def:5, spd:8 } },
  { name: "Teros",       weapons: ["Hammer","Axe"],            stats: { str:8, dex:3, def:5, spd:6 } },
  { name: "Brynn",       weapons: ["Axe","Spear"],             stats: { str:6, dex:5, def:4, spd:7 } },
  { name: "Asuri",       weapons: ["Katars","Sword"],          stats: { str:4, dex:7, def:6, spd:5 } },
  { name: "Barraza",     weapons: ["Axe","Blasters"],          stats: { str:6, dex:4, def:8, spd:4 } },
  { name: "Ember",       weapons: ["Bow","Katars"],            stats: { str:5, dex:6, def:3, spd:8 } },
  { name: "Azoth",       weapons: ["Bow","Axe"],               stats: { str:7, dex:5, def:5, spd:5 } },
  { name: "Koji",        weapons: ["Sword","Bow"],             stats: { str:5, dex:8, def:4, spd:5 } },
  { name: "Ulgrim",      weapons: ["Axe","Rocket Lance"],      stats: { str:6, dex:3, def:7, spd:6 } },
  { name: "Diana",       weapons: ["Bow","Blasters"],          stats: { str:6, dex:6, def:5, spd:5 } },
  { name: "Jhala",       weapons: ["Sword","Axe"],             stats: { str:7, dex:7, def:3, spd:5 } },
  { name: "Kor",         weapons: ["Hammer","Gauntlets"],      stats: { str:6, dex:5, def:7, spd:4 } },
  { name: "Wu Shang",    weapons: ["Gauntlets","Spear"],       stats: { str:5, dex:7, def:5, spd:5 } },
  { name: "Val",         weapons: ["Gauntlets","Sword"],       stats: { str:4, dex:6, def:6, spd:6 } },
  { name: "Ragnir",      weapons: ["Katars","Axe"],            stats: { str:6, dex:5, def:6, spd:5 } },
  { name: "Cross",       weapons: ["Gauntlets","Blasters"],    stats: { str:7, dex:4, def:5, spd:6 } },
  { name: "Mirage",      weapons: ["Spear","Scythe"],          stats: { str:7, dex:5, def:4, spd:6 } },
  { name: "Nix",         weapons: ["Scythe","Blasters"],       stats: { str:4, dex:5, def:7, spd:6 } },
  { name: "Mordex",      weapons: ["Scythe","Gauntlets"],      stats: { str:6, dex:4, def:5, spd:7 } },
  { name: "Yumiko",      weapons: ["Bow","Hammer"],            stats: { str:4, dex:7, def:4, spd:7 } },
  { name: "Artemis",     weapons: ["Scythe","Rocket Lance"],   stats: { str:5, dex:5, def:4, spd:8 } },
  { name: "Caspian",     weapons: ["Katars","Gauntlets"],      stats: { str:7, dex:5, def:4, spd:6 } },
  { name: "Sidra",       weapons: ["Sword","Cannon"],          stats: { str:6, dex:4, def:6, spd:6 } },
  { name: "Xull",        weapons: ["Axe","Cannon"],            stats: { str:9, dex:4, def:5, spd:4 } },
  { name: "Kaya",        weapons: ["Bow","Spear"],             stats: { str:4, dex:4, def:7, spd:7 } },
  { name: "Isaiah",      weapons: ["Blasters","Cannon"],       stats: { str:6, dex:5, def:7, spd:4 } },
  { name: "Jiro",        weapons: ["Sword","Scythe"],          stats: { str:5, dex:7, def:3, spd:7 } },
  { name: "Lin Fei",     weapons: ["Katars","Cannon"],         stats: { str:3, dex:8, def:4, spd:7 } },
  { name: "Zariel",      weapons: ["Bow","Gauntlets"],         stats: { str:7, dex:4, def:7, spd:4 } },
  { name: "Rayman",      weapons: ["Gauntlets","Axe"],         stats: { str:6, dex:5, def:5, spd:6 } },
  { name: "Dusk",        weapons: ["Orb","Spear"],             stats: { str:6, dex:7, def:4, spd:5 } },
  { name: "Fait",        weapons: ["Orb","Scythe"],            stats: { str:7, dex:4, def:4, spd:7 } },
  { name: "Thor",        weapons: ["Orb","Hammer"],            stats: { str:6, dex:4, def:7, spd:5 } },
  { name: "Petra",       weapons: ["Orb","Gauntlets"],         stats: { str:8, dex:4, def:4, spd:6 } },
  { name: "Vector",      weapons: ["Rocket Lance","Bow"],      stats: { str:5, dex:4, def:6, spd:7 } },
  { name: "Volkov",      weapons: ["Scythe","Axe"],            stats: { str:4, dex:8, def:5, spd:5 } },
  { name: "Onyx",        weapons: ["Gauntlets","Cannon"],      stats: { str:5, dex:4, def:8, spd:5 } },
  { name: "Jaeyun",      weapons: ["Sword","Greatsword"],      stats: { str:6, dex:5, def:6, spd:5 } },
  { name: "Mako",        weapons: ["Katars","Greatsword"],     stats: { str:6, dex:4, def:4, spd:8 } },
  { name: "Magyar",      weapons: ["Hammer","Greatsword"],     stats: { str:5, dex:4, def:9, spd:4 } },
  { name: "Reno",        weapons: ["Orb","Blasters"],          stats: { str:4, dex:7, def:5, spd:6 } },
  { name: "Munin",       weapons: ["Scythe","Bow"],            stats: { str:5, dex:6, def:4, spd:7 } },
  { name: "Arcadia",     weapons: ["Spear","Greatsword"],      stats: { str:7, dex:7, def:4, spd:4 } },
  { name: "Ezio",        weapons: ["Sword","Orb"],             stats: { str:5, dex:7, def:4, spd:6 } },
  { name: "Tezca",       weapons: ["Gauntlets","Battle Boots"],stats: { str:7, dex:5, def:5, spd:5 } },
  { name: "Thea",        weapons: ["Battle Boots","Rocket Lance"], stats: { str:4, dex:5, def:3, spd:9 } },
  { name: "Red Raptor",  weapons: ["Battle Boots","Orb"],      stats: { str:5, dex:6, def:6, spd:5 } },
  { name: "Loki",        weapons: ["Katars","Scythe"],         stats: { str:4, dex:8, def:5, spd:5 } },
  { name: "Seven",       weapons: ["Spear","Cannon"],          stats: { str:7, dex:3, def:8, spd:4 } },
  { name: "Vivi",        weapons: ["Battle Boots","Blasters"], stats: { str:5, dex:6, def:5, spd:6 } },
  { name: "Imugi",       weapons: ["Axe","Greatsword"],        stats: { str:6, dex:5, def:5, spd:6 } },
  { name: "King Zuva",   weapons: ["Hammer","Battle Boots"],   stats: { str:6, dex:5, def:6, spd:5 } },
  { name: "Priya",       weapons: ["Chakram","Sword"],  stats: { str:6, dex:5, def:5, spd:6 } },
  { name: "Ransom",      weapons: ["Chakram","Bow"],      stats: { str:5, dex:6, def:6, spd:5 } },
  { name: "Lady Vera",   weapons: ["Chakram","Scythe"],           stats: { str:5, dex:6, def:5, spd:6 } },
  { name: "Rupture",     weapons: ["Katars","Rocket Lance"],    stats: { str:6, dex:5, def:6, spd:5 } },
];

const WIKI_BASE = "https://brawlhalla.wiki.gg/wiki/";

/* ─── STAT COLORS ─── */
const STAT_COLORS = { str: "#e8693d", dex: "#f5c842", def: "#5b9cf6", spd: "#6de89a" };

/* ─── URL STATE ─── */
function getWeaponsFromURL() {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("weapons");
    if (!raw) return [];
    return raw.split(",").map(decodeURIComponent).filter(w =>
      WEAPONS.some(x => x.id === w)
    ).slice(0, 2);
  } catch { return []; }
}

function setWeaponsInURL(weapons) {
  try {
    const url = new URL(window.location.href);
    if (weapons.length > 0) {
      url.searchParams.set("weapons", weapons.map(encodeURIComponent).join(","));
    } else {
      url.searchParams.delete("weapons");
    }
    window.history.replaceState(null, "", url.toString());
  } catch {}
}

/* ─── HELPERS ─── */
function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function LegendAvatar({ name, size = 70 }) {
  const [failed, setFailed] = useState(false);
  const wikiName = name.replace(/\s+/g, "");
  const px = size <= 50 ? 50 : 75;
  const src = `https://brawlhalla.wiki.gg/images/thumb/SkinIcon_${wikiName}_Classic.png/${px}px-SkinIcon_${wikiName}_Classic.png`;
  return (
    <div className="legend-avatar" style={{ width: size, height: size }}>
      {!failed
        ? <img src={src} alt={name} onError={() => setFailed(true)} />
        : <span className="avatar-initials">{getInitials(name)}</span>}
    </div>
  );
}

function WeaponImg({ id, className = "" }) {
  const [failed, setFailed] = useState(false);
  const src = WEAPON_IMAGES[id];
  if (!src || failed)
    return <span className={`weapon-emoji ${className}`}>{WEAPON_EMOJI[id] ?? "⚔️"}</span>;
  return <img className={`weapon-img ${className}`} src={src} alt={id} onError={() => setFailed(true)} />;
}

function StatBar({ label, value, color, compareValue = null }) {
  const pct = (value / 9) * 100;
  const comparePct = compareValue !== null ? (compareValue / 9) * 100 : null;
  const diff = compareValue !== null ? value - compareValue : null;
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${pct}%`, background: color }} />
        {comparePct !== null && (
          <div className="stat-fill-compare" style={{ width: `${comparePct}%`, background: color, opacity: 0.3 }} />
        )}
      </div>
      <span className="stat-val">{value}</span>
      {diff !== null && diff !== 0 && (
        <span className="stat-diff" style={{ color: diff > 0 ? "#6de89a" : "#e8693d" }}>
          {diff > 0 ? `+${diff}` : diff}
        </span>
      )}
    </div>
  );
}

function SelSlot({ label, value, onRemove }) {
  if (!value) return <span className="sel-empty">{label}</span>;
  return (
    <button className="sel-pill" onClick={onRemove}>
      <span className="pill-content">
        <WeaponImg id={value} className="pill-weapon-img" />
        {value}
      </span>
      <span className="pill-remove">✕</span>
    </button>
  );
}

/* ─── COMPARISON PANEL ─── */
function ComparePanel({ legendA, legendB, onClose, selectedWeapons }) {
  if (!legendA || !legendB) return null;
  const stats = ["str", "dex", "def", "spd"];
  const labels = { str: "STR", dex: "DEX", def: "DEF", spd: "SPD" };
  return (
    <div className="compare-overlay" onClick={onClose}>
      <div className="compare-panel" onClick={e => e.stopPropagation()}>
        <button className="compare-close" onClick={onClose}>✕ Close</button>
        <div className="compare-header">
          <div className="compare-legend">
            <LegendAvatar name={legendA.name} size={60} />
            <p className="compare-name">{legendA.name}</p>
            <div className="w-tags" style={{justifyContent:"center"}}>
              {legendA.weapons.map(w => (
                <span key={w} className={`tag${selectedWeapons.includes(w) ? " hl" : ""}`}>
                  {WEAPON_EMOJI[w]} {w}
                </span>
              ))}
            </div>
          </div>
          <span className="compare-vs">VS</span>
          <div className="compare-legend">
            <LegendAvatar name={legendB.name} size={60} />
            <p className="compare-name">{legendB.name}</p>
            <div className="w-tags" style={{justifyContent:"center"}}>
              {legendB.weapons.map(w => (
                <span key={w} className={`tag${selectedWeapons.includes(w) ? " hl" : ""}`}>
                  {WEAPON_EMOJI[w]} {w}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="compare-stats">
          {stats.map(s => {
            const aVal = legendA.stats[s];
            const bVal = legendB.stats[s];
            const aWins = aVal > bVal;
            const bWins = bVal > aVal;
            return (
              <div key={s} className="compare-stat-row">
                <span className={`compare-stat-val ${aWins ? "stat-winner" : ""}`}>{aVal}</span>
                <div className="compare-stat-bars">
                  <div className="compare-bar-wrap compare-bar-left">
                    <div className="compare-bar-fill" style={{
                      width: `${(aVal/9)*100}%`,
                      background: STAT_COLORS[s],
                      opacity: aWins ? 1 : 0.5
                    }} />
                  </div>
                  <span className="compare-stat-label">{labels[s]}</span>
                  <div className="compare-bar-wrap compare-bar-right">
                    <div className="compare-bar-fill" style={{
                      width: `${(bVal/9)*100}%`,
                      background: STAT_COLORS[s],
                      opacity: bWins ? 1 : 0.5
                    }} />
                  </div>
                </div>
                <span className={`compare-stat-val ${bWins ? "stat-winner" : ""}`}>{bVal}</span>
              </div>
            );
          })}
        </div>
        <div className="compare-summary">
          {(() => {
            const aTotal = stats.reduce((s, k) => s + legendA.stats[k], 0);
            const bTotal = stats.reduce((s, k) => s + legendB.stats[k], 0);
            const aWins = stats.filter(k => legendA.stats[k] > legendB.stats[k]).length;
            const bWins = stats.filter(k => legendB.stats[k] > legendA.stats[k]).length;
            return (
              <p className="compare-verdict">
                <strong style={{color: "var(--accent)"}}>{legendA.name}</strong> wins {aWins} stats &nbsp;·&nbsp;
                <strong style={{color: "var(--accent)"}}>{legendB.name}</strong> wins {bWins} stats
              </p>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

/* ─── LEGEND CARD ─── */
function LegendCard({ legend, selected, index, onWeaponClick, isFav, onToggleFav, compareMode, onAddCompare, isCompareA, isCompareB }) {
  const [expanded, setExpanded] = useState(false);
  const { name, weapons, stats } = legend;
  const wikiUrl = `${WIKI_BASE}${encodeURIComponent(name.replace(/\s+/g, "_"))}`;

  let cardClass = "legend-card";
  if (expanded) cardClass += " expanded";
  if (isCompareA) cardClass += " compare-a";
  if (isCompareB) cardClass += " compare-b";

  return (
    <div className={cardClass} style={{ animationDelay: `${index * 0.04}s` }}>
      <div className="card-main" onClick={() => compareMode ? onAddCompare(legend) : setExpanded(e => !e)}>
        <div className="card-top-actions">
          <button
            className={`fav-btn${isFav ? " fav-active" : ""}`}
            onClick={e => { e.stopPropagation(); onToggleFav(name); }}
            title={isFav ? "Remove favourite" : "Add to favourites"}
          >
            {isFav ? "★" : "☆"}
          </button>
          {compareMode && (
            <span className="compare-badge">
              {isCompareA ? "A" : isCompareB ? "B" : "+"}
            </span>
          )}
        </div>
        <LegendAvatar name={name} />
        <p className="l-name">{name}</p>
        <div className="w-tags">
          {weapons.map(ww => (
            <span key={ww} className={`tag${selected.includes(ww) ? " hl" : ""}`}>
              {WEAPON_EMOJI[ww]} {ww}
            </span>
          ))}
        </div>
        {!compareMode && <span className="expand-hint">{expanded ? "▲ less" : "▼ stats"}</span>}
        {compareMode && (
          <span className="expand-hint">
            {isCompareA ? "◀ Legend A" : isCompareB ? "Legend B ▶" : "Click to compare"}
          </span>
        )}
      </div>

      {expanded && !compareMode && (
        <div className="card-stats">
          <StatBar label="STR" value={stats.str} color={STAT_COLORS.str} />
          <StatBar label="DEX" value={stats.dex} color={STAT_COLORS.dex} />
          <StatBar label="DEF" value={stats.def} color={STAT_COLORS.def} />
          <StatBar label="SPD" value={stats.spd} color={STAT_COLORS.spd} />
          <div className="card-actions">
            <button
              className="similar-btn"
              onClick={e => { e.stopPropagation(); onWeaponClick(name); }}
              title="Find legends that share a weapon"
            >
              ⟳ Similar
            </button>
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
              onClick={e => e.stopPropagation()}
            >
              📖 Wiki ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SORT OPTIONS ─── */
const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "name", label: "Name" },
  { id: "str", label: "Strength ↓" },
  { id: "dex", label: "Dexterity ↓" },
  { id: "def", label: "Defense ↓" },
  { id: "spd", label: "Speed ↓" },
];

/* ─── MAIN APP ─── */
export default function App() {
  const [selected, setSelected] = useState(getWeaponsFromURL);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [similarTo, setSimilarTo] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [showFavsOnly, setShowFavsOnly] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareA, setCompareA] = useState(null);
  const [compareB, setCompareB] = useState(null);
  const [showCompare, setShowCompare] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("bh-theme") || "dark");
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bh-favs") || "[]"); } catch { return []; }
  });

  const searchInputRef = useRef(null);

  // Persist favs
  useEffect(() => {
    localStorage.setItem("bh-favs", JSON.stringify(favs));
  }, [favs]);

  // Persist theme + apply
  useEffect(() => {
    localStorage.setItem("bh-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Sync URL
  useEffect(() => { setWeaponsInURL(selected); }, [selected]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e) {
      // Escape = reset
      if (e.key === "Escape") {
        if (showCompare) { setShowCompare(false); return; }
        setSelected([]); setSimilarTo(null); setSearch(""); setCompareMode(false);
        setCompareA(null); setCompareB(null);
        return;
      }
      // / or f = focus search
      if ((e.key === "/" || e.key === "f") && !e.ctrlKey && !e.metaKey) {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      // r = random
      if (e.key === "r" && !e.ctrlKey && !e.metaKey) {
        const active = document.activeElement;
        if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
        pickRandom();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showCompare, selected, similarTo]);

  function copyShareUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const validSecondWeapons = useMemo(() => {
    if (selected.length !== 1) return null;
    const set = new Set();
    LEGENDS.forEach(l => {
      if (l.weapons.includes(selected[0]))
        l.weapons.forEach(w => { if (w !== selected[0]) set.add(w); });
    });
    return set;
  }, [selected]);

  const baseResults = useMemo(() => {
    if (selected.length === 0) return null;
    return LEGENDS.filter(l =>
      selected.every(w => l.weapons.includes(w)) &&
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [selected, search]);

  const results = useMemo(() => {
    if (!baseResults) return null;
    let arr = [...baseResults];
    if (showFavsOnly) arr = arr.filter(l => favs.includes(l.name));
    if (sortBy === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "str") arr.sort((a, b) => b.stats.str - a.stats.str);
    else if (sortBy === "dex") arr.sort((a, b) => b.stats.dex - a.stats.dex);
    else if (sortBy === "def") arr.sort((a, b) => b.stats.def - a.stats.def);
    else if (sortBy === "spd") arr.sort((a, b) => b.stats.spd - a.stats.spd);
    return arr;
  }, [baseResults, sortBy, showFavsOnly, favs]);

  const similarResults = useMemo(() => {
    if (!similarTo) return null;
    const legend = LEGENDS.find(l => l.name === similarTo);
    if (!legend) return null;
    let arr = LEGENDS.filter(l =>
      l.name !== similarTo &&
      l.weapons.some(w => legend.weapons.includes(w)) &&
      l.name.toLowerCase().includes(search.toLowerCase())
    );
    if (showFavsOnly) arr = arr.filter(l => favs.includes(l.name));
    if (sortBy === "name") arr.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "str") arr.sort((a, b) => b.stats.str - a.stats.str);
    else if (sortBy === "dex") arr.sort((a, b) => b.stats.dex - a.stats.dex);
    else if (sortBy === "def") arr.sort((a, b) => b.stats.def - a.stats.def);
    else if (sortBy === "spd") arr.sort((a, b) => b.stats.spd - a.stats.spd);
    return arr;
  }, [similarTo, search, sortBy, showFavsOnly, favs]);

  function toggleWeapon(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length < 2 ? [...prev, id] : prev
    );
    setSimilarTo(null);
  }

  function handleSimilar(legendName) {
    setSimilarTo(legendName);
    setSelected([]);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleFav(name) {
    setFavs(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  }

  function pickRandom() {
    const pool = results || similarResults;
    if (!pool || pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    // Flash highlight
    const el = document.querySelector(`[data-legend="${pick.name}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("random-flash");
      setTimeout(() => el.classList.remove("random-flash"), 1200);
    }
  }

  function handleAddCompare(legend) {
    if (!compareA) {
      setCompareA(legend);
    } else if (!compareB && legend.name !== compareA.name) {
      setCompareB(legend);
      setShowCompare(true);
    } else if (legend.name === compareA?.name) {
      setCompareA(null);
    } else {
      setCompareA(legend);
      setCompareB(null);
    }
  }

  const visibleWeapons = useMemo(() => {
    if (activeCategory === "All") return WEAPONS;
    return WEAPONS.filter(w => WEAPON_CATEGORIES[w.id] === activeCategory);
  }, [activeCategory]);

  const categories = ["All", "Melee", "Ranged", "Hybrid"];

  const noResultsOtherWeapons = useMemo(() => {
    if (!results || results.length > 0 || selected.length < 2) return null;
    return selected.map(w => ({
      weapon: w,
      legends: LEGENDS.filter(l => l.weapons.includes(w))
    }));
  }, [results, selected]);

  const activeResults = results || similarResults;
  const showSearch = activeResults && activeResults.length > 3;
  const showSortBar = activeResults && activeResults.length > 1;

  return (
    <div className="app" data-theme={theme}>
      <div className="bg-grid" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* ── THEME TOGGLE ── */}
      <button className="theme-toggle" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Toggle theme">
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <header>
        <p className="eyebrow">BRAWLHALLA</p>
        <h1>Triple<br />Threat</h1>
        <p className="tagline">Legend Finder</p>
      </header>

      <main>
        {/* ── Selection pills ── */}
        <div className="sel-row">
          <SelSlot label="Weapon 1" value={selected[0]}
            onRemove={() => { setSelected(p => p.filter(x => x !== selected[0])); setSimilarTo(null); }} />
          <span className="sel-plus">+</span>
          <SelSlot label="Weapon 2" value={selected[1]}
            onRemove={() => { setSelected(p => p.filter(x => x !== selected[1])); setSimilarTo(null); }} />
          {selected.length > 0 && (
            <button className="share-btn" onClick={copyShareUrl} title="Copy shareable link">
              {copied ? "✓ Copied!" : "🔗 Share"}
            </button>
          )}
        </div>

        {/* ── Similar mode banner ── */}
        {similarTo && (
          <div className="similar-banner">
            <span>Showing legends that share a weapon with <strong>{similarTo}</strong></span>
            <button onClick={() => setSimilarTo(null)}>✕ Clear</button>
          </div>
        )}

        {/* ── Weapon picker ── */}
        <section className="picker-panel">
          <div className="picker-top">
            <p className="picker-heading">
              {similarTo
                ? <><span className="step-num done">⟳</span> Browse by weapon</>
                : selected.length === 0
                ? <><span className="step-num">01</span> Choose First Weapon</>
                : selected.length === 1
                ? <><span className="step-num">02</span> Choose Second Weapon</>
                : <><span className="step-num done">✓</span> Combo Locked In</>}
            </p>
            <div className="cat-tabs">
              {categories.map(c => (
                <button key={c} className={`cat-tab${activeCategory === c ? " active" : ""}`}
                  onClick={() => setActiveCategory(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="weapon-grid">
            {visibleWeapons.map(w => {
              const isSel = selected.includes(w.id);
              const isDimmed =
                (!isSel && selected.length === 2) ||
                (!isSel && validSecondWeapons !== null && !validSecondWeapons.has(w.id));
              return (
                <button
                  key={w.id}
                  className={`weapon-btn${isSel ? " selected" : ""}${isDimmed ? " dimmed" : ""}`}
                  onClick={() => toggleWeapon(w.id)}
                  disabled={isDimmed}
                >
                  <WeaponImg id={w.id} className="btn-weapon-img" />
                  <span className="w-label">{w.id}</span>
                  <span className="w-cat">{WEAPON_CATEGORIES[w.id]}</span>
                  {isSel && <span className="w-check">✓</span>}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Results ── */}
        {(results !== null || similarTo) && (
          <section className="results">
            {selected.length === 2 && (
              <button className="reset-btn" onClick={() => { setSelected([]); setSimilarTo(null); setSortBy("default"); setCompareMode(false); setCompareA(null); setCompareB(null); }}>
                ↺ Reset
              </button>
            )}

            {/* Search bar */}
            {showSearch && (
              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  ref={searchInputRef}
                  className="search-input"
                  type="text"
                  placeholder="Search legends… (press / to focus)"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className="search-clear" onClick={() => setSearch("")}>✕</button>
                )}
              </div>
            )}

            {/* Sort / Filter toolbar */}
            {showSortBar && (
              <div className="toolbar">
                <div className="toolbar-left">
                  <span className="toolbar-label">Sort:</span>
                  <div className="sort-tabs">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        className={`sort-tab${sortBy === opt.id ? " active" : ""}`}
                        onClick={() => setSortBy(opt.id)}
                      >{opt.label}</button>
                    ))}
                  </div>
                </div>
                <div className="toolbar-right">
                  {favs.length > 0 && (
                    <button
                      className={`fav-filter-btn${showFavsOnly ? " active" : ""}`}
                      onClick={() => setShowFavsOnly(f => !f)}
                    >
                      ★ Favs only
                    </button>
                  )}
                  <button
                    className={`compare-toggle-btn${compareMode ? " active" : ""}`}
                    onClick={() => { setCompareMode(m => !m); setCompareA(null); setCompareB(null); setShowCompare(false); }}
                    title="Compare two legends side by side"
                  >
                    ⚔ Compare
                  </button>
                  <button
                    className="random-btn"
                    onClick={pickRandom}
                    title="Pick a random legend (press R)"
                  >
                    🎲 Random
                  </button>
                </div>
              </div>
            )}

            {compareMode && (
              <div className="compare-hint">
                {!compareA ? "Click a legend to select as Legend A"
                  : !compareB ? `Legend A: ${compareA.name} — now pick Legend B`
                  : ""}
              </div>
            )}

            {/* No results */}
            {results && results.length === 0 && !similarTo && (
              <div className="no-results">
                <p className="no-main">No legend uses this exact combination</p>
                {noResultsOtherWeapons && (
                  <div className="no-fallback">
                    {noResultsOtherWeapons.map(({ weapon, legends }) => (
                      <div key={weapon} className="no-fallback-group">
                        <p className="no-fallback-label">
                          {WEAPON_EMOJI[weapon]} <strong>{weapon}</strong> is used by:
                        </p>
                        <div className="no-fallback-names">
                          {legends.map(l => <span key={l.name} className="no-name">{l.name}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Normal results */}
            {results && results.length > 0 && (
              <>
                <div className="results-meta">
                  <h2 className="results-title">
                    {selected.length === 2
                      ? <>{selected[0]} <span className="dim">+</span> {selected[1]}</>
                      : <>Legends with {selected[0]}</>}
                  </h2>
                  <span className="count">{results.length} found</span>
                </div>
                <div className="results-grid">
                  {results.map((l, i) => (
                    <div key={l.name} data-legend={l.name}>
                      <LegendCard
                        legend={l}
                        selected={selected}
                        index={i}
                        onWeaponClick={handleSimilar}
                        isFav={favs.includes(l.name)}
                        onToggleFav={toggleFav}
                        compareMode={compareMode}
                        onAddCompare={handleAddCompare}
                        isCompareA={compareA?.name === l.name}
                        isCompareB={compareB?.name === l.name}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Similar mode results */}
            {similarTo && similarResults && (
              <>
                <div className="results-meta">
                  <h2 className="results-title">Similar to <span>{similarTo}</span></h2>
                  <span className="count">{similarResults.length} found</span>
                </div>
                <div className="results-grid">
                  {similarResults.map((l, i) => (
                    <div key={l.name} data-legend={l.name}>
                      <LegendCard
                        legend={l}
                        selected={[]}
                        index={i}
                        onWeaponClick={handleSimilar}
                        isFav={favs.includes(l.name)}
                        onToggleFav={toggleFav}
                        compareMode={compareMode}
                        onAddCompare={handleAddCompare}
                        isCompareA={compareA?.name === l.name}
                        isCompareB={compareB?.name === l.name}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {selected.length === 0 && !similarTo && (
          <p className="start-hint">Select a weapon above to begin · Press <kbd>R</kbd> for random · <kbd>Esc</kbd> to reset</p>
        )}
      </main>

      {/* ── Comparison overlay ── */}
      {showCompare && compareA && compareB && (
        <ComparePanel
          legendA={compareA}
          legendB={compareB}
          onClose={() => { setShowCompare(false); setCompareA(null); setCompareB(null); }}
          selectedWeapons={selected}
        />
      )}

      {/* ── Footer ── */}
      <footer className="app-footer">
        <span>{LEGENDS.length} legends in database · Triple Threat Legend Finder</span>
        <span className="kbd-hints">
          <kbd>Esc</kbd> reset &nbsp; <kbd>/</kbd> search &nbsp; <kbd>R</kbd> random
        </span>
      </footer>
    </div>
  );
}
