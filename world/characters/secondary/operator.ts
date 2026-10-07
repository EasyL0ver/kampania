import { Character, CharacterDescription } from "../../schema.ts";

// TODO: mechanic "Identity / Calls / Levers / Deniable tell" not modelled yet
// (see prose/characters/secondary/operator.md). Candidates: a `gasped` flag
// for the once-only tell, and relay/refuse state for the flood rescue call.
export default class Operator extends Character {
  readonly id = "operator";
  readonly name = "%OPERATOR% (the telephone-exchange operator)";
  readonly description = new CharacterDescription({
    narration: ["%OPERATOR%, the unseen telephone-exchange operator who connects the committee's long-distance calls."],
    clothes: "Not seen.",
    hairAndFace: "Not seen.",
    carriage: "Flat, professional voice on a bad line. Voice: \"Exchange. Number, please.\" \"Hold for the connection.\" \"Go ahead.\"",
    gives: { aware: [Operator] },
  });
  readonly role = "telephone-exchange operator, voice only";
}
