import axios, { AxiosResponse } from 'axios'

interface LoggedUserAttrs {
  email: string
  id: string
}

export default async function Page() {
  console.log('server side')
  try {
    // const response = await axios.get(
    //   'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    //   {
    //     headers: {
    //       Host: 'ticketing.dev',
    //     },
    //   },
    // )
    const response = await axios.get("http://auth-srv:3000/api/users/currentuser")
    console.log(response.data)
  } catch (error) {
    console.log(error.response.data.errors)
  }

  return <></>
}
