import { useState } from "react";

type TagMoodProps = {
  name: string;
};

let limit = 0;
function TagMood({ name }: TagMoodProps) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange() {
    if (isChecked) limit--;
    if (limit < 3) {
      if (!isChecked) limit++;
      setIsChecked(!isChecked);
    }
  }

  return (
    <div
      className={`bg-neutral-0 flex gap-2 rounded-[10px] px-4 py-3 ring-2 ${isChecked ? "ring-blue-600" : "ring-blue-100"} `}
    >
      <input
        type="checkbox"
        id={`feel_${name}`}
        name="feels"
        value={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <label
        htmlFor={`feel_${name}`}
        className="text-preset-6-r text-neutral-900"
      >
        {name}
      </label>
    </div>
  );
}

export default TagMood;
