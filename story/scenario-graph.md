# Scenario Graph

> **Source of truth: `scenes/` folder.** Events are blue, locations are green.

## Overview Diagram

```mermaid
graph TD
    %% === EVENTS ===
    E01[01: The Car In] --> E02[02: Arrival]
    E02 --> E03[03: Dinner at Wojewoda's]
    E02 --> L_OFFICE[Wojewoda's Office]

    %% === LOCATIONS ===
    E03 --> L_OFFICE
    L_OFFICE --> L_STORE[The Store]
    L_OFFICE --> L_SURVEY[Geological Survey]
    L_SURVEY --> L_OFFICE

    %% === STYLING ===
    classDef event fill:#1565c0,color:#fff,stroke:#0d47a1
    classDef location fill:#388e3c,color:#fff,stroke:#1b5e20

    class E01,E02,E03 event
    class L_OFFICE,L_STORE,L_SURVEY location
```

---

## Events (3)

| File | Event | Triggered by |
|------|-------|--------------|
| `events/01-the-car-in.md` | The Car In | Game start |
| `events/02-arrival.md` | Arrival | Exit from 01 |
| `events/03-dinner.md` | Dinner at Wojewoda's | First evening, if flood not discussed |

## Locations (3)

| File | Location | Available from |
|------|----------|----------------|
| `locations/wojewodas-office.md` | Wojewoda's Office | After arrival |
| `locations/the-store.md` | The Store | Daytime, any day |
| `locations/geological-survey.md` | Geological Survey | Any day, needs geologist |
