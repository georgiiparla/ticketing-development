export default function WrapperFlexCol({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string
}) {
  return (
    <div className={`flex w-full flex-col items-center ${className}`}>
      {children}
    </div>
  )
}
