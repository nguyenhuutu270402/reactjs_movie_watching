import Sidebar from 'src/components/Sidebar'

interface Props {
  children: React.ReactNode
}

export default function ClientLayout({ children }: Props) {
  return (
    <div className='flex flex-col h-screen '>
      {/* <Sidebar />
      {children} */}
      <div className='w-full h-[60px] bg-white'/>
      <div className='w-full h-[50px] bg-red-600'/>
      {/* <div className='w-full h-[6000px] bg-gray-800'/> */}

    </div>
  )
}
