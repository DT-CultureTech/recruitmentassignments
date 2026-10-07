# 8. Building it in 48 hours

## A plan that fits

| Hours | What |
|---|---|
| 0 to 3 | Read `context/` and `data/README.md`. Open every file. Note what does not add up. |
| 3 to 6 | For each of the four people, write down on paper the three things they must see first and the one decision they must be able to take. Draw the four first screens by hand. |
| 6 to 30 | Build. Start with the `E10` journey end to end, through all four logins, even if it is ugly. Then the first screen for each person. |
| 30 to 40 | What you found in the data, and what your screens do about it. Confidence bands. Directions. |
| 40 to 46 | Deploy. Record the three minutes. Write the one page. |
| 46 to 48 | Spare. You will need it. |

A working `E10` journey with four plain screens beats four beautiful screens where nothing happens.

## Questions people ask

**Which stack?** Any. A web app we can open in a browser.

**Do the logins need real authentication?** No. A screen to pick who you are is enough. What matters is that each person sees a different screen.

**Can I change the data files?** Do not change what is there. You may add records your app creates: decisions, directions, responses. Keep them in memory, in the browser, or in a small database.

**Do I need a backend?** Only if your design needs one. Reading the files at start-up is fine.

**Where do I deploy?** Anywhere free that gives a public link: Vercel, Netlify, Render, GitHub Pages, or similar.

**How do I record?** Any screen recorder. Upload the file to the same Drive folder.

**Can I use AI tools?** Yes, as much as you like. In the call we will point at any number on any screen and ask why it is there, for that person. You should be able to answer without opening the code.

**The data seems wrong in places.** Some of it is. Say what you found and what your screen does about it. Do not quietly fix it.

**What if I do not finish?** Send what works, and say in your one page what is missing and what you would have done next. An honest account of a half-built journey is worth more than a polished one that hides what is not there.

**Can I ask a question?** Mail tarun@dtgrowthteams.com. We may not answer within your 48 hours, so do not wait on a reply. Make a reasonable assumption and write it down.
