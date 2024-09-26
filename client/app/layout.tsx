import '@/styles/globals.css'
import { fontSans } from '@/config/fonts'
import NavBar from '@/components/NavBar'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { cookies } from 'next/headers'

interface CurrentUserResponse {
  currentUser: {
    email: string
    id: string
    iat: number
  }
}

type SerializedErrors = {
  message: string
  [key: string]: any
}[]

interface SerializedErrorsObject {
  errors: SerializedErrors
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('server side')
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  let response: AxiosResponse<CurrentUserResponse, any> | null = null
  try {
    response = await axios.get<
      CurrentUserResponse,
      AxiosResponse<CurrentUserResponse>
    >(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev',
          Cookie: `session=${session?.value}`,
        },
      },
    )
    console.log(response.data)
  } catch (error) {
    const axiosError = error as AxiosError<SerializedErrorsObject>
    if (axiosError.response) {
      console.log(axiosError.response.data.errors)
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request)
    } else {
      console.error('Error:', axiosError.message)
    }
  }
  return (
    <html lang='en' className={`${fontSans.className} dark`}>
      <body>
        <NavBar currentUser={response ? response.data.currentUser : null} />
        {children}
      </body>
    </html>
  )
}
