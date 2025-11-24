import { SyntheticEvent } from "react";

type Props = {
  onSubmit: Function;
};

export default function PreferencesForm({ onSubmit }: Props) {
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="preferences-form" onSubmit={(e) => handleSubmit(e)}>
      <button type="submit">Make a Character</button>
    </form>
  );
}
