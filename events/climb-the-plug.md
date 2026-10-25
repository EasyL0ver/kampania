# Climb the Plug

**Location:** [@name](../locations/the-ridge-gap.md)
**Present:** [@name](../characters/foreman.md) (if [On the survey](../characters/foreman.md#on-the-survey) is true)

## Hook

Facing the steep plug at the ridge gap.

## Setup

- The plug is a steep bank about two storeys high, and it climbs in three distinct pitches.
- **Lower bank (get on):** a greasy clay start[](#mud-underfoot-seems-easy)[](#lower-bank-looks-easy); strength gets up it fastest, but a sure-footed or determined climber can scramble on too.[](#force-the-lower-bank)
- **The killzone (the crossing):** a loose, exposed traverse of shifting rock. Every hold looks ready to come away under a boot[](#falls-hurt-but-do-not-kill); the party will want it roped and belayed[](#traverse-the-killzone)[](#take-the-line)[](#fall-needs-two-on-line).
- **The top pitch (top out):** the crest is capped by a slab of intact sandstone torn loose by the slide; from the ground it just looks like the top edge, and what it takes to get over it cannot be read from below, not even by a good eye.[](#force-the-top-out) You only see the problem once you are under it.
- The climb is a one-person job; the rest of the party work the ground: belaying the rope, reading the line, calling up.
- The party should bring or scrounge a rope (the [@name](../locations/new-village/pgr-farm/pgr-farm.md) or [@name](../locations/new-village/pgr-farm/pgr-office.md) has line): they will want it for the traverse, and need it to haul anyone who cannot climb up to the crest.[](#haul-a-climber-one-level)
- The top pitch has one lasting solution: a clamp driven into the soft shale seam under the slab.[](#drive-the-clamp) The tools, a clamp and a hammer (both at the [@name](../locations/new-village/pgr-farm/pgr-farm.md)), have to be carried up, which no one brings on a first blind climb.
- Why climb at all: the sill that decides overtopping into [@name](../locations/big-basin.md) can be read only from the crest (the reasoning lives at [@name](../locations/the-ridge-gap.md)).

## Opportunities

### Lower bank looks easy
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/climb-the-plug.md
- **Outcome:** The lower bank seems easy; the traverse will need a rope. The top pitch can't be read from here.

### Mud underfoot seems easy
- **Noticed by:** [Physique](../cards/physique.md)
- **When:** setup:events/climb-the-plug.md
- **Outcome:** The mud underfoot seems easy.

### Fall needs two on line
- **Noticed by:** [Handiwork](../cards/handiwork.md) AND [@name](../items/rope.md)
- **When:** setup:events/climb-the-plug.md
- **Outcome:** Securing a fall on this needs two people on the line, not one.

### Falls hurt but do not kill
- **Noticed by:** [Medicine](../cards/medicine.md)
- **When:** setup:events/climb-the-plug.md
- **Outcome:** A slip off the lower bank is bruises and mud. Off the traverse onto the rock, broken bones. From the top pitch you break badly. None of it kills you by itself; a fall here hurts, it doesn't kill.

### Witnesses describe fall damage
- **Noticed by:** [Violence](../cards/violence.md)
- **When:** [Ask what a fall would do](#ask-what-a-fall-would-do)
- **Outcome:** You've seen men fall. Roughly: the bank bruises, the traverse breaks bones, the top breaks you badly, but none of it puts a man in the ground. Less exact than a medic's read, close enough.

### Crossing looks very steep
- **Noticed by:** [Physique](../cards/physique.md)
- **When:** [Climber position](#climber-position) >= lower-bank
- **Outcome:** The crossing looks very steep, but I think I can take it.

### Steep but delicate line
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** [Climber position](#climber-position) >= lower-bank
- **Outcome:** Steep, but there's a delicate line through it if I'm careful.

### Much worse than expected
- **Noticed by:** [Physique](../cards/physique.md)
- **When:** [Climber position](#climber-position) >= killzone
- **Outcome:** It's much worse than I realized. I can try it, but I'm scared of falling.

### No holds, balance only
- **Noticed by:** [Finesse](../cards/finesse.md)
- **When:** [Climber position](#climber-position) >= killzone
- **Outcome:** No holds worth the name, but I can balance it, barely.

### Clamp works as fixed haul point
- **Noticed by:** [Handiwork](../cards/handiwork.md)
- **When:** [Anchor](#anchor) is true
- **Outcome:** The clamp up top is a fixed point. You can rig a line to it and haul a body up on its own, so someone who can't climb still reaches the crest.

## Actions

### Ask what a fall would do
- **Outcome:** The men who've worked the slope tell it plainly[](#witnesses-describe-fall-damage).

### Scale the lower bank
- **Requires:** [Physique](../cards/physique.md) OR [Survival](../cards/survival.md) OR [Finesse](../cards/finesse.md)
<!-- Prompted by: [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap) -->
- **Cost:** 1 time
- **Outcome:** The greasy clay gives underfoot; a strong, sure-footed, or deft climber gets up onto the plug.
- **Changes:** [Climber position](#climber-position) — past the lower bank

### Force the lower bank
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time + 1 composure
- **Outcome:** No strength or footwork for the clay, so the climber grinds up it on nerve alone.
- **Changes:** [Climber position](#climber-position) — past the lower bank

### Take the line
- **Requires:** [@name](../items/rope.md)
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time
- **Outcome:** A partner throws their weight on the line, from the foot of the plug or from the crest off the clamp, ready to hold a fall or power a haul.
- **Changes:** [Counterweight](#counterweight) — +1 point, +2 for a Physique-strong body

### Traverse the killzone
- **Requires:** [Physique](../cards/physique.md) OR [Finesse](../cards/finesse.md)
- **When:** [Climber position](#climber-position) >= lower-bank
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time
- **Outcome:** The traverse looks ready to come apart, every hold shifting loose under the hand, but the rock is seated and holds. The climber crosses it, roped or not.
- **Changes:** [Climber position](#climber-position) — past the killzone

### Force the top-out
- **When:** [Climber position](#climber-position) >= killzone
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time + 2 composure
- **Outcome:** The slab overhangs a body-length, smooth and undercut, no holds and nothing above to anchor to. The climber free-solos it anchorless. With the reserve they pull over and top out, leaving the crux bare for anyone who follows. Forcing it without the reserve, they come off the slab: a two-storey fall, nothing to catch them, and they land **Wounded** (attempt spent, back at the foot).
- **Changes:** [Climber position](#climber-position) — topped out, or Wounded and not up without the reserve

### Drive the clamp
- **Requires:** [@name](../items/anchor.md)
- **When:** [Climber position](#climber-position) >= killzone
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time
- **Outcome:** The climber drives the steel clamp into the soft shale seam under the slab and pulls over on it, topping out clean with no composure tax. The clamp stays in the rock.
- **Changes:** [Climber position](#climber-position) — topped out; [Anchor](#anchor) — the crux is anchored for later climbs

### Haul a climber one level
- **Requires:** [@name](../items/rope.md)
- **When:** [Anchor](#anchor) is true AND [Counterweight](#counterweight) >= 2 AND [Climber position](#climber-position) >= lower-bank
<!-- Prompted by: setup:events/climb-the-plug.md -->
- **Cost:** 1 time
- **Outcome:** The crew hang their weight on the parallel strand off the clamp and drag a body up one pitch, no one climbing it under load. This is how the reader who must take the reading, a geologist or a handiworker with an improvised level, but cannot climb the killzone reaches the crest.
- **Changes:** [Climber position](#climber-position) — the hauled climber moves up one level; [Counterweight](#counterweight) — 2 points spent

### Level the foot of the plug with the kit
- **Requires:** [@name](../items/geologists-kit.md) AND [Geology](../cards/geology.md)
- **When:** [Climber position](#climber-position) is foot
<!-- Prompted by: [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over) -->
- **Cost:** 1 time
- **Outcome:** Carry the flood line to a fixed mark on the ground just below the plug: bring a level from the marked flood datum down the valley up to the mark, fixing that ground's height against the flood line. You shoot it with the kit's level and rod in a few long sights. This sets the reference the crest reading is dropped against; it does not by itself settle overtopping.
- **Gives:** [gap-foot-level](../clues/clues.md#gap-foot-level)

### Level the foot of the plug with the water hose
- **Requires:** [@name](../items/geologists-kit.md) AND [Handiwork](../cards/handiwork.md) AND [@name](../items/water-hose-contraption.md)
- **When:** [Climber position](#climber-position) is foot
<!-- Prompted by: [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over) -->
- **Cost:** 2 time
- **Outcome:** Carry the flood line to a fixed mark on the ground just below the plug: bring a level from the marked flood datum down the valley up to the mark, fixing that ground's height against the flood line. You run the [@name](../items/water-hose-contraption.md), leapfrogged one rod-length of rise per step up to the mark: slow, but the same answer. This sets the reference the crest reading is dropped against; it does not by itself settle overtopping.
- **Gives:** [gap-foot-level](../clues/clues.md#gap-foot-level)

### Take the reading with the kit
- **Requires:** [@name](../items/geologists-kit.md) AND [Geology](../cards/geology.md)
- **When:** [Climber position](#climber-position) is topped-out
<!-- Prompted by: [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over), [gap-foot-level](../clues/clues.md#gap-foot-level) -->
- **Cost:** 1 time
- **Outcome:** With the foot mark already fixed against the flood line, the crest reading is two more transfers, and the crest is the only place they can be made:
  1. **Drop the top stone to the foot mark.** Hang the kit's plumb line from the capstone slab at the crest straight down the sheer face to the mark below the climb. The line reads the vertical face directly, fixing the top stone's height above the flood line.
  2. **Level the notch against the top stone.** Level the plug's lowest saddle against the top stone right there at the crest, a short local step. That last figure is the sill's height above the flood line.
  - If the sill stands above the line, rising water cannot top the plug.
- **Gives:** [@name](../items/gap-sill-reading.md)

### Take the reading with the water hose
- **Requires:** [@name](../items/geologists-kit.md) AND [Handiwork](../cards/handiwork.md) AND [@name](../items/water-hose-contraption.md)
- **When:** [Climber position](#climber-position) is topped-out
<!-- Prompted by: [flood-mark-left-by-dam-builders](../clues/clues.md#flood-mark-left-by-dam-builders), [water-may-flow-over](../clues/clues.md#water-may-flow-over), [gap-foot-level](../clues/clues.md#gap-foot-level) -->
- **Cost:** 2 time
- **Outcome:** With the foot mark already fixed against the flood line, the crest reading is two more transfers, and the crest is the only place they can be made:
  1. **Drop the top stone to the foot mark.** Hang the kit's plumb line from the capstone slab at the crest straight down the sheer face to the mark below the climb. The line reads the vertical face directly, fixing the top stone's height above the flood line.
  2. **Level the notch against the top stone.** Level the plug's lowest saddle against the top stone right there at the crest, a short local step. That last figure is the sill's height above the flood line.
  - If the sill stands above the line, rising water cannot top the plug.
- **Gives:** [@name](../items/gap-sill-reading.md)

## Mechanics

### Climber position

- **Type:** enum (foot | lower-bank | killzone | topped-out)
- **Per:** player
- **Start:** foot
- Each climber is at one level: at the foot → past the lower bank → past the killzone → topped out.

### Anchor

- **Type:** bool
- **Per:** world
- **Start:** false
- The crux is anchored once the clamp is driven into the shale seam. It stays for later climbs, which skip the top pitch.

### The fall

- **Type:** rule
- Off the lower bank, bruises; off the killzone traverse, broken bones; off the top pitch, a bad break. None of it kills. A **Wounded** result blocks Physique and Violence until treated.

### The killzone is a fake danger

- **Type:** rule
- The traverse looks like loose rock ready to slide, but the rock is seated and holds: a crossing here never actually falls, whatever the party sets up to catch it. (In the rain the same rock is loose for real and the fall is certain, see [@name](climb-the-plug-in-the-rain.md).)

### Counterweight

- **Type:** int
- **Per:** world
- **Start:** 0
- A body committed to the rope by **Take the line** is a counterweight point (a Physique-strong body counts as 2). Every body on the line counts, on the ground or already topped out: the climber who drove the clamp can haul from above, so even a three-hand crew musters enough to raise the reader. The killzone catch never fires here (fake danger, no fall), so points are only ever spent **hauling**: dragging the non-climbing reader up a pitch on the clamp costs **2 points per level**. Same system the rain climb uses, minus the fall.

### The top-out

- **Type:** rule
- One lasting fix: drive the clamp into the shale seam (needs the clamp and hammer, carried up on a return trip, so not available on a first blind climb). The choice is to force it free-solo for **2 composure**, or retreat, fetch the clamp, and come back to fix the route clean. Forcing it without the reserve is a fall: **Wounded**.
