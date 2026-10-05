// Entities referenced by migrated files but not migrated yet.
// A stub carries only its id, name, and any state other files read or write.

import { CharacterStub, EventStub, LocationStub } from "./schema.ts";

export class Barbara extends CharacterStub {
  readonly id = "barbara";
  readonly name = "Barbara Kopacz";
  trustsCommittee = false;
  broken = false;
  acceptsHelenasTerms = false;
}

export class Babcia extends CharacterStub {
  readonly id = "babcia";
  readonly name = "Stefania Kopacz";
}

export class Neighbour extends CharacterStub {
  readonly id = "neighbour";
  readonly name = "Ryszard Dudka";
}

export class Hag extends CharacterStub {
  readonly id = "hag";
  readonly name = "Paraskewia Chyłak";
  dead = false;
}

export class Matrona extends CharacterStub {
  readonly id = "matrona";
  readonly name = "Helena Rzepka";
}

export class Wujas extends CharacterStub {
  readonly id = "wujas";
  readonly name = "Tadek Gajda";
}

export class OldVillageRuins extends LocationStub {
  readonly id = "old-village-ruins";
  readonly name = "%OLD_VILLAGE% — Homestead Ruins";
}

export class TheStore extends LocationStub {
  readonly id = "the-store";
  readonly name = "The Store";
}

export class PgrOffice extends LocationStub {
  readonly id = "pgr-office";
  readonly name = "PGR Office";
}

export class PgrFarm extends LocationStub {
  readonly id = "pgr-farm";
  readonly name = "The PGR Farm";
}

export class TheFlood extends EventStub {
  readonly id = "the-flood";
  readonly name = "The Flood";
}
