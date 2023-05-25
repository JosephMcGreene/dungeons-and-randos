import { useState } from "react";
import {
  races,
  classes,
  ageBrackets,
  ageBracketNumbers,
} from "../utils/resources";

import { getRace, letGoOfRace } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { oneLetterUpperCase } from "../utils/helpers";

export default function PreferencesForm() {
  const [preferredRace, setPreferredRace] = useState("");

  const dispatch = useDispatch();
  const currentRace = useSelector((state: any) => state.race.value);

  return (
    <form>
      <label htmlFor="race">Preferred Race:</label>
      <select
        value={currentRace}
        name="race"
        id="race"
        onChange={(evt) => {
          setPreferredRace(evt.target.value);
        }}
      >
        <option value="">--Select a Race--</option>
        <option value="any">Any</option>
        {races.map((race, index) => {
          return (
            <option key={race + index} value={race}>
              {oneLetterUpperCase(race, 0)}
            </option>
          );
        })}
      </select>

      <h4>{currentRace.preferredRace}</h4>

      <label htmlFor="class">Preferred Class:</label>
      <select name="class" id="class">
        <option value="">--Select a Class--</option>
        <option value="any">Any</option>
        {classes.map((characterClass, index) => {
          return (
            <option key={characterClass + index} value={characterClass}>
              {oneLetterUpperCase(characterClass, 0)}
            </option>
          );
        })}
      </select>
      <label htmlFor="age">Preferred Age:</label>
      <select name="age" id="age" className="select">
        <option value="">--Select an Age Range--</option>
        <option value="any">Any</option>
        {ageBrackets.map((ageBracket, index) => {
          return (
            <option key={ageBracket + index} value={ageBracket}>
              {oneLetterUpperCase(ageBracket, 0)} {ageBracketNumbers[index]}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => dispatch(getRace({ preferredRace: preferredRace }))}
      >
        Display Race
      </button>
    </form>
  );
}
