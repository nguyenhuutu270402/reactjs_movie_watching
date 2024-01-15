import { ReactNode } from 'react'

import PageHeader, { PageHeaderProps } from './PageHeader'

export type PageContainerProps = {
  children: ReactNode
  header: PageHeaderProps
}
const PageContainer = ({ children, header }: PageContainerProps) => {
  return (
    <div className='relative mx-auto w-full  overflow-auto'>
      <PageHeader {...header} />
      <div className='mt-[80px] px-4 pb-4 sm:px-6 sm:pb-6 md:h-[calc(100%-80px)]'>{children}</div>
    </div>
  )
}

export default PageContainer
