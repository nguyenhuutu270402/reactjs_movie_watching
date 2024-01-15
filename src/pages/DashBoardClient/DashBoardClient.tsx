import { useState } from 'react'
import PageContainer from 'src/layout/PageContainer'

import Content from '../DashBoardClient/Content'
import HeaderClientDashBoard from './HeaderClientDashBoard'
import { STATUSCLIENT } from './enum'

export default function DashBoardClient() {
  const [receivedData, setReceivedData] = useState<string>('Active')
  const handleDataFromChild = (data: string) => {
    setReceivedData(data)
  }
  return (
    <PageContainer
      header={{
        title: <HeaderClientDashBoard receivedData={receivedData} sendDataToParent={handleDataFromChild} />
      }}
    >
      {receivedData === 'Active' && <Content nameKey={STATUSCLIENT.ACTIVE} status={true} />}
      {receivedData === 'Block' && <Content nameKey={STATUSCLIENT.BLOCK} status={false} />}
    </PageContainer>
  )
}
