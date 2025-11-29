import { faker } from '@faker-js/faker'

type Company = {
  id: number
  name: string
  ticker: string
}

const generateMockData = (count: number): Company[] => {
  return new Array(count).fill(null).map((_, idx) => ({
    id: idx,
    name: faker.company.name(),
    ticker: faker.string.alpha({ length: 4, casing: 'upper' }),
  }))
}

const MOCK_DATA = generateMockData(500)

export const searchAPI = (query: string) => {
  const delay = 300 + Math.random() * 200 // Random 300-500ms delay
  return new Promise(resolve => {
    // Simulate network delay
    setTimeout(() => {
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
