import { ToastNotifications } from '../challenges/toast-notifications'
import { ComponentCard } from '../components/component-card'

export function ToastNotificationsPage() {
  return (
    <ComponentCard
      title="Toast notifications"
      description="Build a toast notification system from scratch"
    >
      <ToastNotifications />
    </ComponentCard>
  )
}
