import axios from "axios";
import { Character } from "./types/char-interfaces";
import { APIData, AxiosResponse } from "./types/api-interfaces";

const dndEndpoint: string = "https://www.dnd5eapi.co/api";

/**
 * The app's "Main" function: uses randomized data fetched from the DnD 5e API to form a D&D character with random attributes
 * @returns {Character} an object representing the randomly generated character
 */
export default async function generateCharacter(): Promise<Character> {
  const race = await randomCharacteristic(`${dndEndpoint}/races`);
  const charClass = await randomCharacteristic(`${dndEndpoint}/classes`);
  const abilityScores = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };
  const age = Math.floor(Math.random() * 100);
  const alignment = await randomCharacteristic(`${dndEndpoint}/alignments`);
  const secondLanguage = await randomCharacteristic(`${dndEndpoint}/languages`);

  let character: Character = {
    race,
    charClass,
    abilityScores,
    age,
    alignment,
    secondLanguage,
  };

  console.log(character);
  return character;
}

/**
 * A utility function that generates a random integer
 * @param {number} maxNumber number representing the highest possible number for the function call, either hard-coded or derived from an array length
 * @returns a random integer no larger than the function's argument
 */
function randomNumberLessThan(maxNumber: number): number {
  return Math.floor(Math.random() * maxNumber);
}

/**
 * fetches all kinds of character data from the DnD 5e API
 * @param {string} url the URL of the DnD 5e API: the base endpoint + an extension for various data needs
 * @returns the "data" object from axios's response object
 */
export async function axiosFetch(url: string): Promise<APIData> {
  try {
    const axiosResponse: AxiosResponse = await axios({
      method: "get",
      url,
    });
    return axiosResponse.data;
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param url
 * @returns
 */
export async function randomCharacteristic(
  url: string
): Promise<string | undefined> {
  const data: APIData = await axiosFetch(url);
  const randomIndex: number = randomNumberLessThan(data.count);
  return data.results[randomIndex].name;
}

/**
 * Uses the "4d6 drop" method to generate one integer that represents a single ability score value to be plugged into the character's abilityScore's object
 * https://mykindofmeeple.com/how-to-roll-stats-in-dnd-pros-cons/
 * @returns {number} integer that is the sum of the 3 remaining dice rolls after "dropping" the lowest of 4 dice rolls
 */
export function rollOneAbilityScore(): number {
  const rolls: number[] = [];

  //roll four 6-sided dice
  for (let i = 0; i < 4; i++) {
    rolls.push(randomNumberLessThan(6) + 1);
  }

  //remove lowest die roll
  rolls.sort().shift();

  return rolls.reduce(
    (accumulator: number, currentValue: number) => accumulator + currentValue
  );
}

export function generateAbilities(abilities: object) {}
