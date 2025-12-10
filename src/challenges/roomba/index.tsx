import { useState } from 'react'

type Coordinates = { x: number; y: number }
type Grid = Coordinates[]
type Direction = 'N' | 'E' | 'S' | 'W'

const ROBOT = '🤖'
const ROWS = 6
const COLUMNS = 9

const grid = createGrid({ columns: COLUMNS, rows: ROWS })

const initialCoords = {
  x: 3,
  y: 3,
}

// 0=North, 90=East, 180=South, 270=West
const ORIENTATION = ['N', 'E', 'S', 'W'] // 0, 1, 2, 3

type Mode = 'auto' | 'manual'

type RoombaProps = {
  initialMode?: Mode
  initialDirection?: Direction
}

export function Roomba({
  initialDirection = 'N',
  initialMode = 'manual',
}: RoombaProps) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [direction, setDirection] = useState<Direction>(initialDirection)
  const [coordinates, setCoordinates] = useState<Coordinates>(initialCoords)

  const moveForward = () => {
    // FIXME: This could be stale. Should use setCoordinates(prev => )
    const { x, y } = coordinates

    // FIXME: This could be stale. Should use setCoordinates(prev => )
    const currDirection = direction
    let next = { ...coordinates }

    if (currDirection === 'N') {
      next.y = y - 1
    } else if (currDirection === 'S') {
      next.y = y + 1
    } else if (currDirection === 'E') {
      next.x = x + 1
    } else if (currDirection === 'W') {
      next.x = x - 1
    }

    // Handle wall bumps
    if (next.x < 0 || next.x >= COLUMNS || next.y < 0 || next.y >= ROWS) {
      turnRight()
      return
    }

    setCoordinates(next)
  }

  const turnRight = () => {
    const nextDirection = getNextDirection(direction)
    setDirection(nextDirection)
  }

  const handleResetClick = () => {
    setCoordinates(initialCoords)
    setDirection(initialDirection)
  }

  const toggleMode = () => {
    setMode(prev => {
      if (prev === 'manual') {
        return 'auto'
      }
      return 'manual'
    })
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
            direction={direction}
            coordinates={{ x, y }}
            isRobot={coordinates.x === x && coordinates.y === y}
            key={`${x}-${y}`}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500 disabled:text-gray-400"
          onClick={() => moveForward()}
          disabled={mode === 'auto'}
        >
          Forward &uarr;
        </button>
        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={() => turnRight()}
        >
          Turn right &rarr;
        </button>

        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={handleResetClick}
        >
          Reset
        </button>
        <button
          className="active:gray-200 border border-gray-300 bg-gray-100 px-3 py-2 text-sm active:bg-gray-200 active:text-gray-500"
          onClick={toggleMode}
        >
          {mode?.toUpperCase()}
        </button>
        <div>Direction: {direction}</div>
      </div>
    </div>
  )
}

function Cell({
  coordinates,
  isRobot = false,
  direction,
}: {
  coordinates: Coordinates
  isRobot: boolean
  direction: Direction
}) {
  const { x, y } = coordinates
  const activeClass = isRobot
    ? 'bg-orange-100 border-orange-200 border-2'
    : 'bg-gray-100 border-gray-200'

  const rotation = getRotation(direction)

  return (
    <div
      className={`flex size-12 items-center justify-center text-sm text-gray-300 ${activeClass}`}
      data-x={x}
      data-y={y}
    >
      <div>
        {isRobot ? (
          <div
            style={{ transform: `rotate(${rotation}deg)` }}
            className="transition-all duration-300"
          >
            <span className="">{ROBOT}</span>
          </div>
        ) : (
          <>
            [{x},{y}]
          </>
        )}
      </div>
    </div>
  )
}

function getNextDirection(current: Direction): Direction {
  const currIndex = ORIENTATION.findIndex(v => v === current)

  let nextIndex = currIndex + 1
  if (nextIndex >= ORIENTATION.length) {
    nextIndex = 0 // Start of array (e.g. "N")
  }

  return ORIENTATION[nextIndex] as Direction
}

function getRotation(direction: Direction) {
  const degrees = {
    N: 0,
    E: 90,
    S: 180,
    W: 270,
  }

  return degrees[direction]
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
