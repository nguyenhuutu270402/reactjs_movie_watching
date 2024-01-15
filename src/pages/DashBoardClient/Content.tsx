import { useResponsive } from '../../hooks'
import ContentHeader from './Content/ContentHeader'
import ContentHeaderMobile from './Content/ContentHeaderMobile'

interface Props {
  nameKey: string
  status: boolean
}
export default function Content({ nameKey, status }: Props) {
  const { sm } = useResponsive()
  return (
    <>
      {sm ? (
        <ContentHeader nameKey={nameKey} status={status} />
      ) : (
        <ContentHeaderMobile nameKey={nameKey} status={status} />
      )}
    </>
  )
}
