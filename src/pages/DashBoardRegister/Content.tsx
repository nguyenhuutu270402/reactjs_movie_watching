import ContentHeader from './Content/ContentHeader'

interface Props {
  nameKey: string
  status: boolean
}
export default function Content({ nameKey, status }: Props) {
  return <ContentHeader nameKey={nameKey} status={status} />
}
