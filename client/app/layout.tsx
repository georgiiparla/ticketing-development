import '@/styles/globals.css'
import { fontSans } from '@/config/fonts'
import { extractCurrentUser } from '@/lib/actions'

import NavBar from '@/components/NavBar'
import Providers from '@/components/Providers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const response = await extractCurrentUser()

  const currentUserData =
    'email' in response ? { email: response.email, id: response.id } : null

  if (Array.isArray(response)) {
    console.error(response)
  }

  return (
    <html lang='en' className={`${fontSans.className} dark`}>
      <body>
        <Providers value={currentUserData}>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
