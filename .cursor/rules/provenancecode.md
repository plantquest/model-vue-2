# ProvenanceCode G2 Rules for Cursor

## Overview

This project uses ProvenanceCode G2 (v2.0) for decision and risk tracking.

**Configuration:**
- App Code: MVE2
- Default Area: CORE
- ID Format: DEC-{APP}-{AREA}-{SEQ6}
- Risk ID Format: RSK-{APP}-{AREA}-{SEQ6}

## Decision Record Creation

When creating ProvenanceCode decision records:

### 1. Use G2 Schema
All decisions must reference: `https://provenancecode.org/schemas/decision.g2.schema.json`

### 2. ID Format
`DEC-MVE2-CORE-{SEQ6}`

Auto-increment the sequence number by checking existing files in `provenance/decisions`

### 3. Required Fields
- `schema`: G2 schema URL
- `decision_id`: Properly formatted ID
- `title`: Brief, descriptive title
- `status`: Default to "draft"
- `context`: Why this decision is needed
- `decision`: What was decided

### 4. Status Values
`draft` | `proposed` | `accepted` | `rejected` | `deprecated` | `superseded`

### 5. Best Practices
- ✅ Link PRs and issues in the `links` array
- ✅ Document consequences (positive and negative)
- ✅ Assess risks
- ✅ Keep records atomic and focused
- ✅ Use the CLI: `npx prvc journal add "Title"`

## Risk Record Creation

When creating risk records:

### 1. Use G2 Schema
`https://provenancecode.org/schemas/risk.g2.schema.json`

### 2. ID Format
`RSK-MVE2-CORE-{SEQ6}`

### 3. Severity Levels
`low` | `medium` | `high` | `critical`

### 4. Status Values
`open` | `monitoring` | `mitigated` | `accepted` | `closed`

### 5. Link Decisions
Use `linked_decisions` array to reference related decision IDs

## CLI Commands

```bash
# Quick add decision
npx prvc journal add "Decision title"

# Use template
npx prvc template use architecture

# Validate
npx prvc validate

# Check quality
npx prvc quality

# Search
npx prvc search "keyword"

# Show decision
npx prvc show DEC-MVE2-CORE-000001
```

## Important Notes

- ⚠️ Do NOT enforce approval workflows (CLI doesn't do governance)
- ⚠️ Do NOT block PRs based on decision status
- ✅ DO validate JSON schema compliance
- ✅ DO encourage linking related records
- ✅ DO default to "draft" status for new records

## Templates Available

Use `npx prvc template list` to see all templates:
- architecture
- security
- tech-debt
- api
- database
- tooling
- performance

## Example Decision

```json
{
  "schema": "https://provenancecode.org/schemas/decision.g2.schema.json",
  "decision_id": "DEC-MVE2-CORE-000001",
  "title": "Use PostgreSQL for main database",
  "status": "draft",
  "context": "Need reliable ACID-compliant database",
  "decision": "We will use PostgreSQL as our primary database",
  "consequences": "Strong consistency, mature tooling, but need careful schema migrations",
  "risk": "Potential scaling challenges at very high volumes",
  "links": []
}
```

---

**ProvenanceCode CLI** - Making decision documentation effortless
