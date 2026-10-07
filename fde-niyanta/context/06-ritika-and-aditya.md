# 6. Ritika and Aditya: the job you are applying for

Ritika and Aditya are Forward Deployed Engineers. DeepThought places them inside a client company for some months. They sit with the client's people, run a program at V3, build what the program needs, and leave behind a company that runs it without them.

If you join, this is your job. The screen you build in this assignment is the screen that would decide whether your escalations get answered.

## What they run

They work in **Mimamsaka**, the PDGMS module for V3. A program there has:

- a **goal** it serves, traced up to the V5 commitment;
- **sprints** of a few weeks, each with a plan of tasks across departments;
- an **event loop** where things that need action arrive and are resolved, reassigned or escalated;
- **reviews** at the end of each sprint: what was delivered, what was learned, what changes.

| | Ritika | Aditya |
|---|---|---|
| Program | Growth: win specification-led accounts | Delivery: dates the company can promise |
| Sits with | Mr. Bhandari | Mr. Kamath |
| Keeps | `prospects.csv`, `scoring_rubric.json`, `funnel.csv` | `delivery_model.json`, predicted dates in `open_orders.csv`, `lines.csv` |
| Crosses into | The plant, every time a sample is needed | Sales, every time a date is promised |

## When something goes up to Niyanta

Most problems are solved inside the program. A problem goes up when it needs something V3 does not have:

- **authority**: a price below a set limit, a trial that loses money, a direction to apply or not;
- **a changed assumption**: the delivery model is worse than planned, an account is collapsing;
- **another function's decision**: the plant has to give time that sales needs, or the other way round.

Each escalation in `escalations.json` has:

| Field | Meaning |
|---|---|
| `raised_by`, `raised_on` | Who and when |
| `to` | Who has to decide. Often two people, because the cost sits with one and the benefit with the other |
| `what_happened` | The facts |
| `evidence` | Which rows of which file show it |
| `options` | What could be done, what each costs, and who bears that cost |
| `ask` | The decision needed |

## What they need back

An answer has four parts: **what** was decided, **who** decided, **by when** it takes effect, and **why**. "Noted" is not an answer. Neither is silence.

Without an answer, the program stalls or the V3 decides something that was not theirs to decide. Both are worse than a quick "no".

## Ticket lifecycle

Inside PDGMS, a problem moves through fixed states:

```
open ► classified ► routed ► accepted ► resolved ► confirmed
```

**Classified** means its cause is named (budget, talent, internal support, assumptions, permissions: see `01-the-5x5-grid.md`). **Routed** means it has reached whoever can act. **Confirmed** means the person who raised it agrees it is resolved. You do not have to build this machinery. You should know that an escalation is not finished when someone at V5 clicks a button: it is finished when Ritika or Aditya can act on the answer.

## They will leave

An FDE's placement ends. Whatever Niyanta shows has to make sense to Bhandari and Kamath on the day Ritika and Aditya are gone. A screen that only its builder can read has failed.
