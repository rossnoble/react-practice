import { useState } from 'react'

type Coordinates = { x: number; y: number }
type Grid = Coordinates[]
type Direction = 'N' | 'E' | 'S' | 'W'

const marker = '🤖'
const ROWS = 8
const COLUMNS = 8

const grid = createGrid({ columns: COLUMNS, rows: ROWS })

const initialCoords = {
  x: 5,
  y: 5,
}
const initialDirection = 'N'

const orientation = ['N', 'E', 'S', 'W'] // 0, 1, 2, 3

export function Roomba() {
  const [direction, setDirection] = useState<Direction>(initialDirection)
  const [coordinates, setCoordinates] = useState<Coordinates>(initialCoords)

  const handleForwardClick = () => {
    const { x, y } = coordinates
    let newCoords = { x, y }

    if (direction === 'N') {
      newCoords.y = Math.max(y - 1, 0)
    } else if (direction === 'S') {
      newCoords.y = Math.min(y + 1, ROWS - 1)
    } else if (direction === 'E') {
      newCoords.x = Math.min(x + 1, COLUMNS - 1)
    } else if (direction === 'W') {
      newCoords.x = Math.max(x - 1, 0)
    }

    setCoordinates(newCoords)
  }

  const handleTurnRightClick = () => {
    const nextDirection = getNextDirection(direction)
    setDirection(nextDirection)
  }

  const handleResetClick = () => {
    setCoordinates(initialCoords)
    setDirection(initialDirection)
  }

  return (
    <div>
      <div
        className="grid w-fit gap-1"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
        }}
      >
        {grid.map(({ x, y }) => (
          <Cell
            coordinates={{ x, y }}
            isRobot={coordinates.x === x && coordinates.y === y}
            key={`${x}-${y}`}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={handleForwardClick}
        >
          Forward &uarr;
        </button>
        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={handleTurnRightClick}
        >
          Turn right &rarr;
        </button>

        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={handleResetClick}
        >
          Reset
        </button>

        <div>Direction: {direction}</div>
      </div>
    </div>
  )
}

function Cell({
  coordinates,
  isRobot = false,
}: {
  coordinates: Coordinates
  isRobot: boolean
}) {
  const { x, y } = coordinates
  const activeClass = isRobot
    ? 'bg-orange-100 border-orange-300'
    : 'bg-gray-100 border-gray-200'

  return (
    <div
      className={`flex size-12 items-center justify-center border-2 text-gray-400 ${activeClass}`}
      data-x={x}
      data-y={y}
    >
      <span>
        {isRobot ? (
          marker
        ) : (
          <>
            {x},{y}
          </>
        )}
      </span>
    </div>
  )
}

function getNextDirection(current: Direction): Direction {
  const currIndex = orientation.findIndex(v => v === current)

  let nextIndex = currIndex + 1
  if (nextIndex >= orientation.length) {
    nextIndex = 0 // Start of array (e.g. "N")
  }

  return orientation[nextIndex] as Direction
}

function createGrid({ columns = 10, rows = 10 }): Grid {
  const grid: Grid = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      grid.push({ x, y })
    }
  }

  return grid
}
