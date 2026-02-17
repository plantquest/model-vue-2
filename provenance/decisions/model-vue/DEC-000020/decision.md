# DEC-000020 - Full PQS Asset Entity Schema (82+ Field Data Model)

## Summary
Define the complete pqs/asset entity schema with all 82+ fields explicitly typed in TypeScript, validated by JSON Schema, and documented in SPEC-000003.

## Status
**Proposed** - Awaiting approval

## Context
The `pqs/asset` entity in the model-vue codebase only explicitly defined ~15 fields (`entity$`, `id`, `tag`, `xco`, `yco`, `zco`, `building`, `level`, `room`, `atype`, `map`, `custom12`-`custom19`). The actual production asset data model includes **82+ output fields** covering:

- **32 custom fields** (`custom1`-`custom32`)
- **20 data fields** (`data1`-`data20`)
- **10 department fields** (`dept1`-`dept10`)
- **4-level filter hierarchy** (`filtertop`, `filterside`, `filtersubside`, `filtersubside2`)
- **3 discipline fields** (`dicipline1`-`dicipline3`)
- **5 line/piping fields** (`line`, `lineno`, `pidno`, `preceededby`, `followeby`)
- **Polygon geometry** (`poly`) for Room/Area asset types

This gap between the production data contract and the codebase schema meant:
- New developers had no authoritative field reference
- AI agents could not validate asset data completeness
- The backup delivery plane (DEC-000019) lacked full field documentation
- CSV export/import risked silent data loss on unmapped fields

### Evidence
- Production asset data includes all 82+ fields
- Room/Area assets include `poly` field with polygon coordinate arrays
- Existing code relied on `[key: string]: any` catch-all for undocumented fields
- SPEC-000003 bundle schema only referenced `custom12`-`custom19`

## Decision
Expand the `Asset` TypeScript interface and create a formal JSON Schema to cover **all** production fields.

### Artifacts Created/Updated

1. **TypeScript Interface** (`packages/model-vue/src/types/components.ts`)
   - All 82+ fields explicitly declared with types
   - Grouped by category with documentation comments
   - `[key: string]: any` catch-all retained for forward compatibility

2. **JSON Schema** (`provenance/schema/pqs-asset.schema.json`)
   - JSON Schema Draft-07 validation schema
   - Required fields: `entity$`, `id`, `tag`, `xco`, `yco`, `atype`, `map`, `room`, `building`, `level`
   - UUID pattern validation for `id`
   - Two complete examples (point asset + Room/Area with polygon)

3. **SPEC-000003 Update** (`provenance/specs/SPEC-000003/spec.json`)
   - `bundle_entity_schema` now references `pqs-asset.schema.json`
   - Added `csv_output_order` for canonical column ordering
   - Added `optional_field_groups` documentation

4. **useHeadSearch re-exports** (both `packages/model-vue/` and `src/`)
   - Changed from duplicate interface to `export type { Asset }` from components

### Field Categories

| Category | Fields | Count |
|----------|--------|-------|
| Identity & Core | `entity$`, `id`, `tag`, `description` | 4 |
| Positioning | `xco`, `yco`, `zco`, `map`, `floorz` | 5 |
| Classification | `atype`, `gt2m`, `gt4m`, `anodedep`, `icon` | 5 |
| Location | `room`, `loc`, `building`, `level` | 4 |
| Filter Hierarchy | `filtertop`, `filterside`, `filtersubside`, `filtersubside2` | 4 |
| Disciplines | `dicipline1`, `dicipline2`, `dicipline3` | 3 |
| Grouping | `agroupname` | 1 |
| Departments | `dept1`-`dept10` | 10 |
| Custom Fields | `custom1`-`custom32` | 32 |
| Data Fields | `data1`-`data20` | 20 |
| Line/Piping | `line`, `lineno`, `pidno`, `preceededby`, `followeby` | 5 |
| Geometry | `poly` | 1 |
| **Total** | | **94** |

### CSV Output Order (82 columns)

