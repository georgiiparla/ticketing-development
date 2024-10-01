import { cookies } from 'next/headers'

import axios, { AxiosResponse, AxiosError } from 'axios'

import {
    CurrentUserResponse,
    SerializedErrorsObject,
    CurrentUser,
    SerializedErrors,
} from '@/lib/definitions'

export async function extractCurrentUser() {
    const cookieStore = cookies()
    const session = cookieStore.get('session')

    let currentUser: CurrentUser | null = null
    let serializedErrors: SerializedErrors | null = null

    try {
        const response = await axios.get<
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
        currentUser = response.data.currentUser
        return currentUser
    } catch (error) {
        const axiosError = error as AxiosError<SerializedErrorsObject>
        if (axiosError.response) {
            serializedErrors = axiosError.response.data.errors
        } else {
            const errorsObject: SerializedErrors = [
                { message: 'Axios unknown error' },
            ]
            serializedErrors = errorsObject
        }
        return serializedErrors
    }
}