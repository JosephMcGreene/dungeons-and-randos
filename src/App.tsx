import "./App.css";
import generateCharacter from "./helpers";

export default function App() {
  return (
    <>
      <div className="App">
        <button type="submit" onClick={() => generateCharacter()}>
          Make a Character
        </button>
      </div>
    </>
  );
}
