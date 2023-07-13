import { useState } from "react";
import "./scss/App.scss";
import generateCharacter from "./helpers";
import { Character } from "./types/char-interfaces";

import PreferencesForm from "./components/PreferencesForm";
import CharacterSection from "./components/CharacterSection";

export default function App() {
  const [character, setCharacter] = useState<Character | undefined>();

  async function applyPreferences() {
    setCharacter(await generateCharacter());
  }

  return (
    <div className="App">
      <PreferencesForm onSubmit={() => applyPreferences()} />
      <CharacterSection character={character} />
    </div>
  );
}
