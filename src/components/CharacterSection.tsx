import { Character } from "../types/char-interfaces";

interface Props {
  character: Character | undefined;
}

export default function CharacterSection({ character }: Props) {
  return (
    <section className="character-section">
      <h1>
        {character?.race} {character?.charClass}
      </h1>
      <ul id="abilityScores" className="abilities-list">
        <li className="abilities-li">
          Strength: <b>{character?.abilityScores?.strength}</b>
        </li>
        <li className="abilities-li">
          Dexterity: <b>{character?.abilityScores?.dexterity}</b>
        </li>
        <li className="abilities-li">
          Constitution: <b>{character?.abilityScores?.constitution}</b>
        </li>
        <li className="abilities-li">
          Intelligence: <b>{character?.abilityScores?.intelligence}</b>
        </li>
        <li className="abilities-li">
          Wisdom: <b>{character?.abilityScores?.wisdom}</b>
        </li>
        <li className="abilities-li">
          Charisma: <b>{character?.abilityScores?.charisma}</b>
        </li>
      </ul>
      <div className="little-details">
        <h3>Age: {character?.age}</h3>
        <h3>Alignment: {character?.alignment}</h3>
        <h3>Second Language: {character?.secondLanguage}</h3>
      </div>
    </section>
  );
}
