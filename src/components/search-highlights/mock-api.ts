import { faker } from '@faker-js/faker'

export type Company = {
  id: number
  name: string
  ticker: string
}

const fixedResults = [
  { name: 'Apple Inc.', ticker: 'AAPL' },
  { name: 'Appleyard Productions', ticker: 'APYP' },
  { name: 'Microsoft Corporation', ticker: 'MFST' },
  { name: 'Macrosoft Micro Systems', ticker: 'MMMS' },
  { name: 'Antimicrobial Corp', ticker: 'AMIC' },
  { name: 'Alphabet', ticker: 'GOOG' },
  { name: 'Meta Platforms, Inc.', ticker: 'META' },
].map((item, idx) => ({ id: idx + 1, ...item }))

const generateMockData = (count: number): Company[] => {
  const generated = new Array(count).fill(null).map((_, idx) => ({
    id: idx + fixedResults.length + 1, // Handle offset
    name: faker.company.name(),
    ticker: faker.string.alpha({ length: 4, casing: 'upper' }),
  }))

  return [...fixedResults, ...generated]
}

const MOCK_DATA = generateMockData(500)
console.log({ MOCK_DATA })

export const searchAPI = (query: string): Promise<Company[]> => {
  const delay = 300 + Math.random() * 200 // Random 300-500ms delay

  return new Promise(resolve => {
    // Simulate network delay
    setTimeout(() => {
      if (!query || query.length < 2) {
        return resolve([])
      }

      // Matches by name or by ticker
      const results = MOCK_DATA.filter(
        item =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.ticker.toLowerCase().includes(query.toLowerCase())
      )
      resolve(results)
    }, delay) // Random 300-500ms delay
  })
}
