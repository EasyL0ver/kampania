# Climb the Plug

**Location:** [The Ridge Gap](../locations/the-ridge-gap.md)
**Present:** [Michał Pytlak](../characters/foreman.md) (if brought on the survey)
**Available:** At the ridge gap, holding [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap).

## Trigger

- The party decides to climb the plug for the one reading the ground cannot give.

## Hook

Facing the steep plug at the ridge gap.

## Setup

- The plug is a steep bank about two storeys high, and it climbs in three distinct pitches.
- **Lower bank (get on):** a greasy clay start; strength gets up it fastest, but a sure-footed or determined climber can scramble on too.
- **The killzone (the crossing):** a loose, exposed traverse of shifting rock. Every hold looks ready to come away under a boot; the party will want it roped and belayed.
- **The top pitch (top out):** the crest is capped by a slab of intact sandstone torn loose by the slide; from the ground it just looks like the top edge, and what it takes to get over it cannot be read from below, not even by a good eye. You only see the problem once you are under it.
- The climb is a one-person job; the rest of the party work the ground: belaying the rope, reading the line, calling up.
- The party should bring or scrounge a rope (the [PGR farm](../locations/pgr-farm.md) or [office](../locations/pgr-office.md) has line): they will want it for the traverse, and need it to haul anyone who cannot climb up to the crest.
- The top pitch has one lasting solution: a clamp driven into the soft shale seam under the slab. The tools, a clamp and a hammer (both at the [PGR farm](../locations/pgr-farm.md)), have to be carried up, which no one brings on a first blind climb.
- Why climb at all: the sill that decides overtopping into %BIG-BASIN% can be read only from the crest (the reasoning lives at [The Ridge Gap](../locations/the-ridge-gap.md)).

## Opportunities

- **The Foot of the Plug** `(noticed by: [Survival](../cards/survival.md))` — The lower bank seems easy; the traverse will need a rope. The top pitch can't be read from here.
- **Mud Underfoot** `(noticed by: [Physique](../cards/physique.md))` — Seems easy.
- **Two on the Rope** `(noticed by: [Handiwork](../cards/handiwork.md) AND [Rope](../items/rope.md))` — Securing a fall on this needs two people on the line, not one.
- **The Anatomy of a Fall** `(noticed by: [Medicine](../cards/medicine.md))` — A slip off the lower bank is bruises and mud. Off the traverse onto the rock, broken bones. From the top pitch you break badly. None of it kills you by itself; a fall here hurts, it doesn't kill.
- **A Soldier's Eye** `(noticed by: [Violence](../cards/violence.md))` — You've seen men fall. Roughly: the bank bruises, the traverse breaks bones, the top breaks you badly, but none of it puts a man in the ground. Less exact than a medic's read, close enough.
- **The Crossing** `(when: climbed past lower bank)` `(noticed by: [Physique](../cards/physique.md))` — Looks very steep, but I think I can take it.
- **A Delicate Line** `(when: climbed past lower bank)` `(noticed by: [Finesse](../cards/finesse.md))` — Steep, but there's a delicate line through it if I'm careful.
- **Worse Than It Looked** `(when: climbed past the killzone)` `(noticed by: [Physique](../cards/physique.md))` — It's much worse than I realized. I can try it, but I'm scared of falling.
- **Balance Over Force** `(when: climbed past the killzone)` `(noticed by: [Finesse](../cards/finesse.md))` — No holds worth the name, but I can balance it, barely.
- **Something to Haul Against** `(when: the crux is anchored)` `(noticed by: [Handiwork](../cards/handiwork.md))` — The clamp up top is a fixed point. You can rig a line to it and haul a body up on its own, so someone who can't climb still reaches the crest.

## Actions

