import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import "./css/App.css";
import generateCharacter from "./utils/generateCharacter";
import { Character } from "./types/char-interfaces";
//Components
import PreferencesForm from "./components/PreferencesForm";
import CharacterSection from "./components/CharacterSection";

export default function App() {
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );

  return (
    <div className="App">
      <Provider store={store}>
        <PreferencesForm />
        <button
          className="submit-btn"
          type="submit"
          onClick={async () => setCurrentCharacter(await generateCharacter())}
        >
          Make a Character
        </button>

        {currentCharacter && <CharacterSection character={currentCharacter} />}
      </Provider>
    </div>
  );
}
