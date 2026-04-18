# Scenario Graph

> **Source of truth: `scenes/` folder.** Events are blue, locations are green.

## Overview Diagram

```mermaid
graph TD
    %% === EVENTS ===
    E01[01: The Car In] --> E02[02: Arrival]
    E02 --> E03[03: Dinner at Wojewoda's]
    E02 --> L_HOUSE[Wojewoda's House]
    E02 --> L_PGR[PGR Farm]

    %% === WOLF CHAIN ===
    L_PGR --> E_WOLF[Wolf Hunt]
    E_WOLF --> E_VISITS[Tadek Visits Butcher - STOPS]
    E_VISITS --> E_CONFRONT[Wojewoda Confronts Butcher]
    E_WOLF --> E_WELL[Well Confrontation]

    %% === PAWEŁEK ILLNESS ===
    E_FLOOD[The Flood] --> E_PAWELEK[Pawełek Falls Ill]
    E_PAWELEK --> L_WELL[The Well]
    E_PAWELEK --> L_BARBARA[Barbara's House]

    %% === HAG PREVENTION ===
    E_WOLF -.->|players push Dudka| E_HAG_SAVED[Dudka Confronts Rezeń]
    E_HAG_SAVED -.-> E_WELL

    %% === LOCATIONS ===
    E03 --> L_HOUSE
    L_PGR --> L_STORE[The Store]
    L_PGR --> L_SURVEY[Village Outskirts]
    L_SURVEY --> L_PGR

    %% === STYLING ===
    classDef event fill:#1565c0,color:#fff,stroke:#0d47a1
    classDef location fill:#388e3c,color:#fff,stroke:#1b5e20

    class E01,E02,E03,E_WOLF,E_VISITS,E_CONFRONT,E_WELL,E_FLOOD,E_PAWELEK event
    class L_HOUSE,L_PGR,L_STORE,L_SURVEY,L_WELL,L_BARBARA location
```

---

## Events (3)

| File | Event | Triggered by |
|------|-------|--------------|
| `events/01-the-car-in.md` | The Car In | Game start |
| `events/02-arrival.md` | Arrival | Exit from 01 |
| `events/03-dinner.md` | Dinner at Wojewoda's | First evening, if flood not discussed |
| `events/event-wujas-visits-butcher.md` | Tadek Visits the Butcher | Recurring, early game. Stops Day 1-2 (wolf errand) |
| `events/event-wolf-hunt.md` | The Wolf Hunt | Day 1-2. Zbigniew authorizes Rezeń after assessing wolf damage |
| `events/event-well-confrontation.md` | The Well Confrontation | Night of Day 4. Rezeń loose + hag at well + village hostile (wolf rumor) |
| `events/event-pawelek-falls-ill.md` | Pawełek Falls Ill | Day 3+. After flood. Pawełek drinks contaminated water near the old village well |

## Locations (3)

| File | Location | Available from |
|------|----------|----------------|
| `locations/wojewodas-house.md` | Wojewoda's House | After arrival |
| `locations/pgr-office.md` | PGR Office | After arrival |
| `locations/pgr-farm.md` | PGR Farm | Daytime, any day |
| `locations/pgr-quarters.md` | PGR Workers' Quarters | Any time |
| `locations/the-store.md` | The Store | Daytime, any day |
| `locations/village-outskirts.md` | Village Outskirts | Any day, needs geologist |
