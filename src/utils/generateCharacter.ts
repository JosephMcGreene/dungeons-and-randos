import axios from "axios";
import { Character, AbilityScores } from "../types/char-interfaces";
import { APIData, AxiosResponse } from "../types/api-interfaces";
import { randomNumberLessThan } from "./helpers";

/**
 * Uses randomized data fetched from the DnD 5e API to form a D&D character with random attributes
 * @returns {Character} an object representing the randomly generated character
 */
export default async function generateCharacter(): Promise<Character> {
  const race: string | undefined = await randomCharacteristic("/races");
  const charClass: string | undefined = await randomCharacteristic("/classes");
  const abilityScores: AbilityScores = generateAbilityScores();
  const age: number = randomNumberLessThan(101);
  const alignment: string | undefined = await randomCharacteristic(
    "/alignments"
  );
  const secondLanguage: string | undefined = await randomCharacteristic(
    "/languages"
  );

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
 * fetches character data from the DnD 5e API using various endpoints from https://www.dnd5eapi.co/api/
 * @param {string} endpoint the URL of the DnD 5e API: the base endpoint + an extension for various data needs
 * @returns {APIData}       the "data" object from axios's response object
 */
async function axiosFetch(endpoint: string): Promise<APIData> {
  const dndURL: string = "https://www.dnd5eapi.co/api/";

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
 * @see axiosFetch
 * @see randomNumberLessThan
 * @param {string} endpoint a string that corresponds to the type of data needed, e.g. "/races" or "/classes"
 * @returns {string}        the name of the randomly chosen resource
 */
async function randomCharacteristic(
  endpoint: string
): Promise<string | undefined> {
  const data: APIData = await axiosFetch(endpoint);
  const randomIndex: number = randomNumberLessThan(data.count);
  return data.results[randomIndex].name;
}

/**
 * Rolls four 6-sided dice, removes the value of the lowest roll, and returns the sum of the remaining three values.
 * https://mykindofmeeple.com/how-to-roll-stats-in-dnd-pros-cons/
 * @returns {number} integer that is the sum of the 3 remaining dice rolls after "dropping" the lowest of 4 dice rolls
 */
function rollOneAbilityScore(): number {
  const diceRolls: number[] = [];

  while (diceRolls.length < 4) {
    diceRolls.push(randomNumberLessThan(6) + 1); //6-sided dice, minimum value needs to be 1
  }

  diceRolls.sort().shift(); //remove lowest die roll

  return diceRolls.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
}

/**
 * constructs and returns an object containing random character abilities
 * @returns {object} an object consisting of randomized D&D abilities
 */
function generateAbilityScores(): AbilityScores {
  const abilities: AbilityScores = {
    strength: rollOneAbilityScore(),
    dexterity: rollOneAbilityScore(),
    constitution: rollOneAbilityScore(),
    intelligence: rollOneAbilityScore(),
    wisdom: rollOneAbilityScore(),
    charisma: rollOneAbilityScore(),
  };

  return abilities;
}
