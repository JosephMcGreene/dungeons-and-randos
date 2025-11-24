export type AbilityScores = {
	charisma: number;
	constitution: number;
	dexterity: number;
	intelligence: number;
	strength: number;
	wisdom: number;
};

export interface Character {
	race: string | undefined;
	charClass: string | undefined;
	abilityScores: AbilityScores | undefined;
	age: number | undefined;
	alignment: string | undefined;
	secondLanguage: string | undefined;
}
