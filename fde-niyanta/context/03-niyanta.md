# 3. Niyanta

Niyanta is the PDGMS module for V5 and V4. Mimamsaka is where programs are run. Niyanta is where the people who own the goal see what needs them, decide, and see what their decisions did.

## What it must do

**Start from the goal.** The first thing a V5 sees is the commitment (₹13.4 Cr to ₹24 Cr) and the levers meant to close the gap, each with its owner and how sure anyone is about it. Not a wall of charts.

**Show what needs this person today.** A V5 does not need every late order. They need the few decisions only they can take, and the facts that change those decisions. This is management by exception: everything that is on track stays quiet; what has gone off plan, or needs authority, comes forward.

**Let a V5 set a direction.** A direction has:

| Field | Example |
|---|---|
| Who set it | Kartik |
| Scope | Extrusion capacity, all commodity orders |
| The direction | Keep 10% free for specialty work. Stop commodity priced more than 4% below peers. |
| Why | Commodity fills the plant at 8% contribution and leaves no room when specialty arrives |
| How sure, when set | Low |
| Review by | 4 November |

**Carry the direction down without executing it.** A direction makes things visible below: Bhandari sees which accounts fall under it, and why they are flagged. It never moves an order, reassigns an account or rejects a quote on its own. The person at each level still decides.

**Bring the result back up.** When the review date comes, the direction is judged as **validated** (the data supports it), **contradicted** (the data goes against it) or **insufficient** (too early, or too little data). The owner then renews it, changes it, or retires it.

## Six rules for directions

These are the rules most likely to be broken by a well-meaning engineer, because the obvious build (make directions enforceable, automate them, close the loop tightly) produces a tool for command and surveillance.

1. **The influence is visible.** If a list is reordered because of a direction, the list says so: "flagged because of Kartik's direction of 4 Aug". An unexplained reordering looks like the system's own judgement, and hides a person's instruction inside it.
2. **A V4 can decline, and declining is normal.** Bhandari declined Kartik's direction for two accounts and gave a reason. That reason goes up as information. If declining is shown as a failure, nobody will ever decline, and the direction becomes an order.
3. **The verdict is on the direction, never on a person.** "Holding 10% for specialty did not raise specialty volume" is a finding. "Bhandari did not follow it" is surveillance. The judgement screen has no place for a person's name as the cause of success or failure.
4. **A direction that did not work is shown as clearly as one that did.** An owner who only ever sees their calls confirmed stops learning. A healthy Niyanta is one where owners change their directions when the data says so.
5. **A direction expires.** On its review date the owner is asked to renew, change or retire it. It does not quietly expire, and it does not quietly carry on.
6. **The higher the level, the coarser the direction.** A V5 sets direction for a segment, a region or a product. A V5 cannot set "Harpreet, call Hearthline on Tuesday". That is a task, and tasks belong further down.

## How sure is a number

Every inference Niyanta shows carries a band: **low**, **directional** or **strong**, with a one-line reason. The number is never hidden because the data is thin. It is shown, with the weakness stated next to it, so the owner can decide knowing what it rests on.

> Specialty volume up 0.4 points since the direction. **Low:** two months of data. Read again in November.

A number with no band next to it should not appear on a V5 screen.

## Where the numbers come from

PDGMS is built physics-first: almost every number on a screen is a query over recorded data (counts, sums, comparisons). A language model may phrase things, but it does not produce the numbers. If your screen shows a figure, you should be able to say which rows of which file it came from.

## No screen ranks people

Level, not verdict. Niyanta shows causes, not culprits. A lost sale shows "sample was 16 days late", not a salesperson's conversion rate next to their colleagues'. The data in this pack would let you build a leaderboard. Do not.

## What else lives in Niyanta

Niyanta also holds the MD's private sounding board, where the MD captures frictions and ideas by voice and works them into plans. That is out of scope here. Build the shared screens for the four owners.

## A worked example, from a different company

Aeka is a fictional probiotics maker. Its founder (V5) reads that large German brands buy well and small ones fail on minimum order size. He sets a direction: focus the German campaign on large brands; review next quarter.

- His **VP Sales (V4)** opens her screen. The large-brand accounts are flagged "because of the founder's direction", with his reason. She retires six small-brand accounts and moves four cold large-brand accounts to stronger sellers. She **declines** the direction for two small brands she wants as reference customers, and writes why. Her decline goes up as information.
- Her **program manager (V3)** finds that the main loss in small brands is one objection about minimum order size, writes a better answer to it, and hands it to the sellers.
- A quarter later, conversion with large brands has risen. The founder's screen shows the direction as **validated**. Had it not risen, it would show **contradicted**, just as prominently, and invite him to change it. In neither case does the screen say who did well or badly.

That is the loop your build should make visible for Anantha: a decision set at the top, travelling down as visible influence, and coming back up as a verdict on the decision.
