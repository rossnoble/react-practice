import { type ReactNode } from 'react'

type ComponentCardProps = {
  title?: string
  description?: string
  cardContainer?: boolean
  children: ReactNode
}

export function ComponentCard({
  title = '',
  description = '',
  cardContainer = false,
  children,
}: ComponentCardProps) {
  return (
    <div>
      <header className="mb-2">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        {description && (
          <p className="mb-4 text-gray-600 dark:text-white">{description}</p>
        )}
      </header>

      {cardContainer ? (
        <div className="min-h-[200px] rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-600 dark:bg-gray-900">
          {children}
        </div>
      ) : (
        <div className="my-4">{children}</div>
      )}
    </div>
  )
}
