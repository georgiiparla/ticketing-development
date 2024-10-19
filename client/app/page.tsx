import MainWrapper from '@/components/MainWrapper'
import WrapperFlexCol from '@/components/WrapperFlexCol'
import Article from '@/components/Article'

export default async function Page() {
  return (
    <MainWrapper>
      <WrapperFlexCol className='p-6'>
        <br />
        <br />
        <Article />
      </WrapperFlexCol>
    </MainWrapper>
  )
}
