# 1. The 5×5 grid

PDGMS is the platform DeepThought builds. It describes every company on one grid: five layers of authority going up, five stages of value going across. Every piece of work in the company sits in one or more of the 25 cells.

It is a model of how work flows, not an org chart. A person can work in several cells, and one cell can hold several people.

## The five layers (V1 to V5): how much authority

| Layer | Who | What they do |
|---|---|---|
| **V5** Direction | Founders, MD, board | Set the goal and the direction. Authorise money and priorities. |
| **V4** Strategy | Function heads | Turn the goal into a strategy for one function. Decide which programs exist and resolve problems those programs cannot solve themselves. |
| **V3** Program management | Program managers | Turn strategy into a plan that crosses departments, and run it. |
| **V2** Supervision | Department heads, team leads | Run a department day to day. Allocate people and protect daily output. |
| **V1** Execution | Everyone doing the work | Do the work. |

A layer is depth of authority, not a job title. At Anantha, the MD does V5 work most days and some V4 work on pricing.

## The five stages (H1 to H5): where value is made

| Stage | What it covers | At Anantha |
|---|---|---|
| **H1** Orders | Selling, marketing, getting the order | The commercial team, the funnel, prospects, prices |
| **H2** Experience | What the customer experiences: delivery, quality, service | Delivery dates, sample turnaround, complaints |
| **H3** Capacity | The systems that produce at scale | The 14 lines, texturising, twisting, the run sequence |
| **H4** Capability | Skills, technology and organisation needed to deliver | Operator skills, polymer know-how, certifications (GRS, OEKO-TEX) |
| **H5** Offers | What the company makes and sells | Commodity, semi-specialty and specialty yarn; the antimicrobial and dope-dyed lines |

## The people in this assignment, on the grid

| Person | Cell | Why there |
|---|---|---|
| Kartik, MD | V5, across H1 to H5 | Owns the EBITDA goal; sets prices for big accounts himself (H1) |
| Pranav, Executive Director | V5, across H1 to H5 | Owns direction with Kartik; watches whether H3 can carry new H1 demand |
| Mr. Bhandari, Commercial GM | V4 × H1 | Strategy for selling |
| Mr. Kamath, Plant Head | V4 × H3 | Strategy for the plant |
| Ritika, program manager | V3 × H1 | Runs the growth program across sales and the plant |
| Aditya, program manager | V3 × H3 | Runs the delivery program across planning, production and dispatch |
| Imran, Lavanya, Selvam, Harpreet | V1 × H1 | Sell to accounts |

The problems in this assignment almost all sit **between** cells. A sample request moves from H1 (sales) to H3 (plant) and waits. A cheap order fills H3 and hurts H1's prices. A V5 direction lands on a V4 who disagrees. That is why a V5 and V4 screen exists at all.

## Four kinds of data move across the grid

| Data | Direction | What it says |
|---|---|---|
| **Commitment** | Down (V5 to V1) | "I authorise you to pursue this." The goal becomes strategies, strategies become plans, plans become daily work. |
| **Spec** | Across (H1 to H5) | "This is what I need from the next stage." A sample brief from sales to the plant is a spec. |
| **Ticket** | Back and up | "What happened differs from the plan, and here is the gap." A late order is a ticket. |
| **Reflection** | Up (V1 to V5) | "Here is what we learned from what happened." |

Commitments carry authority down. Tickets and reflections carry accountability and learning back up. Niyanta is where the top of both flows meets.

## Every ticket has one of five causes

When something does not go to plan, PDGMS asks why, and the answer decides where the ticket goes.

| Cause | Meaning | Goes to |
|---|---|---|
| **Budget** | Need more or different money | Finance |
| **Talent** | Need different people or skills in my own team | HR |
| **Internal support** | Another team has not delivered what I need from them | That team |
| **Assumptions** | The world changed from what the plan assumed | Up to V4 or V5, to revise the plan |
| **Permissions** | Need a decision I do not have the authority to make | Up to whoever holds that authority |

Most of what reaches Niyanta is **assumptions** and **permissions**: the plan no longer fits, or someone below needs a decision only a V4 or V5 can take. Look at `data/escalations.json` with this in mind.
