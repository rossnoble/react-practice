export function ComponentCard({ title = '', description = '', children }) {
  return (
    <div>
      <header>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-gray-600 dark:text-white mb-4">{description}</p>}
      </header>
      <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 min-h-[200px]">
        {children}
      </article>
    </div>
  )
}
