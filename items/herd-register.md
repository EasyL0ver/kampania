# Yearly Herd Register

## Hook

- The PGR farm's yearly herd register.

## Setup

A cloth-bound register with a line for every cow in the herd: ear-tag number, name, date of birth, calvings. Some lines are struck through for cows sold or dead.[](#a-year-out-of-date)

## Content

```
PGR — YEARLY HERD REGISTER — DAIRY CATTLE

Tag   Name        Born   Calvings           Out
001   Krasula     1959   61  63  65  66
002   Mućka       1960   62  64  66
003   Siwa        1958   60  62  64         † Nov 1965
004   Kasztanka   1961   63  65  66
 ...
198   Łaciata     1963   65  66
 ...
229   Gwiazda     1966   —
230   Malina      1966   —

Tallied 14 July 1966.      Head in herd: 122.
                                    D. Kowalik
```

Not up to date: cows dead since the July 1966 tally are still on it, and none of this year's calves are entered; the herd itself counts 140. A careful reader can see it from the date and the calvings.

## Opportunities

### A year out of date
- **Noticed by:** [Bureaucracy](../cards/bureaucracy.md)
- **When:** setup:items/herd-register.md
- **Outcome:** A yearly register on its last month: it will still carry last winter's dead and know nothing of this year's calves. Its figure is not the herd.
- **Gives:** [`herd-register-not-up-to-date`](../clues/clues.md#herd-register-not-up-to-date)
