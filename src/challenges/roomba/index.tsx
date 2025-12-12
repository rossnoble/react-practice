import { useEffect, useState } from 'react'

type Direction = 'N' | 'E' | 'S' | 'W'
type Coordinates = { x: number; y: number }

const grid = createGrid()
const directions = ['N', 'E', 'S', 'W']
const cellSize = 48
const speed = 800

const rotationLookup: Record<Direction, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}

export function Roomba() {
  const [position, setPosition] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>('N')
  const [mode, setMode] = useState('manual')

  const onMove = () => {
    const next = getNextPosition(direction, position)

    // Handle walls and boundaries
    if (next.x < 0 || next.x > 9 || next.y < 0 || next.y > 9) {
      const randomIndex = Math.floor(Math.random() * 4)
      const nextDir = directions[randomIndex] as Direction
      setDirection(nextDir)
      return
    }

    return setPosition(next)
  }

  const onTurnRight = () => {
    setDirection(prev => {
      const currDirIndex = directions.findIndex(dir => dir === prev)

      let nextDirIndex = currDirIndex + 1
      if (nextDirIndex >= directions.length) {
        nextDirIndex = 0
      }

      const nextDir = directions[nextDirIndex] as Direction
      if (nextDir) {
        return nextDir
      }
      return prev
    })
  }

  const rotation = rotationLookup[direction] ?? 0

  useEffect(() => {
    if (mode !== 'auto') return

    const intervalId = setInterval(() => {
      onMove()
    }, speed)

    return () => {
      clearInterval(intervalId)
    }
  }, [mode, position, direction])

  return (
    <div>
      <div className="relative grid w-max grid-cols-10 border border-gray-300">
        {grid.map(({ x, y }) => (
          <div
            key={`${x}-${y}`}
            className="flex items-center justify-center border border-gray-100 text-gray-300"
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
          >
            {x},{y}
          </div>
        ))}
        <Marker rotation={rotation} position={position} />
      </div>

      <div className="mt-8">
        <button
          onClick={onMove}
          className="border border-gray-300 bg-gray-100 px-4 py-2 hover:border-gray-400 active:bg-gray-200"
        >
          Forward
        </button>
        <button
          onClick={onTurnRight}
          className="border border-gray-300 bg-gray-100 px-4 py-2 hover:border-gray-400 active:bg-gray-200"
        >
          Turn right
        </button>
        <button
          onClick={() => setMode(prev => (prev === 'auto' ? 'manual' : 'auto'))}
          className="border border-gray-300 bg-gray-100 px-4 py-2 hover:border-gray-400 active:bg-gray-200"
        >
          {mode}
        </button>

        <p>
          Current position: {position.x},{position.y}
        </p>
        <p>Current direction: {direction}</p>
      </div>
    </div>
  )
}

function Marker({
  rotation,
  position,
}: {
  rotation: number
  position: Coordinates
}) {
  const left = position.x * cellSize
  const top = position.y * cellSize

  return (
    <div
      className="absolute flex items-center justify-center rounded-full border-3 border-gray-500 bg-gray-400 text-lg font-bold text-white shadow-sm/70 shadow-sky-500 transition-all ease-linear"
      style={{
        transform: `rotate(${rotation}deg)`,
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        left: `${left}px`,
        top: `${top}px`,
        transitionDuration: `${speed}ms`,
      }}
    >
      <div className="mb-3 flex gap-2">
        <div className="h-1 w-2 rounded-md bg-sky-600" />
        <div className="h-1 w-2 rounded-md bg-sky-600" />
      </div>
    </div>
  )
}

// Create coords from 0,0 up to 9,9
// [{ x: 0, y: 0 } ... { x: 9, y: 9 }]
function createGrid() {
  const coords = []

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      coords.push({ x, y })
    }
  }

  return coords
}

function getNextPosition(dir: Direction, coords: Coordinates) {
  if (dir === 'N') return { ...coords, y: coords.y - 1 }
  if (dir === 'E') return { ...coords, x: coords.x + 1 }
  if (dir === 'S') return { ...coords, y: coords.y + 1 }
  if (dir === 'W') return { ...coords, x: coords.x - 1 }

  return coords
}
