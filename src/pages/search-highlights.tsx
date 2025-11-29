import { SearchHighlights } from '../components/search-highlights'
import { ComponentCard } from '../components/shared/component-card.jsx'

export function SearchHighlightsPage() {
  return (
    <ComponentCard
      title="Search Highlights"
      description="Searching for 'go', 'group' or 'micro' will show good results"
    >
      <SearchHighlights />
    </ComponentCard>
  )
}
