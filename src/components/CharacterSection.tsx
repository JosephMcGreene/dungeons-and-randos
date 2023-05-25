import { Character } from "../types/char-interfaces";

interface Props {
  character: Character | null;
}

export default function CharacterSection({ character }: Props) {
  return (
    <section>
      <h2>Race: {character!.race}</h2>
      <h2>Class: {character!.charClass}</h2>
      <p>Age: {character!.age}</p>
      <h3>Abilities:</h3>
      <ul className="abilities-list">
        <li>Strength: {character!.abilityScores.strength}</li>
        <li>Dexterity: {character!.abilityScores.dexterity}</li>
        <li>Constitution: {character!.abilityScores.constitution}</li>
        <li>Intelligence: {character!.abilityScores.intelligence}</li>
        <li>Wisdom: {character!.abilityScores.wisdom}</li>
        <li>Charisma: {character!.abilityScores.charisma}</li>
      </ul>
    </section>
  );
}
