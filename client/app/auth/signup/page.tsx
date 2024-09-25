'use client'

import React from 'react'
import MainWrapper from '@/components/MainWrapper'
import TailwindContainer from '@/components/TailwindContainer'
import WrapperFlexCol from '@/components/WrapperFlexCol'
import CustomLoginForm from '@/components/CustomLoginForm'

export default function Page() {
  return (
    <MainWrapper>
      <TailwindContainer>
        <WrapperFlexCol>
          <CustomLoginForm />
        </WrapperFlexCol>
      </TailwindContainer>
    </MainWrapper>
  )
}
