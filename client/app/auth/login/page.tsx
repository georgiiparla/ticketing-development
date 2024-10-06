import MainWrapper from '@/components/MainWrapper'
import TailwindContainer from '@/components/TailwindContainer'
import WrapperFlexCol from '@/components/WrapperFlexCol'

import CustomLoginForm from '@/components/CustomLoginForm'

export default function Page() {
  return (
    <MainWrapper>
      <TailwindContainer className='my-auto'>
        <WrapperFlexCol className='p-6'>
          <CustomLoginForm />
        </WrapperFlexCol>
      </TailwindContainer>
    </MainWrapper>
  )
}
