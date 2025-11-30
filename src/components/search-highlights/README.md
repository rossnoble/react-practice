# Search suggestions

Build a search input that displays search results as the user types. The results
will be matched by `name` or by `ticker` on the Company record. Display the matching
query inside the search results.

```ts
type Company = {
  id: number
  name: string // <-- match
  ticker: string // <-- match
}
```

See `mock-api.ts` for details.

## Requirements

### Core Functionality
- [x] Display search results in a list below the input
- [x] Search input that debounces API calls (300ms delay)
- [x] Highlight matching text in search results
- [x] Show loading spinner while search is in progress
- [x] Handle empty states ("Start typing to search", "No results found")
- [x] Show "X results found" count

### Edge Cases & Error Handling
- [x] Handle race conditions (older requests finishing after newer ones)
- [x] Cancel in-flight requests when user types again
- [x] Handle API errors gracefully with error message display
- [x] Clear results when input is empty
- [x] Minimum query length (e.g., 2-3 characters before searching)

### Performance & Polish
- [ ] Memoize search results to avoid re-highlighting on every render
- [x] Highlight multiple matches within a single result
- [ ] Proper accessibility (ARIA labels, roles, keyboard support)
- [ ] Recent searches (stored in state/localStorage)

## Success Criteria
- [x] Typing "micr" shows "Microsoft Corporation" with "Micr" highlighted
- [x] No API calls made until user stops typing for 300ms
- [x] Fast typing "abcdef" only triggers 1 API call (not 6)
- [x] Older search results don't override newer ones
- [x] Proper loading states and error handling
