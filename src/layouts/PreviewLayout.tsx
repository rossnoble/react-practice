import { Link } from 'wouter'
import { type PropsWithChildren } from 'react'

type PreviewLayoutProps = PropsWithChildren<{
  onToggleDark: () => void
  isDark: boolean
}>

export const PreviewLayout = ({
  children,
  onToggleDark,
  isDark,
}: PreviewLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="relative border-b border-gray-300 bg-gray-200 px-2 py-4">
        <div className="mx-auto max-w-2xl">
          <button
            onClick={onToggleDark}
            className="absolute top-0 right-0 flex size-8 items-center justify-center rounded-md border-1 border-gray-300 bg-gray-100 p-2 transition-colors hover:bg-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <Link href="/">
            <div className="inline-block">
              <h1 className="mb-2 text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400">
                React Practice
              </h1>
            </div>
          </Link>
          <p className="text-gray-600 dark:text-gray-400">
            Fun exercises for learning and interview and prep
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-2 py-8 md:px-0">
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  )
}
