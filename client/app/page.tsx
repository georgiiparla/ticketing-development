import MainWrapper from '@/components/MainWrapper'
import WrapperFlexCol from '@/components/WrapperFlexCol'

import { extractCurrentUser } from '@/lib/actions'

export default async function Page() {
  const response = await extractCurrentUser()

  const currentUserData =
    'email' in response ? { email: response.email, id: response.id } : null

  if (Array.isArray(response)) {
    console.error(response)
  }

  return (
    <MainWrapper>
      <WrapperFlexCol>
        {currentUserData?.email}
        <br />
        {currentUserData?.id}
      </WrapperFlexCol>
    </MainWrapper>
  )
}
