import { Character } from "../types/char-interfaces";

interface Props {
  character: Character | null;
}

export default function CharacterSection({ character }: Props) {
  return (
    <section>
      <h2>
        {character?.race} {character?.charClass}
      </h2>
      <label htmlFor="abilityScores">Ability Scores:</label>
      <ul id="abilityScores">
        <li>{character?.abilityScores?.strength}</li>
        <li>{character?.abilityScores?.dexterity}</li>
        <li>{character?.abilityScores?.constitution}</li>
        <li>{character?.abilityScores?.intelligence}</li>
        <li>{character?.abilityScores?.wisdom}</li>
        <li>{character?.abilityScores?.charisma}</li>
      </ul>
      <h3>Age: {character?.age}</h3>
      <h3>Alignment: {character?.alignment}</h3>
      <h3>Second Language: {character?.secondLanguage}</h3>
    </section>
  );
}
