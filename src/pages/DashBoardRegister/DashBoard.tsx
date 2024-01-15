import { useState } from 'react'
import PageContainer from 'src/layout/PageContainer'

import Content from './Content'
import HeaderRegisterDashboard from './HeaderRegiterDashboard'
import { STATUSKEYREGISTER } from './enum'

export default function DashBoard() {
  const [receivedData, setReceivedData] = useState<string>('Active')
  const handleDataFromChild = (data: string) => {
    setReceivedData(data)
  }
  return (
    <PageContainer
      header={{
        title: <HeaderRegisterDashboard receivedData={receivedData} sendDataToParent={handleDataFromChild} />
      }}
    >
      {receivedData === 'Active' && <Content nameKey={STATUSKEYREGISTER.Active} status={true} />}
      {receivedData === 'Suspend' && <Content nameKey={STATUSKEYREGISTER.Suspend} status={false} />}
    </PageContainer>
  )
}
