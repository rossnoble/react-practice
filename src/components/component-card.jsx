export function ComponentCard({ title = '', description = '', children }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 min-h-[200px]">
        <header>{description && <p className="text-gray-600 mb-4">{description}</p>}</header>
        <div>{children}</div>
      </div>
    </div>
  )
}
