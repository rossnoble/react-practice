import { type PropsWithChildren } from 'react'

import { Header } from './header'

type Props = PropsWithChildren<{
  onToggleDark: () => void
  isDark: boolean
}>

export const MainLayout = ({ children, onToggleDark, isDark }: Props) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header onToggleDark={onToggleDark} isDark={isDark} />

      <div className="mx-auto">{children}</div>
    </div>
  )
}
