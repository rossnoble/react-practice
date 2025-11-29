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
- [ ] Search input that debounces API calls (300ms delay)
- [ ] Display search results in a list below the input
- [ ] Highlight matching text in search results
- [ ] Show loading spinner while search is in progress
- [ ] Handle empty states ("Start typing to search", "No results found")

### Edge Cases & Error Handling
- [ ] Handle race conditions (older requests finishing after newer ones)
- [ ] Cancel in-flight requests when user types again
- [ ] Handle API errors gracefully with error message display
- [ ] Clear results when input is empty
- [ ] Minimum query length (e.g., 2-3 characters before searching)

### Performance & Polish
- [ ] Memoize search results to avoid re-highlighting on every render
- [ ] Case-insensitive search and highlighting
- [ ] Highlight multiple matches within a single result
- [ ] Proper accessibility (ARIA labels, roles, keyboard support)

### Optional Enhancements
- [ ] Show "X results found" count
- [ ] Recent searches (stored in state/localStorage)
- [ ] Click outside to close results
- [ ] Mobile responsive design

## Success Criteria
- Typing "micr" shows "Microsoft Corporation" with "Micr" highlighted
- No API calls made until user stops typing for 300ms
- Fast typing "abcdef" only triggers 1 API call (not 6)
- Older search results don't override newer ones
- Professional loading states and error handling
