import { SearchHighlights } from '../components/search-highlights'
import { ComponentCard } from '../components/shared/component-card.jsx'

export function SearchHighlightsPage() {
  return (
    <ComponentCard
      title="Search highlights"
      description="Terms like 'micro', 'go', 'tiny' or 'group' will show good results"
    >
      <SearchHighlights />
    </ComponentCard>
  )
}
