import { useState } from "react";
import { TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const tabs = ["Simulation", "Mes Vœux"];

export default function App() {
  const [tab, setTab] = useState("Simulation");
  const [rang, setRang] = useState(1);
  const [resultats, setResultats] = useState([]);
  const [voeux, setVoeux] = useState(Array(10).fill(""));
  const [resultatsVoeux, setResultatsVoeux] = useState([]);

  const academies = [
    { name: "Aix-Marseille", pressure: 75, places: 25, fermeture: 426 },
    { name: "Amiens", pressure: 56, places: 39, fermeture: 571 },
    { name: "Besançon", pressure: 44, places: 22, fermeture: 727 },
    { name: "Bordeaux", pressure: 127, places: 19, fermeture: 252 },
    { name: "Clermont-Ferrand", pressure: 75, places: 14, fermeture: 426 },
    { name: "Corse", pressure: 67, places: 5, fermeture: 239 },
    { name: "Créteil", pressure: 56, places: 77, fermeture: 571 },
    { name: "Dijon", pressure: 50, places: 28, fermeture: 640 },
    { name: "Grenoble", pressure: 56, places: 39, fermeture: 571 },
    { name: "Lille", pressure: 105, places: 33, fermeture: 305 },
    { name: "Limoges", pressure: 70, places: 9, fermeture: 457 },
    { name: "Lyon", pressure: 44, places: 35, fermeture: 727 },
    { name: "Montpellier", pressure: 262, places: 11, fermeture: 122 },
    { name: "Nancy-Metz", pressure: 62, places: 33, fermeture: 516 },
    { name: "Nantes", pressure: 65, places: 30, fermeture: 492 },
    { name: "Nice", pressure: 211, places: 8, fermeture: 151 },
    { name: "Normandie", pressure: 43, places: 39, fermeture: 744 },
    { name: "Orléans-Tours", pressure: 65, places: 43, fermeture: 492 },
    { name: "Paris", pressure: 333, places: 5, fermeture: 96 },
    { name: "Poitiers", pressure: 100, places: 16, fermeture: 320 },
    { name: "Reims", pressure: 45, places: 26, fermeture: 711 },
    { name: "Rennes", pressure: 150, places: 10, fermeture: 213 },
    { name: "Strasbourg", pressure: 131, places: 14, fermeture: 244 },
    { name: "Toulouse", pressure: 90, places: 27, fermeture: 355 },
    { name: "Versailles", pressure: 57, places: 91, fermeture: 561 }
  ];

  const calculerAccessibles = () => {
    const accessibles = academies
      .map(a => ({ ...a, adjustedPlaces: Math.floor(a.places * 0.9) }))
      .filter(a => rang <= a.fermeture && a.adjustedPlaces > 0)
      .sort((a, b) => a.fermeture - b.fermeture);
    setResultats(accessibles);
  };

  const calculerVoeux = () => {
    const resultats = voeux.map(voeu => {
      const acad = academies.find(a => a.name === voeu);
      if (!acad) return { name: voeu, chance: 0 };
      const diff = acad.fermeture - rang;
      const chance = Math.max(0, Math.min(100, (diff / acad.fermeture) * 100));
      return { name: voeu, chance: Math.round(chance) };
    });
    setResultatsVoeux(resultats);
  };

  const getBackgroundColor = (chance) => {
    if (chance >= 80) return "bg-green-200";
    if (chance >= 50) return "bg-yellow-200";
    if (chance >= 20) return "bg-orange-200";
    return "bg-red-200";
  };

  const getPressureColor = (pressure) => {
    if (pressure >= 100) return "🔴";
    if (pressure >= 60) return "🟠";
    return "🟢";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          Simulateur PERDIR 2025
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Estimez vos opportunités d'affectation selon votre rang et vos vœux.
        </p>
      </header>

      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${tab === item ? "bg-indigo-600 text-white" : "bg-white border border-indigo-600 text-indigo-600"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Simulation" && (
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              value={rang}
              onChange={(e) => setRang(Number(e.target.value))}
              className="border p-3 rounded-lg shadow w-48 text-lg"
              placeholder="Votre rang"
            />
            <button
              onClick={calculerAccessibles}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow text-lg"
            >
              Voir les académies
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {resultats.map((a, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <h2 className="text-2xl font-semibold text-indigo-800 mb-2">{a.name}</h2>
                <p className="text-gray-700 flex items-center gap-2">
                  {getPressureColor(a.pressure)} <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Tension : <span className="font-bold">{a.pressure}%</span>
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Places restantes : <span className="font-bold">{Math.floor(a.places * 0.9)}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "Mes Vœux" && (
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              value={rang}
              onChange={(e) => setRang(Number(e.target.value))}
              className="border p-3 rounded-lg shadow w-48 text-lg"
              placeholder="Votre rang"
            />
            <button
              onClick={calculerVoeux}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow text-lg"
            >
              Simuler mes chances
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {voeux.map((v, idx) => (
              <select
                key={idx}
                value={v}
                onChange={(e) => {
                  const newVoeux = [...voeux];
                  newVoeux[idx] = e.target.value;
                  setVoeux(newVoeux);
                }}
                className="border p-3 rounded-lg shadow w-64 text-lg"
              >
                <option value="">Choisir une académie...</option>
                {academies.map((a, aidx) => (
                  <option key={aidx} value={a.name}>{a.name}</option>
                ))}
              </select>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {resultatsVoeux.map((r, idx) => (
              <motion.div
                key={idx}
                className={`p-6 rounded-2xl shadow-md hover:shadow-lg transition ${getBackgroundColor(r.chance)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <h2 className="text-2xl font-semibold text-indigo-800 mb-2">{r.name}</h2>
                <p className="text-gray-700">
                  Chance d'affectation : <span className="font-bold">{r.chance}%</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-sm text-gray-500">
        <div className="bg-yellow-100 p-4 rounded-lg inline-block max-w-2xl mx-auto">
          <strong>Avertissement :</strong> Ce simulateur est une aide à la décision. Il repose sur des données passées (année 2024) et ne préjuge pas des affectations réelles. Les informations fournies ne sont pas officielles.
        </div>
      </footer>
    </div>
  );
}
