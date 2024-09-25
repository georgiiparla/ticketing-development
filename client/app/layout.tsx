import '@/styles/globals.css'
import { fontSans } from '@/config/fonts'
import NavBar from '@/components/NavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${fontSans.className} dark`}>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