### Scale the lower bank
- **Requires:** [Physique](../cards/physique.md) OR [Survival](../cards/survival.md) OR [Finesse](../cards/finesse.md)
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **Cost:** 1 time
- **Outcome:** The greasy clay gives underfoot; a strong, sure-footed, or deft climber gets up onto the plug.
- **Changes:** [Climber position](#climber-position) — past the lower bank

### Force the lower bank
- **Cost:** 1 time + 1 composure
- **Outcome:** No strength or footwork for the clay, so the climber grinds up it on nerve alone.
- **Changes:** [Climber position](#climber-position) — past the lower bank

### Take the line
- **Requires:** [rope](../items/rope.md)
- **Cost:** 1 time
- **Outcome:** A partner throws their weight on the line, from the foot of the plug or from the crest off the clamp, ready to hold a fall or power a haul.
- **Changes:** [Counterweight](#counterweight) — +1 point, +2 for a Physique-strong body

### Traverse the killzone
- **Requires:** [Physique](../cards/physique.md) OR [Finesse](../cards/finesse.md)
- **When:** the climber is past the lower bank.
- **Cost:** 1 time
- **Outcome:** The traverse looks ready to come apart, every hold shifting loose under the hand, but the rock is seated and holds. The climber crosses it, roped or not.
- **Changes:** [Climber position](#climber-position) — past the killzone

### Force the top-out
- **When:** The climber is past the killzone.
- **Cost:** 1 time + 2 composure
- **Outcome:** The slab overhangs a body-length, smooth and undercut, no holds and nothing above to anchor to. The climber free-solos it anchorless. With the reserve they pull over and top out, leaving the crux bare for anyone who follows. Forcing it without the reserve, they come off the slab: a two-storey fall, nothing to catch them, and they land **Wounded** (attempt spent, back at the foot).
- **Changes:** [Climber position](#climber-position) — topped out, or Wounded and not up without the reserve

### Drive the clamp
- **When:** The [clamp and hammer](../items/anchor.md) (from the [PGR farm](../locations/pgr-farm.md)); the climber is past the killzone.
- **Cost:** 1 time
- **Outcome:** The climber drives the steel clamp into the soft shale seam under the slab and pulls over on it, topping out clean with no composure tax. The clamp stays in the rock.
- **Changes:** [Climber position](#climber-position) — topped out; [Anchor](#anchor) — the crux is anchored for later climbs

### Haul a climber one level
- **Requires:** [rope](../items/rope.md)
- **When:** The crux is anchored (the clamp is driven); **2 counterweight points** (consumed); the hauled climber is past the lower bank.
- **Cost:** 1 time
- **Outcome:** The crew hang their weight on the parallel strand off the clamp and drag a body up one pitch, no one climbing it under load. This is how the reader who must take the reading, a geologist or a handiworker with an improvised level, but cannot climb the killzone reaches the crest.
- **Changes:** [Climber position](#climber-position) — the hauled climber moves up one level; [Counterweight](#counterweight) — 2 points spent

### Level the foot of the plug with the kit
- **Requires:** [geologist's kit](../items/geologists-kit.md) AND [Geology](../cards/geology.md)
- **When:** reaching the foot of the plug (no climb).
- **Prompted by:** [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **Cost:** 1 time
- **Outcome:** Carry the flood line to a fixed mark on the ground just below the plug: bring a level from the marked flood datum down the valley up to the mark, fixing that ground's height against the flood line. You shoot it with the kit's level and rod in a few long sights. This sets the reference the crest reading is dropped against; it does not by itself settle overtopping.
- **Gives:** [gap-foot-level](../clues/clues.md#gap-foot-level)


### Level the foot of the plug with the water hose
- **Requires:** [geologist's kit](../items/geologists-kit.md) AND [Handiwork](../cards/handiwork.md) AND [water hose contraption](../items/water-hose-contraption.md)
- **When:** reaching the foot of the plug (no climb).
- **Prompted by:** [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over)
- **Cost:** 2 time
- **Outcome:** Carry the flood line to a fixed mark on the ground just below the plug: bring a level from the marked flood datum down the valley up to the mark, fixing that ground's height against the flood line. You run the [water hose contraption](../items/water-hose-contraption.md), leapfrogged one rod-length of rise per step up to the mark: slow, but the same answer. This sets the reference the crest reading is dropped against; it does not by itself settle overtopping.
- **Gives:** [gap-foot-level](../clues/clues.md#gap-foot-level)

### Take the reading with the kit
- **Requires:** [geologist's kit](../items/geologists-kit.md) AND [Geology](../cards/geology.md)
- **When:** the reader has topped out (past the top-out)
- **Prompted by:** [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over), [gap-foot-level](../clues/clues.md#gap-foot-level)
- **Cost:** 1 time
- **Outcome:** With the foot mark already fixed against the flood line, the crest reading is two more transfers, and the crest is the only place they can be made:
  1. **Drop the top stone to the foot mark.** Hang the kit's plumb line from the capstone slab at the crest straight down the sheer face to the mark below the climb. The line reads the vertical face directly, fixing the top stone's height above the flood line.
  2. **Level the notch against the top stone.** Level the plug's lowest saddle against the top stone right there at the crest, a short local step. That last figure is the sill's height above the flood line.
  - If the sill stands above the line, rising water cannot top the plug.
- **Gives:** [Gap Sill Reading](../items/gap-sill-reading.md)


### Take the reading with the water hose
- **Requires:** [geologist's kit](../items/geologists-kit.md) AND [Handiwork](../cards/handiwork.md) AND [water hose contraption](../items/water-hose-contraption.md)
- **When:** the reader has topped out (past the top-out)
- **Prompted by:** [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over), [gap-foot-level](../clues/clues.md#gap-foot-level)
- **Cost:** 2 time
- **Outcome:** With the foot mark already fixed against the flood line, the crest reading is two more transfers, and the crest is the only place they can be made:
  1. **Drop the top stone to the foot mark.** Hang the kit's plumb line from the capstone slab at the crest straight down the sheer face to the mark below the climb. The line reads the vertical face directly, fixing the top stone's height above the flood line.
  2. **Level the notch against the top stone.** Level the plug's lowest saddle against the top stone right there at the crest, a short local step. That last figure is the sill's height above the flood line.
  - If the sill stands above the line, rising water cannot top the plug.
- **Gives:** [Gap Sill Reading](../items/gap-sill-reading.md)

## Mechanics

### Climber position

- Each climber is at one level: at the foot → past the lower bank → past the killzone → topped out.

### Anchor

- The crux is anchored once the clamp is driven into the shale seam. It stays for later climbs, which skip the top pitch.

### The fall

- Off the lower bank, bruises; off the killzone traverse, broken bones; off the top pitch, a bad break. None of it kills. A **Wounded** result blocks Physique and Violence until treated.

### The killzone is a fake danger

- The traverse looks like loose rock ready to slide, but the rock is seated and holds: a crossing here never actually falls, whatever the party sets up to catch it. (In the rain the same rock is loose for real and the fall is certain, see [Climb the Plug in the Rain](climb-the-plug-in-the-rain.md).)

### Counterweight

- A body committed to the rope by **Take the line** is a counterweight point (a Physique-strong body counts as 2). Every body on the line counts, on the ground or already topped out: the climber who drove the clamp can haul from above, so even a three-hand crew musters enough to raise the reader. The killzone catch never fires here (fake danger, no fall), so points are only ever spent **hauling**: dragging the non-climbing reader up a pitch on the clamp costs **2 points per level**. Same system the rain climb uses, minus the fall.

### The top-out

- One lasting fix: drive the clamp into the shale seam (needs the clamp and hammer, carried up on a return trip, so not available on a first blind climb). The choice is to force it free-solo for **2 composure**, or retreat, fetch the clamp, and come back to fix the route clean. Forcing it without the reserve is a fall: **Wounded**.

## Exits

- Back down to [The Ridge Gap](../locations/the-ridge-gap.md) and the survey routes.
- Report the reading to [prof. Bieńkowski](../characters/professor.md), or conclude the outlet on-site with Geology.
