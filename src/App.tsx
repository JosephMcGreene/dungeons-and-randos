import { useState } from "react";
import "./scss/App.scss";
import generateCharacter from "./helpers";
import type { Character } from "./types/char-interfaces";

import LoadingSpinner from "./components/LoadingSpinner";
import PreferencesForm from "./components/PreferencesForm";
import CharacterSection from "./components/CharacterSection";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [character, setCharacter] = useState<Character | undefined>();

  async function applyPreferences() {
    try {
      setLoading(true);
      setCharacter(await generateCharacter());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="App">
      <PreferencesForm onSubmit={() => applyPreferences()} />
      <CharacterSection character={character} />
    </div>
  );
}
