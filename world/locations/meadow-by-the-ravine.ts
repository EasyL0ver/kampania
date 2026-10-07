import { Location, Narrative, Requirement, action, opportunity } from "../schema.ts";
import type { CharacterRef } from "../schema.ts";
import { Culture, Survival } from "../skills.ts";
import RavineRemains from "../items/ravine-remains.ts";
import * as clues from "../clues.ts";
import { todo } from "../todo.ts";

export default class MeadowByTheRavine extends Location {
  readonly id = "meadow-by-the-ravine";
  readonly name = "Meadow by the Ravine";
  // TODO: source has no ## Hook; written from the **Location:** header.
  readonly hook = "Deep forest between the villages, off an old hunting track.";
  readonly position = "deep forest between the villages, off an old hunting track";
  readonly visitCost = 1;
  override present(): CharacterRef[] {
    return [];
  }

  readonly setup = new Narrative({
    narration: [
      "Meadow: Open clearing at the lip of a steep ravine.",
      "Meadow: Tall grass, wildflowers, and insects fill the clearing.",
      "Ravine: Ground drops suddenly at the edge.",
      "Ravine: Water moves below, out of sight.",
      "Tree: A single old tree stands to one side.",
      "Cairn: A low moss-grown cairn of stones sits under the tree.",
      "Cairn: The cairn is deliberate, not natural rockfall.",
    ],
    gives: { aware: [MeadowByTheRavine] },
  });

  // TODO: **Available:** (neighbour-believes-jagna-dead, dudka-buried-a-friend-at-the-ravine,
  // or The Hunt with Dudka) not modelled; locations have no availability gate.

  // ------------------------------------------------------------ actions

  readonly allActions = {
    // "Found the cairn": the cairn is in Setup, so being here is enough; omitted.
    openTheGrave: action({
      label: "Open the grave",
      requires: [new Requirement("Dudka would see, or hasn't allowed it.", { when: todo("Ryszard Dudka absent or permission to exhume") })],
      cost: [{ time: 1 }],
      narrative: new Narrative({
        narration: [
          "The stones lift away; underneath are a rotted coat and scattered bones without an identifiable face.",
        ],
        gives: {
          items: [RavineRemains],
          effects: (w, me) => { w.neighbour.grudgeHeld.set(me, true); },
        },
      }),
    }),
  };

  // ------------------------------------------------------------ opportunities

  readonly allOpportunities = {
    cairnAsGrave: opportunity({
      label: "Cairn as grave",
      target: { when: (_w, me) => me.has(Culture) || me.has(Survival) },
      narrative: new Narrative({
        narration: [
          "The stone stack is an old hand-built grave with no priest, marker, or name.",
        ],
        gives: { clues: [clues.DudkaBuriedAFriendAtTheRavine] },
      }),
    }),
  };

  override get actions() {
    return this.allActions;
  }

  override get opportunities() {
    return this.allOpportunities;
  }
}
