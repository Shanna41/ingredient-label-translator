import { useMemo, useState } from "react";
import IngredientInput from "./components/IngredientInput";
import IngredientResults from "./components/IngredientResults";
import LogoUploader from "./components/LogoUploader";
import ingredientsData from "./data/ingredients_with_effect.json";
import logoImg from "./assets/DNA Sphere logo.png";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [disclaimerText, setDisclaimerText] = useState(
    "Disclaimer: This report is for educational purposes only and should not be considered medical advice. Please consult a qualified healthcare professional before making dietary or health decisions."
  );

  // Build a fast lookup map: name + each alias → ingredient
  const indexMap = useMemo(() => {
    const map = new Map();
    for (const ing of ingredientsData) {
      const key = (ing.name || "").trim().toLowerCase();
      if (key) map.set(key, ing);
      if (Array.isArray(ing.aliases)) {
        for (const a of ing.aliases) {
          const ak = (a || "").trim().toLowerCase();
          if (ak && !map.has(ak)) map.set(ak, ing);
        }
      }
    }
    return map;
  }, []);

  const handleTranslate = (inputText) => {
    setLoading(true);

    const raw = (inputText || "").toLowerCase();
    // split by commas, semicolons, slashes, parentheses and extra spaces
    const tokens = raw
     .split(/[,;()/]|\b(?:and|or)\b/gi)
     .map(t => t.trim())
     .filter(Boolean);


    const matchedMap = new Map();

    // token-based exact/alias matches
    for (const t of tokens) {
      const ing = indexMap.get(t);
      if (ing) matchedMap.set(ing.name, ing);
    }

    // fallback: substring scan for multi-word ingredients (e.g., "monosodium glutamate")
    if (matchedMap.size === 0) {
      for (const ing of ingredientsData) {
        const name = (ing.name || "").toLowerCase();
        const hitByName = name && raw.includes(name);
        const hitByAlias =
          Array.isArray(ing.aliases) &&
          ing.aliases.some((a) => raw.includes((a || "").toLowerCase()));
        if (hitByName || hitByAlias) matchedMap.set(ing.name, ing);
      }
    }

    const list = Array.from(matchedMap.values());
    setResults(
      list.length
        ? list
        : [
            {
              name: "Unknown Ingredient",
              aliases: [],
              category: "N/A",
              type: "N/A",
              effect: "No data available.",
            },
          ]
    );

    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <img src={logoImg} alt="DNA Sphere Logo" className="app-logo-img" />
          <h1 className="app-title">Powered by DNA Sphere</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="card">
          <h2 className="card-title">Decode Food Labels with Clarity</h2>

          <IngredientInput onTranslate={handleTranslate} />
          <LogoUploader onLogoUpload={setLogo} />

          <div className="disclaimer-box">
            <label className="disclaimer-label">Custom Disclaimer (optional)</label>
            <textarea
              rows={2}
              value={disclaimerText}
              onChange={(e) => setDisclaimerText(e.target.value)}
              className="disclaimer-textarea"
            />
          </div>

          {loading && <div className="loading">Loading...</div>}
        </div>

        {searched && !loading && (
          <div className="results-wrap">
            <IngredientResults
              results={results}
              logo={logo}
              disclaimerText={disclaimerText}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
