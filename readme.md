A Node.js and SQLite exercise focused on booking reliability,
concurrency, and testing.

## Overview

The application provides a small appointment-booking API and web
interface. Services have appointment slots with limited capacity.

Your task is to make booking creation reliable when concurrent
requests compete for the same slot.

## Requirements

- Node.js 24 or newer
- npm

## Setup

```bash
npm ci --ignore-scripts
npm start
```

The server runs locally on port 3000 by default.

Configuration:

| Variable | Default | Purpose |
|---|---|---|
| PORT | 3000 | Server port |
| DATABASE_PATH | appointments.sqlite | SQLite database path |

## Task

Update the booking implementation to ensure:

- Successful bookings never exceed slot capacity.
- Remaining availability never becomes negative.
- Failed bookings do not leave partial database changes.
- Existing API responses and validation behavior remain compatible.

Preserve the asynchronous eligibility check and add tests covering
concurrent requests and relevant failure cases.

Keep changes focused. Frontend work, framework migrations, and
unrelated refactoring are not required.

## Tests

```bash
npm test
```

## Timebox

Spend no more than 90 minutes, including setup. If you reach the
limit, submit your progress and describe what remains.

## Evaluation

| Area | Weight |
|---|---|
| Correctness and data consistency | 40% |
| Tests and failure-case coverage | 25% |
| Clarity and maintainability | 20% |
| Explanation of trade-offs | 15% |

## Submission

Submit a private repository or ZIP archive through the channel
provided with the invitation.

Include a brief summary of:

- Your implementation and key decisions.
- How to run any additional tests.
- Assumptions, limitations, and unfinished work.

## Scope

This is a local assessment application, not a production deployment.
The staff endpoint is intentionally unauthenticated.

For questions or setup issues, contact the person who sent you
the exercise."# booking-api-assessment" 
"# booking-api-assessment" 
