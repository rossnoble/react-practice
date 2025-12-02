import { useState, useRef } from 'react'

import { searchAPI, type Company } from './mock-api'

export function SearchHighlights() {
  const [text, setText] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [results, setResults] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const timeoutRef = useRef<number | undefined>(undefined)
  const requestRef = useRef(0)

  /* @ts-ignore */
  const handleTextChange = async ev => {
    const currentValue = ev.target.value

    setText(currentValue)
    setError('')

    // Clear previous timeout if present
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      const requestId = (requestRef.current += 1)

      setIsLoading(true)

      try {
        const results = await searchAPI(currentValue)

        // Only update if request id matches most recent request
        if (requestId === requestRef.current) {
          setQuery(currentValue)
          setResults(results)
        }
      } catch (err) {
        setError('Request failed. Please try again')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)
  }

  /* @ts-ignore */
  const handleFormSubmit = async event => {
    event.preventDefault()

    setIsLoading(true)
    setQuery(text)
    setError('')

    try {
      const results = await searchAPI(text)
      setResults(results)
    } catch (err) {
      setError('Request failed. Please try again')
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const getResultTitle = () => {
    if (results.length) {
      return `Found ${results.length} results`
    }

    return 'No results found'
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-8 flex items-center justify-between gap-2">
          <input
            type="text"
            id="query"
            value={text}
            placeholder="Search by company name or ticker"
            onChange={handleTextChange}
            className="flex-auto border border-gray-300 bg-white p-2"
          />

          <button
            type="submit"
            className="cursor-pointer border border-gray-300 bg-gray-100 p-2 text-gray-600 active:bg-gray-200 active:text-gray-400"
          >
            Search
          </button>
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : !error ? (
        <div>
          {!query ? (
            <p>Start typing to search...</p>
          ) : (
            <h2 className="mb-4 text-lg font-bold">{getResultTitle()}</h2>
          )}
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
      ) : null}
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
