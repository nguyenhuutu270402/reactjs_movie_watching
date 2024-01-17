// import Sidebar from 'src/components/Sidebar'

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  return (
    <div className='flex h-screen overflow-hidden justify-center'>
      {/* <Sidebar /> */}
      {children}
    </div>
  )
}
