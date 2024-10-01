import '@/styles/globals.css'
import { fontSans } from '@/config/fonts'
import { extractCurrentUser } from '@/lib/actions'

import NavBar from '@/components/NavBar'

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
        <NavBar email={currentUserData?.email} id={currentUserData?.id} />
        {children}
      </body>
    </html>
  )
}
