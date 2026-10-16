# The Report — The State's Ending

**Location:** Police car on the road out of the village
**Present:** [@name](../characters/officer.md)

## Hook

[@surname](../characters/officer.md) waiting by the police car, asking the departing party for their report.

## Setup

- [@name](../characters/officer.md) reads the report in the car.[](#his-reaction-shifts-when-the-massacre-is-reported)
- The players may have discovered the 1947 Lemko massacre.
- The massacre is the state's buried crime under the dam.
- [@surname](../characters/officer.md) has signaled that the state wants the massacre buried.
- The dam is infrastructure and a grave.
- The players choose what goes into the report.[](#car-route-changes-when-the-truth-stays-inside)

## Opportunities

### His reaction shifts when the massacre is reported
- **Noticed by:** [Empathy](../cards/empathy.md)
- **When:** setup:events/the-report.md
- **Outcome:** his reaction changes when the 1947 massacre appears in the report.

### Car route changes when the truth stays inside
- **Noticed by:** [Survival](../cards/survival.md)
- **When:** setup:events/the-report.md
- **Outcome:** The car's route changes if the massacre is in the report and the truth is not already outside the car.

## Actions

### Submit a report without the massacre
- **Outcome:** [@name](../characters/officer.md) accepts the report and the car drives away.
- **Changes:** [The report](#the-report) — cover-up, the state's secret stays buried

### Submit a report with the massacre and no outside witness
- **When:** [Knows](../characters/professor.md#knows) is false
- **Outcome:** [@name](../characters/officer.md) reads the report, signals the driver, and the car changes course.
- **Changes:** [The report](#the-report) — suppressed, the players do not reach the road home

### Submit a report with the massacre and an outside witness
- **When:** [Knows](../characters/professor.md#knows) is true
- **Outcome:** [@name](../characters/officer.md) knows the truth already exists outside the car and lets the car continue home.
- **Changes:** [The report](#the-report) — truth survives outside the valley, the players live

## Mechanics

### The report

- **Type:** enum (none | cover-up | suppressed | truth-survives)
- **Per:** world
- **Start:** none
- What leaves the valley. Set by the report the committee submits. The **Report** ending.
