import { SyntheticEvent, useState } from "react";

interface Props {
  onSubmit: Function;
}

export default function PreferencesForm({ onSubmit }: Props) {
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <button type="submit">Make a Character</button>
    </form>
  );
}
