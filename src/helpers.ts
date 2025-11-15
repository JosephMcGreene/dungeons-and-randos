import axios from "axios";
import type { Character, AbilityScores } from "./types/char-interfaces";
import type { APIData, AxiosResponse } from "./types/api-interfaces";

/**
 * Uses randomized data fetched from the DnD 5e API to form a D&D character with random attributes
 * @returns {Character} an object representing the randomly generated character
 */
export default async function generateCharacter(): Promise<Character> {
  const race = await randomCharacteristic("/races");
  const charClass = await randomCharacteristic("/classes");
  const abilityScores: AbilityScores = generateAbilityScores({
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  });
  const age: number = randomNumberLessThan(100);
  const alignment = await randomCharacteristic("/alignments");
  const secondLanguage = await randomCharacteristic("/languages");

  setHighestAbililtyScore(abilityScores, charClass);

  let character: Character = {
    race,
    charClass,
    abilityScores,
    age,
    alignment,
    secondLanguage,
  };

  return character;
}

/**
 * Generates a random integer that is no larger than the argument minus 1
 * @param   {number} maxNumber number representing the highest possible number for the function call, either hard-coded or derived from an array length
 * @returns {number}           a random integer no larger than the function's argument - 1
 */
function randomNumberLessThan(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber);
}

/**
 * fetches all kinds of character data from the DnD 5e API using various endpoints from https://www.dnd5eapi.co/api/
 * @param   {string}  endpoint the URL of the DnD 5e API: the base endpoint + an extension for various data needs
 * @returns {APIData}          the "data" object from axios's response object
 */
export async function axiosFetch(endpoint: string): Promise<APIData> {
  const dndURL: string = "https://www.dnd5eapi.co/api/2014";

  try {
    const axiosResponse: AxiosResponse = await axios({
      method: "get",
      url: `${dndURL}${endpoint}`,
    });
    return axiosResponse.data;
  } catch (err) {
    throw err;
  }
}

/**
 * fetches set of data that corresponds to the 5e DnD API endpoint passed as an argument and returns the name of a randomly chosen piece of data from that endpoint
 * @param   {string} endpoint a string that corresponds to the type of data needed, e.g. "/races" or "/classes"
 * @returns {string}          the name of the randomly chosen resource
 */
async function randomCharacteristic(
  endpoint: string
): Promise<string | undefined> {
  const data: APIData = await axiosFetch(endpoint);
  const randomIndex: number = randomNumberLessThan(data.count);
  return data.results[randomIndex].name;
}

/**
 * Rolls four 6-sided dice, removes the value of the lowest roll from the group, and returns the sum of the remaining three values.
 * https://mykindofmeeple.com/how-to-roll-stats-in-dnd-pros-cons/
 * @returns {number} integer that is the sum of the 3 remaining dice rolls after "dropping" the lowest of 4 dice rolls
 */
function rollOneAbilityScore(): number {
  const diceRolls: number[] = [];

  for (let i = 0; i < 4; i++) {
    diceRolls.push(randomNumberLessThan(6) + 1); //6-sided dice
  }
  diceRolls.sort().shift(); //remove lowest die roll

  return diceRolls.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
}

/**
 * Generates the values of the character's basic ability scores
 * @param   {object<AbilityScores>} abilities an object whose keys are the six basic abilities
 * @returns {object<AbilityScores>} an object who values represent the character's final ability scores
 */
function generateAbilityScores(abilities: AbilityScores): AbilityScores {
  for (const ability in abilities) {
    abilities[ability as keyof AbilityScores] = rollOneAbilityScore();
  }
  return abilities;
}

function highestAndLowestScore(abilityScores: AbilityScores) {
  let lowestScoreKey: string = "";
  let lowestScoreVal: number = 100;

  let highestScoreKey: string = "";
  let highestScoreVal: number = 0;

  for (const score in abilityScores) {
    if (abilityScores[score] < lowestScoreVal) {
      lowestScoreKey = score;
      lowestScoreVal = abilityScores[score];
    }
    if (abilityScores[score] > highestScoreVal) {
      highestScoreKey = score;
      highestScoreVal = abilityScores[score];
    }
  }

  return [
    { key: lowestScoreKey, val: lowestScoreVal },
    { key: highestScoreKey, val: highestScoreVal },
  ];
}

function setHighestAbililtyScore(
  abilityScores: AbilityScores,
  charClass: string
) {
  const lowestAndHighestScore = highestAndLowestScore(abilityScores);
  const lowestScore = lowestAndHighestScore[0].key;
  const highestScore = lowestAndHighestScore[1].key;

  console.log(abilityScores[lowestScore]);

  switch (charClass) {
    case "Barbarian":
      abilityScores[highestScore.key] = abilityScores.strength;
      abilityScores.strength = highestScore.val;
      abilityScores[lowestScore.key] = lowestScore.val;
      break;
    case "Bard":
      break;
    case "Cleric":
      break;
    case "Druid":
      break;
    case "Fighter":
      break;
    case "Monk":
      break;
    case "Paladin":
      break;
    case "Ranger":
      break;
    case "Rogue":
      break;
    case "Sorcerer":
      break;
    case "Warlock":
      break;
    case "Wizard":
      break;
  }
}
