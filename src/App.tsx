import { useState } from "react";
import "./App.css";
import generateCharacter from "./helpers";
import { Character } from "./types/char-interfaces";

import PreferencesForm from "./components/PreferencesForm";
import CharacterSection from "./components/CharacterSection";

export default function App() {
  const [character, setCharacter] = useState<Character | (() => Character)>();

  async function applyPreferences(preferences) {
    setCharacter(await generateCharacter());
  }

  return (
    <div className="App">
      <PreferencesForm
        onSubmit={(preferences) => applyPreferences(preferences)}
      />
      <CharacterSection character={character} />
    </div>
  );
}
