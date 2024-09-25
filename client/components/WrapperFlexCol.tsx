export default function WrapperFlexCol({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex w-full flex-col items-center p-6'>
      {children}
    </div>
  )
}
