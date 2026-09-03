# The Ridge Gap

**Type:** Location (revisitable, discoverable)
**Location:** The notch in the ridge between the %NEW_VILLAGE% valley and the empty %BIG-BASIN% beyond it.
**Present:** [Michał Pytlak](../characters/foreman.md) (if brought on the survey)
**Available:** After reaching the gap from the survey routes ([Village Outskirts](village-outskirts.md))
**Cost:** 1 action per interaction; the climb is a multi-pitch group action (see [Climb the plug](#climb-the-plug))

## Setup

- The gap is the low notch where the ridge dips between the %NEW_VILLAGE% valley and %BIG-BASIN%.
- The state map draws it as an open channel, the valley's main drain.
- An old landslide has choked the notch with fallen rock and earth.
- From the base the fill looks like loose rubble floodwater would seep straight through.
- The plug is a steep bank about two storeys high, and it climbs in three distinct pitches.
- **Lower bank (get on):** a greasy clay start; strength gets up it fastest, but a sure-footed or determined climber can scramble on too.
- **The killzone (the crossing):** a loose, exposed traverse of shifting rock; only a strong climber crosses it, and only on a rope worked from below.
- **The top pitch (top out):** the crest is capped by a slab of intact sandstone torn loose by the slide; from the ground it just looks like the top edge, and what it takes to get over it cannot be read from below, not even by a good eye. You only see the problem once you are under it.
- The lower bank and the killzone can be scouted from the ground by a Survival read, so the party can arrive with a rope and the right climber; the top pitch cannot.
- The climb is a one-person job; the rest of the party work the ground: belaying the rope, reading the line, calling up.
- A rope is essential to cross the killzone, and the party must have brought or scrounged one (the [PGR farm](pgr-farm.md) or [office](pgr-office.md) has line).
- The fill can be sampled at the toe, but that only settles whether it seeps. What decides the outlet is read only at the crest: the height of the plug's lowest saddle (the sill the rising water must top to spill into %BIG-BASIN%) and whether the slid mass beds against the intact ridge or leaves a channel. Both are invisible from below.
- The top of the plug overlooks the empty %BIG-BASIN%, the ground the map says the valley's water should drain into.
- Nothing but this fill stands between the valley and %BIG-BASIN%.

## Opportunities

- **The gap won't drain** `(requires: holding [`gap-fill-examined`](../clues/clues.md#gap-fill-examined) and [`gap-sill-above-flood`](../clues/clues.md#gap-sill-above-flood) and Geology)` — Put the two readings together: the fill will not seep and the sill will not overtop, so water can leave the valley neither through the plug nor over it. The outlet is dead. → Gives: [gap-is-blocked](../clues/clues.md#gap-is-blocked)

## Actions

### Examine the fill at the toe
- **Requires:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap); reaching the foot of the plug (no climb)
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **Cost:** 1 action
- **Outcome:** Scramble to the base of the plug and dig into it. From a distance the fill looks like loose rubble the water would run straight through; up close it is dense clay and shattered rock packed tight, impermeable. This settles only whether the plug leaks, not whether the water level can rise over it (that is the crest sill, which needs the climb). → Gives: [gap-fill-examined](../clues/clues.md#gap-fill-examined)
  - **Geology:** reads the fill directly and confirms it will not pass water at flood pressure.

### Climb the plug
- **Requires:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap); one climber going up, with the rest of the party on the ground
- **Prompted by:** [landslide-in-the-gap](../clues/clues.md#landslide-in-the-gap)
- **Cost:** climber spends 1 card per attempt; each ground assist is 1 card from that PC; forcing the top pitch costs composure; a second attempt re-pays the climb through pitches 1 and 2
- **Outcome:** One climber goes up, the crew work the ground. Top out, stand a rod on the lowest saddle, and shoot its height against the village datum: get [gap-sill-above-flood](../clues/clues.md#gap-sill-above-flood). Why climb at all: the fill can be sampled at the toe (see [Examine the fill at the toe](#examine-the-fill-at-the-toe)), but that only settles whether it seeps, not whether the plug holds. What decides the outlet is the height of the plug's lowest saddle, the sill the rising water must top to spill into %BIG-BASIN%, and you cannot read that saddle from the valley floor: it sits back behind the front lip, foreshortened and screened. Only a climber on the crest can find it, stand a rod on it, and shoot its height. Topping out also puts the climber looking straight down into the empty %BIG-BASIN% the water is meant to escape into, so the number and its weight land together: if the sill stands above the flood line, there is no way out. The climb is a group coordination problem across three pitches, not a single card. Roles: the **climber** (needs **Physique** to finish), a ground **scout** (**Survival**, reads the lower pitches ahead of time), and a ground **partner** (works the rope).
  - **1. Get on (soft gate).** Any climber gets onto the plug: **Physique** or **Survival** carries them up, or a character with neither forces it by spending **1 composure**. A Survival or composure climber can start, but has no strength for the killzone above.
  - **2. The killzone (hard gate).** Crossing needs the climber's **Physique** **and** a **rope worked by a second PC** on the ground. A climber without Physique, or a climber with no rope and partner, cannot cross: they climb back down, the attempt spent. A ground **Survival** scout can read pitches 1 and 2 from below beforehand, so the party arrives with the rope and a strong climber assigned.
  - **3. Top out (hidden gate).** The crux is the capping slab: a torn-out block of sandstone that **overhangs** the fill by a body-length, smooth and undercut, with no holds and nothing above to anchor to, and the solid ridge sitting back beyond it. From the ground the overhang is invisible, it reads as just the top edge; only the climber directly beneath it sees the roll-back and calls down what it needs. There is one lasting way past it: **drive a steel clamp into the soft shale seam under the slab** and pull over on it. The seam is the slab's one weakness, and a clamp bashed home there holds a body's weight. The tools have to be carried up, a heavy **clamp and a hammer** (the [PGR farm](pgr-farm.md) has both), which no one brings on a first blind climb. So the table chooses:
    - **Force it now** — free-solo the overhang, anchorless, two storeys up: a big composure tax (**2 composure**). Only a climber with the reserve can pay it; a climber down to 1 composure cannot, and must come back. Tops out this trip, but leaves nothing behind: the crux is still bare for anyone who follows.
    - **Retreat and return with the clamp** — climb down, fetch the clamp and hammer the climber saw the crux needs, and next trip drive it home and top out clean, no composure tax (re-paying pitches 1 and 2 to get back up). The clamp stays in the rock: from then on the crux is a fixed hold and anyone can top out.
    - Up to the players: spend composure now, or spend the time and fix the route.
  - Topping out, either way, puts the climber on the crest to shoot the sill. → Gives: [gap-sill-above-flood](../clues/clues.md#gap-sill-above-flood).
  - Driving the clamp fixes the route for good. → Gives: World State Change: the crux of the ridge plug is anchored (a clamp is left in the seam; later climbs skip the top pitch).
- **Gives:** [gap-fill-examined](../clues/clues.md#gap-fill-examined)
