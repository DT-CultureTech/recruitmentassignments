# 7. The goal and its four levers

The owners committed to the board on 14 April 2026: **EBITDA from ₹13.4 Cr to ₹24 Cr by the end of FY28, on about the same tonnage.** The gap is ₹10.6 Cr. Four levers are meant to close it. They are in `company.json` under `mandate.bridge`, each with its arithmetic, so you can check every number.

| Lever | ₹ Cr | How sure | Arithmetic |
|---|---|---|---|
| Move 4 points of volume (about 305 t) from commodity to specialty | 7.6 | low | 305,000 kg × (₹280 − ₹31) contribution per kg |
| Close 2 points of the price gap on the five largest accounts | 3.7 | directional | 2% of their ₹184.4 Cr FY26 revenue |
| Halve colour-family write-offs at extrusion | 1.3 | directional | half of 168 changes a year × ₹1.58 lakh |
| Two new accounts, about 25 t a year each of specialty | 1.4 | low | 2 × 25,000 kg × ₹280 contribution per kg |
| **Total** | **14.0** | | against a gap of 10.6 |

The levers add up to more than the gap on purpose. The owners expect some to fall short.

## Why each lever is hard

**Specialty volume.** Specialty earns nine times commodity per kilo. But 305 tonnes of specialty needs buyers who order on specification, and today no named buyer holds more than 40 tonnes a year of specialty demand. It also needs plant time held free, which is what Kartik's direction `D-01` does. Held capacity with no order in it is idle.

**Price on the large accounts.** Four of the five largest accounts are traders who pay 4 to 7% below peers for the same yarn. Two points back is worth ₹3.7 Cr. But they are a large share of revenue and can move volume to another supplier within a month. That is exactly why Bhandari declined `D-01` for two of them.

**Write-offs.** Every change of colour family at extrusion throws away about 380 kg. Running similar colours together halves that. But sequencing by colour means some orders wait longer, and delivery dates already slip.

**New accounts.** Winning a customer who buys on specification takes many months and several samples, and each sample costs plant time. Two new-customer pursuits are past sampling or quoting (`funnel.csv`). Neither has ordered.

## The levers pull against each other

- Holding lines free for specialty (lever 1) makes it harder to absorb a trader's large order, which is what keeps the traders from leaving while prices rise (lever 2).
- Sequencing for fewer write-offs (lever 3) slows delivery, and slow samples lose new accounts (lever 4).
- A filler order at a low price keeps a line busy, but tells every other trader what price is possible (lever 2).

Every escalation in `escalations.json` touches at least one lever. A good V5 screen shows which.

## What would change how sure we are

A band moves when evidence arrives. Specialty volume rising for a full quarter after `D-01` would move lever 1 up. One of the two named pursuits placing a repeat order would move lever 4 up. A trader moving volume away after a price change would move lever 2 down. Your screen should make it possible to see a band change and why.
