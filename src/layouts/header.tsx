import { MoonIcon, SunIcon } from 'lucide-react'
import { Link } from 'wouter'

type Props = {
  onToggleDark: () => void
  isDark: boolean
}

export const Header = ({ isDark, onToggleDark }: Props) => (
  <header className="relative border-b border-gray-800 bg-gray-700 px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
    <div className="mx-auto flex max-w-2xl items-center justify-between">
      <h1 className="text-lg font-bold tracking-wider text-gray-900 uppercase transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
        <Link href="/" className="text-gray-50!">
          React Practice
        </Link>
      </h1>

      <button
        onClick={onToggleDark}
        className="flex size-8 items-center justify-center rounded-full border-1 border-gray-700 bg-gray-50 bg-gray-800 p-2 hover:border-gray-600 hover:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <SunIcon className="text-gray-300" />
        ) : (
          <MoonIcon className="text-gray-300" />
        )}
      </button>
    </div>
  </header>
)
