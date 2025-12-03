import { SearchHighlights } from '../challenges/search-highlights'
import { ComponentCard } from '../components/component-card'

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
