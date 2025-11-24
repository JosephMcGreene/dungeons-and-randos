import axios from "axios";

import type { Character, AbilityScores } from "./types/character";
import type { APIData, AxiosResponse } from "./types/api";

/**
 * Uses randomized data fetched from the DnD 5e API to form a D&D character with random attributes
 * @returns {Character} Object representing the randomly generated character
 */
export default async function generateCharacter(): Promise<Character> {
  const charClass = await randomCharacteristic("/classes");

  return {
    race: await randomCharacteristic("/races"),
    charClass: charClass,
    abilityScores: setAbilityScores(charClass),
    age: rollDie(90),
    alignment: await randomCharacteristic("/alignments"),
    secondLanguage: await randomCharacteristic("/languages"),
  };
}

/**
 * Generates a random integer that is no larger than the argument passed.
 * @param   {number} numOfSides Integer representing the highest possible number for the function call, the "number of sides" of the die being rolled
 * @returns {number}            Random integer no larger than the argument passed.
 */
function rollDie(numOfSides: number): number {
  return Math.ceil(Math.random() * numOfSides);
}

/**
 * fetches all kinds of character data from the DnD 5e API using various endpoints from https://www.dnd5eapi.co/api/
 * @param   {string}  endpoint the URL of the DnD 5e API: the base endpoint + an extension for various data needs.
 * @returns {APIData}          the "data" object from axios's response object.
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
 * fetches set of data that corresponds to the 5e DnD API endpoint passed as an argument and returns the name of a randomly chosen piece of data from that endpoint.
 * @param   {string} endpoint a string that corresponds to the type of data needed, e.g. "/races" or "/classes".
 * @returns {string}          the name of the randomly chosen resource.
 */
async function randomCharacteristic(
  endpoint: string
): Promise<string | undefined> {
  const data: APIData = await axiosFetch(endpoint);
  const randomIndex: number = rollDie(data.count);
  return data.results[randomIndex].name;
}

/**
 * Rolls four 6-sided dice, removes the value of the lowest roll from the group, and returns the sum of the remaining three values.
 * https://mykindofmeeple.com/how-to-roll-stats-in-dnd-pros-cons/
 * @returns {number} Integer that is the sum of the 3 remaining dice rolls after "dropping" the lowest of 4 dice rolls.
 */
function rollOneAbilityScore(): number {
  const diceRolls: number[] = [];
  // Generate 4 random numbers, or 4 dice rolls
  for (let i = 0; i < 4; i++) {
    diceRolls.push(rollDie(6)); // 6-sided dice
  }
  diceRolls.sort().shift(); // Remove lowest die roll
  // prettier-ignore
  return diceRolls.reduce((accumulator: number, currentValue: number) => accumulator + currentValue);
}

/**
 * Generates the values of the character's basic ability scores and assigns the values according to the Character's class.
 * @param   {string | undefined}    Randomly chosen character class from the API-provided list of classes.
 * @returns {object<AbilityScores>} Object whose keys/values represent the character's final ability scores.
 */
function setAbilityScores(charClass: string | undefined) {
  const abilityScores: number[] = [];
  for (let i = 0; i < 6; i++) {
    abilityScores.push(rollOneAbilityScore());
  }
  abilityScores.sort((a, b) => b - a);

  let classScores: AbilityScores | undefined;

  switch (charClass) {
    case "Barbarian":
      classScores = {
        charisma: abilityScores[3],
        constitution: abilityScores[1],
        dexterity: abilityScores[2],
        intelligence: abilityScores[5],
        strength: abilityScores[0],
        wisdom: abilityScores[4],
      };
      break;
    case "Bard":
      classScores = {
        charisma: abilityScores[0],
        constitution: abilityScores[1],
        dexterity: abilityScores[5],
        intelligence: abilityScores[2],
        strength: abilityScores[3],
        wisdom: abilityScores[4],
      };
      break;
    case "Cleric":
      classScores = {
        charisma: abilityScores[4],
        constitution: abilityScores[1],
        dexterity: abilityScores[3],
        intelligence: abilityScores[2],
        strength: abilityScores[5],
        wisdom: abilityScores[0],
      };
      break;
    case "Druid":
      classScores = {
        charisma: abilityScores[4],
        constitution: abilityScores[1],
        dexterity: abilityScores[3],
        intelligence: abilityScores[2],
        strength: abilityScores[5],
        wisdom: abilityScores[0],
      };
      break;
    case "Fighter":
      classScores = {
        charisma: abilityScores[4],
        constitution: abilityScores[2],
        dexterity: abilityScores[1],
        intelligence: abilityScores[3],
        strength: abilityScores[0],
        wisdom: abilityScores[5],
      };
      break;
    case "Monk":
      classScores = {
        charisma: abilityScores[5],
        constitution: abilityScores[2],
        dexterity: abilityScores[0],
        intelligence: abilityScores[3],
        strength: abilityScores[4],
        wisdom: abilityScores[1],
      };
      break;
    case "Paladin":
      classScores = {
        charisma: abilityScores[1],
        constitution: abilityScores[0],
        dexterity: abilityScores[3],
        intelligence: abilityScores[5],
        strength: abilityScores[2],
        wisdom: abilityScores[4],
      };
      break;
    case "Ranger":
      classScores = {
        charisma: abilityScores[3],
        constitution: abilityScores[2],
        dexterity: abilityScores[0],
        intelligence: abilityScores[5],
        strength: abilityScores[4],
        wisdom: abilityScores[1],
      };
      break;
    case "Rogue":
      classScores = {
        charisma: abilityScores[2],
        constitution: abilityScores[1],
        dexterity: abilityScores[0],
        intelligence: abilityScores[3],
        strength: abilityScores[5],
        wisdom: abilityScores[4],
      };
      break;
    case "Sorcerer":
      classScores = {
        charisma: abilityScores[0],
        constitution: abilityScores[1],
        dexterity: abilityScores[4],
        intelligence: abilityScores[3],
        strength: abilityScores[5],
        wisdom: abilityScores[2],
      };
      break;
    case "Warlock":
      classScores = {
        charisma: abilityScores[0],
        constitution: abilityScores[1],
        dexterity: abilityScores[3],
        intelligence: abilityScores[5],
        strength: abilityScores[4],
        wisdom: abilityScores[2],
      };
      break;
    case "Wizard":
      classScores = {
        charisma: abilityScores[3],
        constitution: abilityScores[1],
        dexterity: abilityScores[2],
        intelligence: abilityScores[0],
        strength: abilityScores[5],
        wisdom: abilityScores[4],
      };
  }

  return classScores;
}
