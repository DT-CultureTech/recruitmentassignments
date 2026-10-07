# 4. How a yarn plant makes money, and loses it

You do not need to know textiles to do this assignment. You need enough to know why the four owners argue. This is that much.

## How the yarn is made

```
plastic chips ──► extrusion (spinning) ──► texturising ──► twisting ──► packed, dispatched
                    14 lines               6 machines      4 machines
```

1. **Extrusion.** Polyester chips are melted and pushed through a plate with tiny holes (a spinneret). Each hole makes one filament. The filaments together make one yarn. Every order starts here.
2. **Texturising.** Some yarn is crimped and heated so it feels soft and bulky instead of smooth and shiny.
3. **Twisting.** Some yarn is twisted, or several yarns are twisted together.

An order's **route** says which stages it needs: `EXT` only, `EXT>TX`, `EXT>TX>TW` or `EXT>TW`. Longer routes take longer.

**How a yarn is named.** `150/48 SD` means 150 denier (weight of 9 km of yarn, in grams), 48 filaments, semi-dull lustre. `BR` is bright, `FD` full dull. **Dope-dyed** means the colour is mixed into the melt, so the yarn is coloured all the way through.

## Why small orders cost money

A line runs one yarn at a time. Changing it costs in two ways:

| Change | What it costs at Anantha |
|---|---|
| Filament count or denier | 12 hours with the line stopped: about 900 kg not made, about ₹47,000 of contribution lost |
| Colour family (for example light to dark) | About 380 kg of mixed yarn written off while the colour clears: about ₹1.58 lakh |

So a 500 kg trial order earns about ₹26,000 and costs at least ₹47,000 to set up. It loses money on the day. It is either an investment in a customer, decided as one, or a mistake.

**Special polymers** (cationic, flame retardant, recycled) are run in campaigns: the plant waits until at least 4 tonnes of orders for that polymer are booked, then runs them together. An order for 700 kg of a special polymer can wait weeks for others to join it.

**Mixed-lustre orders** (`MX`) cannot share a changeover with anything. Each one writes off cleaning loss.

**First in, first out** is the plant's stated rule. It is broken for two good reasons (two orders that share a set-up are run together) and one costly one (a senior person marks an order urgent, and everything behind it moves back).

## Where the money is

| | Share of volume | Earns (contribution) |
|---|---|---|
| Commodity yarn | 62% | 8% of the price |
| Semi-specialty | 31% | 18% |
| Specialty | 7% | 40% |

**Contribution** is price minus the costs that rise with each kilo (chips, power, packing). It has to pay for the fixed costs (salaries, the plant, interest on machines) before anything is left.

Anantha's blended contribution is 13.3% of revenue. Fixed costs are 9.1%. What is left, 4.2%, is EBITDA: ₹13.4 Cr on ₹318 Cr. To reach ₹24 Cr on the same tonnage, the mix has to move towards specialty, prices have to stop leaking, or less has to be thrown away. Selling more commodity does not get there.

One caution: nothing in Anantha's ERP holds a cost per kilo for any product. Contribution rates are Finance's yearly estimate per segment. Any contribution figure for a single order or account is an estimate and should look like one.

## Three kinds of order

The MD decides which of these an order is:

- **Good margin**: it pays well. Take it.
- **Strategic**: it pays below the line, but wins or keeps an account that matters.
- **Filler**: it pays little, but keeps a line from standing idle.

Every filler order is a bet that nothing better would have come for that capacity. Every refused filler order is the opposite bet.

## The two sides of the argument

**The plant's view.** Fill the order book two months ahead and delays disappear, because the plant can sequence work and stop changing over every few hours. Small lots on large lines waste capacity.

**The sales view.** Customers will not wait more than 30 days. If the plant takes ten days to answer a sample request, the customer has placed the order elsewhere. A line kept free for specialty that nobody has sold yet is just idle.

Both are right about their own side. The cost of each choice lands on the other side. A V5 screen that shows only one side's cost to the person deciding is how the company has ended up at 4.2%.

## Bottlenecks

A plant moves only as fast as its slowest stage. If extrusion lines sit idle while texturising is booked three weeks ahead, adding more orders that need texturising makes delivery worse, not better. The constraint is at the boundary between stages. Look for it in `data/lines.csv`.

## Customers

| Kind | What they buy on |
|---|---|
| **Traders** | Price and availability. Large volumes, resold to many small weavers. Anantha's five largest accounts are traders. |
| **Weavers and knitters** | Price, consistency, delivery. They make fabric. |
| **Brands that also make** | Specification. They write a technical spec, test against it, and pay for a yarn that passes. Few, slow to win, valuable. |

**Premium vs peers** compares what an account pays per kilo with what other customers pay for the same yarn. **Coverage** is how much of that account's buying has a comparable peer. A big premium on low coverage describes a small corner of an account.

## How a new customer is won

```
Lead ► MQL ► SQL ► Opportunity ► Quote sent ► Quote approved ► PO received
```

- **MQL**: they buy on value, not only price, and make something Anantha's yarn fits.
- **SQL**: they ask for a sample and say what they will test it for.
- **Opportunity**: the plant has committed time to make the sample. From here, every delay costs plant time and the customer's patience.
- A pursuit can end **lost** (the customer went elsewhere) or **disqualified** (they only buy on price).

`data/funnel.csv` shows where Anantha's pursuits are, where they stopped, and how long the plant took to answer each brief.
