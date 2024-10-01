import MainWrapper from '@/components/MainWrapper'
import WrapperFlexCol from '@/components/WrapperFlexCol'

import { extractCurrentUser } from '@/lib/actions'

// export const dynamic = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'default-no-store'

export default async function Page() {
  const response = await extractCurrentUser()
  let userEmail = null
  let userId = null

  if ('email' in response) {
    const { email, id } = response
    userEmail = email
    userId = id
  }

  if (Array.isArray(response)) {
    console.error(response)
  }

  return (
    <MainWrapper>
      <WrapperFlexCol>
        {userEmail}
        <br />
        {userId}
      </WrapperFlexCol>
    </MainWrapper>
  )
}
