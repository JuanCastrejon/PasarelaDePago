# Payment PSE Rail Audit

## Purpose

Use this skill when researching `PSE` as a payment rail for Colombia, especially when the goal is to understand:

- payer flow
- entity selection
- registration requirements
- redirection chain
- challenge / authorization step
- references such as `CUS`
- merchant notification and reconciliation implications

## Workflow

1. Start from official `PSE` and `ACH Colombia` sources.
2. Separate clearly:
   - checkout provider behavior
   - PSE rail behavior
   - financial entity behavior
3. If user-provided screenshots or HTML are available, extract:
   - fields shown
   - order of data capture
   - timeout signals
   - abandonment signals
   - entity challenge behavior
4. Determine whether the visible selector contains only banks or a broader set of entities.
5. Map the state machine from:
   - merchant checkout
   - PSE handoff
   - entity challenge
   - final confirmation
6. Document what must be persisted for support and reconciliation.

## Mandatory output

- Objective
- Official behavior of PSE
- Observed real-world flow
- Point of no return
- Entity taxonomy
- Architectural implications
- Required fields and references
- Sources

## Rules

- Do not overwrite existing research docs; create a new versioned file.
- Do not expose or repeat user PII from screenshots unless strictly necessary.
- Treat PSE as a rail, not just a payment-method label.
- Distinguish direct observation from documented behavior.

