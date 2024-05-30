import { useState } from "react";
import { initialCharacter } from "./character";

export function CharacterSheet() {
  // const [character, setCharacter] = useState(initialCharacter);
  const character = initialCharacter;
  return (
    <>
      <h2>{character.name}</h2>
      <div>level {character.level}</div>
      <div>
        health {character.health.current}/{character.health.max}
      </div>
      <div>evasion {character.evasion}</div>
      <div>armor {character.armor}</div>
      <div>coin {character.coin}</div>
      <div>xp {character.xp}</div>
      <div>
        <h3>skills</h3>
        {character.skills.map((skill) => (
          <div key={skill.id}>
            {skill.name} {skill.value}
          </div>
        ))}
      </div>
      <div>
        <h3>inventory</h3>
        {character.inventory.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </>
  );
}
