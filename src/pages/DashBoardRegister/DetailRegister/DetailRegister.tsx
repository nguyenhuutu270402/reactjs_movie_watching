import PageContainer from 'src/layout/PageContainer'

import Content from './Content'

export default function DetailRegister() {
  return (
    <>
      <PageContainer
        header={{
          title: 'Registered user'
        }}
      >
        <Content />
      </PageContainer>
    </>
  )
}
