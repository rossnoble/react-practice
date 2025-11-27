export function ComponentCard({
  title = '',
  description = '',
  cardContainer = false,
  children,
}) {
  return (
    <div>
      <header className="mb-2">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600 dark:text-white mb-4">{description}</p>
        )}
      </header>

      {cardContainer ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600 min-h-[200px]">
          {children}
        </div>
      ) : (
        <div className="my-4">{children}</div>
      )}
    </div>
  )
}
