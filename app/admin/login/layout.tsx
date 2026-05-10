// Override parent admin layout — login page has no sidebar
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
