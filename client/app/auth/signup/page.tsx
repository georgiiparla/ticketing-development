import MainWrapper from '@/components/MainWrapper'
import TailwindContainer from '@/components/TailwindContainer'
import WrapperFlexCol from '@/components/WrapperFlexCol'

import CustomSignUpForm from '@/components/CustomSignUpForm'

export default function Page() {
  return (
    <MainWrapper>
      <TailwindContainer className='my-auto'>
        <WrapperFlexCol className='p-6'>
          <CustomSignUpForm />
        </WrapperFlexCol>
      </TailwindContainer>
    </MainWrapper>
  )
}
