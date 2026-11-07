# Steady

A concept prototype for Part 2 of the Mosaic Fellowship challenge, built for Be Bodywise hair-care customers. It is not an official Mosaic or Be Bodywise product.

## The problem

> Customers decide whether a hair product "works" without knowing how long a fair trial takes, what it will cost, what the ingredients do, or whether they need more than one product. Without that, normal slow progress reads as failure and customers leave or feel misled.

### What five Be Bodywise customers said (Part 1)

| Customer | Product | What they said | What it points to |
|---|---|---|---|
| 1 | Advanced Hair Growth Serum | Three months in, some less hair fall but expected more growth; wants clearer timelines and advice tailored to their hair | Unclear timeline, no personal guidance |
| 2 | Hair Growth Serum Roll-On | Likes targeted use, finds it poor for full coverage; wants a bigger bottle or refill | Packaging and cost over time |
| 3 | Serum and Biotin Gummies | Convenient but getting expensive; unsure whether both are needed | Unclear which products they need, cost |
| 4 | Hair Growth Serum Roll-On | Found it online, sees less improvement than expected; says messaging should be more realistic and wants expert access | Expectation gap, no expert access |
| 5 | Advanced Hair Growth Serum | Likes the texture, finds it pricey, wants ingredient detail and loyalty offers | Ingredient education, price |

Names, phone numbers and consent are in the Part 1 document and are not used anywhere in this app.

**Pattern:** customers 1 and 4 expected faster results, customers 1, 3 and 4 wanted guidance on suitability or expert input, customers 3 and 5 raised cost, and customer 5 wanted ingredient detail. The app focuses on expectation management and product education because they were the most common themes and affect the customer journey before, during and after purchase. Packaging, refills and loyalty offers are real issues but are product and pricing decisions, so they are out of scope here.

## How the app responds

| Customer need | Feature |
|---|---|
| "How long until I see results?" (1, 4) | Dated timeline from the start date, with an early check, a halfway check and a fair-review date. The user sets the review time from their label or an expert, and 12 weeks is a placeholder. |
| "Is this costing too much for what I'll learn?" (3, 5) | Cost of a fair trial: monthly cost and the total to reach the review date, so the decision is made up front. |
| "Do I need both products?" (3) | Questions to ask an expert, with extra questions when several products are selected. |
| "How do I know if the product suits me?" (1, 4) | Expert-question list, and a check-in log with a safety rule: a reported reaction or heavy shedding overrides all timeline messaging and says to stop and get advice. |
| "What do the ingredients do?" (5) | The expert list asks this directly. The app makes no ingredient claims, since those belong to Be Bodywise and its experts. |

## What it does not do

No diagnosis, no product recommendations, no promise of results, no accounts, no server. Data stays in React state unless the user chooses Save on this device, which writes to localStorage. Delete my data removes it.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 13 unit tests on lib/plan-engine.ts
npm run typecheck
npm run lint
npm run build
```

Deploy: push to GitHub, import the repo at vercel.com, accept the defaults.

## Structure

- `lib/plan-engine.ts` dates, stages, cost and safety triage (pure functions)
- `components/Setup.tsx` plan form and validation
- `components/Dashboard.tsx` timeline, cost, check-ins, expert questions
- `components/App.tsx` state and optional local saving
- `__tests__/plan-engine.test.ts` milestone dates, stage boundaries, cost maths, safety precedence

## Before real use

Be Bodywise and clinicians would need to supply the real time frames per product, ingredient information and expert access. Copy needs clinical review, and the app needs an accessibility audit and testing with real customers.
