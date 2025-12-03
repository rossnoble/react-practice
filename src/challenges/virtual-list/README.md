# Virtual List

Build a performant list that renders thousands of items efficiently by only
rendering visible elements. This component should only render in the viewport
the visible items based on the scroll position.

Visual example:

Total items: 10,000 (itemHeight: 50px each)

```
┌─────────────────────┐
│ [Padding Top]       │ ← 2500px (items 0-49 not rendered)
│ Item 50             │ ← Actually rendered
│ Item 51             │
│ Item 52             │
│ ...                 │
│ Item 65             │ ← Actually rendered
│ [Padding Bottom]    │ ← 496,750px (items 66-9999 not rendered)
└─────────────────────┘
```

Total scroll height: 500,000px (10,000 × 50px)
Rendered items: Only 16 items in viewport

## Task 1

- [ ] Create a generic component that handles the virtualization and lets the consumer do the rendering
- [ ] Assume the item height is fixed and passed as a property
- [ ] Accept a container height property and make sure the component scales as the height changes
