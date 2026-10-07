# Build Niyanta for Anantha

**Forward Deployed Engineer, Hyderabad · 48 hours**

Anantha Filament Works makes polyester yarn in Coimbatore. **It is fictional.** We built it from a real company we work with, and changed every name and every number. The problems are the real ones. Your job is to build the screen its owners open every morning.

The data is in [`data/`](data/). Start with [`data/README.md`](data/README.md).

---

## The company

Anantha melts plastic chips, spins them into filament on 14 lines, and sells the yarn to weavers, traders and a few brands. It is 32 years old, listed, and run by a professional MD under a promoter family.

| | |
|---|---|
| Revenue, FY26 | ₹318 Cr |
| EBITDA | ₹13.4 Cr, 4.2% of revenue |
| What the owners have committed to the board | ₹24 Cr EBITDA by end of FY28, on about the same tonnage |
| Plant | 9,200 t a year, running at 83% |
| Where the money is | 62% of volume is commodity yarn earning 8%. 7% is specialty earning 40%. |
| Customers | 47 active. Five traders are 58% of revenue. |
| Selling | 9 people. The plant takes about ten days to answer a customer's sample request. |

The owners cannot reach ₹24 Cr by selling more of the same. They have to sell different yarn to different customers, and the plant has to make it without breaking the delivery dates it already misses.

---

## Six people

At DeepThought we describe a company in five levels. V5 sets the goal. V4 turns it into a strategy for one function. V3 turns strategy into a plan and runs it. V2 supervises. V1 does the work.

**Kartik · V5 · Managing Director.** A chartered accountant. He sets prices for the large accounts himself and decides which orders to take: good margin, strategic (below margin to win or keep an account), or filler (to keep a line running).
> Either we find new markets or we sell more to the people who already buy.

**Pranav · V5 · Executive Director.** From the promoter family. He worries that new demand will only produce more late orders, and that the sales team does not believe the plant can do specialty work.
> Give me one or two real wins with named customers. The sales team will believe a win, not a presentation.

**Mr. Bhandari · V4 · Commercial GM.** Nineteen years at Anantha. Runs the four regional managers. Decides which accounts and prospects the team works.
> If we pick up something interesting in the market we mail it to the plant. Then nobody takes it forward.

**Mr. Kamath · V4 · Plant Head.** Twenty-four years at Anantha. Planning, production, quality and maintenance report to him. Decides what runs on which line, and in what order.
> The gap is not in the plant. The gap is in marketing.

**Ritika and Aditya · V3 · Program managers.** Two of ours, placed inside Anantha. Ritika sits with Bhandari and keeps the prospect research and the sales funnel. Aditya sits with Kamath and built the model that predicts when each order will ship. They do not live in Niyanta. They send things up to it, and they need answers back.

---

## What Niyanta is

Niyanta is the screen for V5 and V4. It is not a report. Each of the four people should be able to open it, see what needs them today, and act. These are the rules it follows:

1. **It starts from the commitment.** ₹13.4 Cr to ₹24 Cr, and which levers are moving it and which are not.
2. **A V5 sets a direction, never a task.** "Keep 10% of the plant free for specialty work" is a direction. "Imran, call Hearthline on Tuesday" is a task. Niyanta should not let Kartik type the second one.
3. **Every number says how sure it is.** A number built on two months of data is shown with that weakness, not hidden and not dressed up.
4. **A V4 can decline a direction** for named cases, with a reason. That is information for the owners, not disobedience.
5. **A direction is judged later:** it worked, it did not, or it is too early to tell. The judgement is on the direction. It is never on a person.
6. **No screen ranks salespeople.** When a sale is lost, Niyanta shows the cause, such as a late sample. It does not show a name to blame.

---

## What you build

A working web app on the data pack. Any stack. Four logins: Kartik, Pranav, Bhandari, Kamath. Their screens must differ because their jobs differ. The same dashboard behind four filters does not count. Show where Ritika's and Aditya's escalations land, and what goes back to them.

### The one journey we will watch

Escalation `E10` in [`data/escalations.json`](data/escalations.json): Karnavati, one of the five big traders, offers 18 tonnes of commodity yarn at ₹352 a kilo to fill an idle line in October. Others pay about ₹380 for the same yarn. Kartik has an existing direction about orders like this, and Bhandari has already responded to it.

Take it from Aditya raising it, through Kartik deciding, to what Bhandari and Kamath each see as a result, and back to Aditya. Then show where that decision will be when the direction comes up for review.

---

## The data pack

| File | What it holds |
|---|---|
| `company.json` | Headline numbers, the commitment and its levers, changeover costs |
| `people.json` | The six people, what each decides, what each says |
| `accounts.csv` | Every account over three years, with price paid against peers |
| `open_orders.csv` | Every open order, with promised and predicted dates |
| `lines.csv` | Each line's last 30 days: output, and where the lost capacity went |
| `delivery_model.json` | How good Aditya's predicted dates are |
| `funnel.csv` | Every pursuit, its stage, and how long the plant took to reply |
| `prospects.csv`, `scoring_rubric.json` | Companies not yet buying, scored out of 100 |
| `escalations.json` | What Ritika and Aditya have sent up |
| `directions.json` | Directions already set, and how the V4s responded |

**Not all of it agrees with itself.** The same is true of every company we work with. Tell us what you found, and what your screen does about it.

---

## What you send us

1. A link to the running app, and the code.
2. A screen recording of no more than three minutes: the `E10` journey through all four logins.
3. One page: what each person sees first and why; what you chose to leave off; what in the data you do not trust.

Put all three in one Google Drive folder and set it so anyone with the link can view. Mail the folder link to **tarun@dtgrowthteams.com** with the subject **Niyanta submission, your name**.

You have 48 hours from the moment you receive this assignment.

---

## How we read it

- Whether four people with four jobs got four different screens.
- Whether a decision shows its cost to the person who will bear it, at the moment it is taken.
- Whether a weak number looks weak.
- What you found wrong in the data.
- What you left off. A screen with fewer things on it, each one there for a reason, beats a full one.

Use AI tools as much as you like. In the call we will open any screen, point at any number, and ask why it is there for that person. You should be able to answer.

---

*Anantha Filament Works and every person, customer and number in this assignment are fictional.*
