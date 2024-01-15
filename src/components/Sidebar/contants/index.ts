import { CalendarIcon, FolderIcon, StatisticIcon } from 'src/icons'
import path from 'src/utils/path'

export const dataName = [
  {
    index: 1,
    name: 'Statistics',
    to: path.statistic,
    IconComponent: StatisticIcon
  },
  {
    index: 2,
    name: 'Server',
    to: path.server,
    IconComponent: FolderIcon
  },
  {
    index: 3,
    name: 'Clients',
    to: path.client,
    IconComponent: CalendarIcon
  },
  {
    index: 4,
    name: 'Registered users',
    to: path.registerUser,
    IconComponent: FolderIcon
  },
  {
    index: 5,
    name: 'Logs',
    to: path.log,
    IconComponent: CalendarIcon
  }
]
