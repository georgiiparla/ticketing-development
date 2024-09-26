import axios, { AxiosResponse, AxiosError } from 'axios'
import { cookies } from 'next/headers'

interface LoggedUserPayloadAttrs {
  email: string
  id: string
  iat: number
}

type SerializedErrors = {
  message: string
  [key: string]: any
}[]

interface SerializedErrorsObject {
  errors: SerializedErrors
}

export default async function Page() {
  console.log('server side')
  const cookieStore = cookies()
  const session = cookieStore.get('session')
  try {
    const response = await axios.get<
      LoggedUserPayloadAttrs,
      AxiosResponse<LoggedUserPayloadAttrs>
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

  return <></>
}
