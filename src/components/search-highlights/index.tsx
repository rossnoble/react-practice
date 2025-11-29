import { useState } from 'react'

import { searchAPI, type Company } from './mock-api'

export function SearchHighlights() {
  const [text, setText] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Company[]>([])

  /* @ts-ignore */
  const handleTextChange = ev => {
    setText(ev.target.value)
  }

  /* @ts-ignore */
  const handleFormSubmit = async event => {
    event.preventDefault()
    setQuery(text)
    const results = await searchAPI(query)
    setResults(results)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-8 flex items-center justify-between gap-2">
          <input
            type="text"
            id="query"
            value={text}
            onChange={handleTextChange}
            className="flex-auto border border-gray-300 p-2"
          />

          <button
            type="submit"
            className="border border-gray-300 bg-gray-100 p-2 text-gray-600"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        <h2 className="mb-4 text-lg font-bold">
          Found {results.length} results
        </h2>
        {results.map(result => (
          <div
            key={result.id}
            data-name={result.name}
            data-id={result.id}
            data-ticker={result.ticker}
          >
            <p>
              <Highlight haystack={result.name} needle={query} /> (
              <Highlight haystack={result.ticker} needle={query} />)
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Highlight({ haystack, needle }: { haystack: string; needle: string }) {
  const splitPattern = new RegExp(`(${needle})`, 'gi')

  const parts = haystack
    .split(splitPattern)
    .filter(Boolean)
    .map(part => ({
      text: part,
      isMatch: part.toLowerCase() === needle.toLowerCase(),
    }))

  return (
    <span>
      {parts.map(part =>
        part.isMatch ? (
          <span key={`${haystack}-${part.text}`} className="bg-green-300">
            {part.text}
          </span>
        ) : (
          <span key={part.text}>{part.text}</span>
        )
      )}
    </span>
  )
}