```
tag,description,xco,yco,zco,map,floorz,atype,gt2m,gt4m,anodedep,room,loc,icon,
data1,data2,data3,filtertop,filterside,filtersubside,filtersubside2,
dicipline1,dicipline2,dicipline3,agroupname,
dept1,dept2,dept3,dept4,dept5,dept6,dept7,dept8,dept9,dept10,
custom1,custom2,custom3,custom4,custom5,custom6,custom7,custom8,custom9,custom10,
custom11,custom12,custom13,custom14,custom15,custom16,custom17,custom18,custom19,
custom20,custom21,custom22,custom23,custom24,custom25,custom26,custom27,custom28,
custom29,custom30,custom31,custom32,
data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,
data16,data17,data18,data19,
line,lineno,pidno,preceededby,followeby
```

> **Note**: `entity$`, `id`, `building`, `level`, and `poly` are structural/geometry fields not in the CSV output order but present in the JSON entity.

### Asset Type Variants

#### Point Asset (standard)
Positioned by `xco`/`yco` coordinates on a map level. Examples: Valve, Breakglass Unit, Fire Extinguisher.

```json
{
  "entity$": "-/pqs/asset",
  "id": "5EB693A7-CB5B-4DC4-B1C8-F051EBCFE895",
  "tag": "P6L5M04",
  "xco": "6040",
  "yco": "5157",
  "atype": "Breakglass Unit",
  "map": "1",
  "room": "ELEC/ MCC W01.62",
  "building": "Warehouse",
  "level": "Level 1"
}
```

#### Room/Area Asset (polygon)
Includes `poly` field defining spatial boundary. `xco`/`yco` represent centroid or label position.

```json
{
  "entity$": "-/pqs/asset",
  "id": "67ECE5AA-31A4-46D7-A986-1A8001B9204A",
  "tag": "PDMS STORE ROOM A03.31",
  "xco": "7851",
  "yco": "4323",
  "atype": "Room/Area",
  "map": "3",
  "room": "PDMS STORE ROOM A03.31",
  "building": "Lab Admin",
  "level": "Level 3",
  "poly": [
    [3584, 7920], [3621, 7920], [3621, 7877], [3668, 7877],
    [3668, 7828], [3590, 7828], [3590, 7866], [3584, 7866]
  ]
}
```

### Field Spelling Notes

The following field names use non-standard spellings that **match the production database column names exactly**:

| Field | Expected Spelling | Actual Spelling | Reason |
|-------|-------------------|-----------------|--------|
| `dicipline1`-`3` | discipline | dicipline | Production DB column name |
| `preceededby` | precededby | preceededby | Production DB column name |
| `followeby` | followedby | followeby | Production DB column name |

> **WARNING**: Do NOT rename these fields. Renaming would be a **breaking change** requiring a separate migration decision, database column rename, and coordination with all PQS deployments.

## Consequences

### Positive
- **Single source of truth**: One authoritative field list for all consumers
- **Type safety**: IDE autocomplete and compile-time checks for all 82+ fields
- **Schema validation**: JSON Schema enables automated validation of bundle generation
- **Documentation**: Field categories and CSV output order are self-documenting
- **Forward compatible**: `[key: string]: any` catch-all allows new fields without interface changes

### Negative
- **Large interface**: 94 explicit fields make the Asset interface verbose
- **Maintenance**: New production fields must be added to three places (TypeScript, JSON Schema, SPEC)
- **No runtime validation**: TypeScript types are compile-time only; runtime validation requires JSON Schema check

### Neutral
- **No breaking changes**: Additive only - all existing code continues to work unchanged
- **Field spellings preserved**: Non-standard spellings match production DB (no refactoring)

## Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Field name mismatch with production DB | Medium | Low | Schema derived from production asset data samples |
| Missing field from production schema | Low | Medium | Catch-all `[key: string]: any` handles unknown fields silently |
| Runtime type mismatch (string vs number) | Low | Medium | `xco`/`yco` typed as `string \| number` to handle both |

## Related Decisions
- **DEC-000007**: Seneca entity model (defines `pqs/asset` entity pattern)
- **DEC-000019**: Backup Delivery Plane (consumes asset entities for bundle generation)
- **DEC-000004**: Vuex state management (stores assets at `vxg.ent.asset.list`)

## Related Specifications
- **SPEC-000003**: Backup Delivery Plane (bundle_entity_schema updated to reference full schema)
