import ReactContextProvider from './ReactContextProvider'

const Providers = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: any
}) => {
  return <ReactContextProvider value={value}>{children}</ReactContextProvider>
}

export default Providers
