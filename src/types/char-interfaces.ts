export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  race: string | undefined;
  charClass: string | undefined;
  abilityScores: AbilityScores | undefined;
  age: number | undefined;
  alignment: string | undefined;
  secondLanguage: string | undefined;
}
