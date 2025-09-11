
"use client";

import { useState } from "react";

export default function TwoPegTestApp() {
  const [distance, setDistance] = useState(0);
  const [unit, setUnit] = useState("ft");
  const [RA_mid, setRA_mid] = useState(0);
  const [RB_mid, setRB_mid] = useState(0);
  const [RA_near, setRA_near] = useState(0);
  const [RB_near, setRB_near] = useState(0);
  const [result, setResult] = useState<any>(null);

  const calculateError = () => {
    const deltaTrue = RA_mid - RB_mid;
    const deltaObs = RA_near - RB_near;
    const error = deltaObs - deltaTrue;

    let distanceFt = distance;
    if (unit === "m") {
      distanceFt = distance * 3.28084; // convert meters to feet
    }

    const errorPerFoot = error / distanceFt;
    const errorPerMeter = error / (distanceFt / 3.28084);

    setResult({ deltaTrue, deltaObs, error, errorPerFoot, errorPerMeter });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg shadow-lg rounded-2xl bg-white p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Two Peg Test Calculator
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex gap-2 items-center">
            <label className="block text-sm font-medium">Input Unit:</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border rounded p-2"
            >
              <option value="ft">Feet</option>
              <option value="m">Meters</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Distance ({unit})</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">RA (Mid)</label>
            <input
              type="number"
              value={RA_mid}
              onChange={(e) => setRA_mid(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">RB (Mid)</label>
            <input
              type="number"
              value={RB_mid}
              onChange={(e) => setRB_mid(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">RA (Near A)</label>
            <input
              type="number"
              value={RA_near}
              onChange={(e) => setRA_near(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">RB (Near A)</label>
            <input
              type="number"
              value={RB_near}
              onChange={(e) => setRB_near(Number(e.target.value))}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <button
          onClick={calculateError}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
        >
          Calculate
        </button>

        {result && (
          <div className="bg-gray-50 rounded p-4 mt-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Results</h2>

            <p>True Difference (Δtrue): <b>{result.deltaTrue.toFixed(3)}</b></p>
            <p>Observed Difference (Δobs): <b>{result.deltaObs.toFixed(3)}</b></p>
            <p>Error (E): <b>{result.error.toFixed(3)}</b></p>
            <p>Error per Foot: <b>{result.errorPerFoot.toFixed(6)}</b></p>
            <p>Error per Meter: <b>{result.errorPerMeter.toFixed(6)}</b></p>
          </div>

        )}
      </div>

    </div>

  );
}
