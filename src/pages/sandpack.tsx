import { Sandpack } from '@codesandbox/sandpack-react'

export const SandpackPage = () => {
  return (
    <Sandpack
      template="react"
      theme="auto"
      options={{
        showNavigator: false,
        editorHeight: 600,
      }}
    />
  )
}
