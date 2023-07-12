import { Character } from "../types/char-interfaces";

interface Props {
  character: Character | null;
}

export default function CharacterSection({ character }: Props) {
  return (
    <section className="character-section">
      <h2>
        {character?.race} {character?.charClass}
      </h2>
      <label htmlFor="abilityScores">Ability Scores:</label>
      <ul id="abilityScores" className="abilities-list">
        <li className="abilities-li">
          Strength: {character?.abilityScores?.strength}
        </li>
        <li className="abilities-li">
          Dexterity: {character?.abilityScores?.dexterity}
        </li>
        <li className="abilities-li">
          {" "}
          Constitution:
          {character?.abilityScores?.constitution}
        </li>
        <li className="abilities-li">
          Intelligence:
          {character?.abilityScores?.intelligence}
        </li>
        <li className="abilities-li">
          Wisdom: {character?.abilityScores?.wisdom}
        </li>
        <li className="abilities-li">
          Charisma: {character?.abilityScores?.charisma}
        </li>
      </ul>
      <h3>Age: {character?.age}</h3>
      <h3>Alignment: {character?.alignment}</h3>
      <h3>Second Language: {character?.secondLanguage}</h3>
    </section>
  );
}
