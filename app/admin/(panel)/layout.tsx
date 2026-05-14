import AdminShell from '@/components/admin/AdminShell'

export const metadata = { title: 'Admin — Tenerife Dreams' }

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
