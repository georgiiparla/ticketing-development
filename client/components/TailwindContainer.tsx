export default function TailwindContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='container mx-auto my-auto'>{children}</div>
}
