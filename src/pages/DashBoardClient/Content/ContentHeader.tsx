import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { Key, useEffect, useState } from 'react'
import { useAppStore } from 'src/appStore'
import Button from 'src/components/Button'
import { ConnectionTime } from 'src/components/ConnectionTime/ConnectionTime'
import Input from 'src/components/Input/Input'
import Loading from 'src/components/Loading'
import BlockAndError from 'src/components/Modal/BlockAndError'
import Pagination from 'src/components/Pagination'
import PopoverDemo from 'src/components/Popover/Popover'
import { Table } from 'src/components/Table'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { BlockIcon, CloudIcon, ImageDelete } from 'src/icons'
import ClientApi from 'src/services/client.api'
import serversService from 'src/services/server'
import { Client } from 'src/types/user.type'
import { QRKEY } from 'src/utils/enums'
import path from 'src/utils/path'

import { STATUSCLIENT } from '../enum'
import PopoverSelect from './../PopoverSelect'

interface Props {
  nameKey: string
  status: boolean
}

type DataSource = Array<Client & { isLossLatencyLoading: boolean }>
export default function Content({ nameKey, status: statusProps }: Props) {
  const { currentServer, setCurrentServer, serverSetting, setServerSetting } = useAppStore()
  const [searchValue, setSearchValue] = useState('')
  const [ispaster, setIsPaster] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const [emailDisconnectStatus, setEmailDisconnectStatus] = useState<string | null>(null)
  const [emailBlock, setEmailBlock] = useState<string | null>(null)
  const [statuBlock, setStatusBlock] = useState<boolean>()
  const [visibleError, setVisibleError] = useState<string | null>(null)
  const visibleDisconnect = emailDisconnectStatus
  const StatusDisconnectMutation = useMutation({
    mutationFn: (email: string) => ClientApi.DisconnectStatus(email, currentServer?.ip as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATUSCLIENT.ACTIVE] })
      queryClient.invalidateQueries({ queryKey: [STATUSCLIENT.BLOCK] })
    },
    onError: () => {
      setVisibleError('open')
    }
  })
  const handleCancelDisconnectStatus = () => {
    setEmailDisconnectStatus(null)
  }
  const handleDisconnectStatus = () => {
    if (emailDisconnectStatus !== null) {
      StatusDisconnectMutation.mutate(emailDisconnectStatus)
    }
    setEmailDisconnectStatus(null)
  }

  const visibleBlockUser = emailBlock
  const BlockUserMutation = useMutation({
    mutationFn: (email: string) => ClientApi.BlockUser(email, currentServer?.ip as string, statuBlock as boolean),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATUSCLIENT.ACTIVE] })
      queryClient.invalidateQueries({ queryKey: [STATUSCLIENT.BLOCK] })
    },
    onError: () => {
      setVisibleError('open')
    }
  })
  const handleCancelBlockUser = () => {
    setEmailBlock(null)
  }
  const handleBlockUser = () => {
    if (emailBlock !== null) {
      BlockUserMutation.mutate(emailBlock)
    }
    setEmailBlock(null)
  }

  const handleCancelError = () => {
    setVisibleError(null)
  }
  const handleOKError = () => {
    setVisibleError(null)
  }

  const { data, isLoading: isClientsLoading } = useQuery({
    queryKey: [nameKey, { queryConfig, searchValue, currentServer }],
    queryFn: async () => {
      if (searchValue !== '' && ispaster === true) {
        return ClientApi.getListuser({
          server_id: currentServer?.id as number,
          active: statusProps,
          search_string: searchValue,
          search_relative: false,
          ...queryConfig,
          page: '1'
        })
      }
      if (searchValue !== '' && ispaster === false) {
        return ClientApi.getListuser({
          server_id: currentServer?.id as number,
          active: statusProps,
          search_string: searchValue,
          search_relative: true,
          ...queryConfig
        })
      } else {
        return ClientApi.getListuser({
          server_id: currentServer?.id as number,
          active: statusProps,
          search_string: searchValue,
          search_relative: false,
          ...queryConfig
        })
      }
    },
    keepPreviousData: true,
    refetchInterval: 10000
  })

  const listLossLatencyQueries = useQueries({
    queries: (data?.data || []).map((x) => ({
      queryKey: ['listLossLatency', currentServer, x.user_id],
      queryFn: async () => {
        return ClientApi.getLossLatency({
          server_id: currentServer?.id,
          user_id: x.user_id
        })
      },
      refetchInterval: 10000
    }))
  })

  useEffect(() => {
    setSelectedRowKeys([])
  }, [])
  const dataSource: DataSource = _.merge(
    [],
    [...(data?.data || [])].map((x) => ({ ...x, isLossLatencyLoading: true })),
    listLossLatencyQueries.map((x) => ({
      isLossLatencyLoading: x.isFetching,
      loss: x.data?.loss,
      latency: x.data?.latency
    }))
  )

  const pagination = data?.page
  const { data: listUserServer } = useQuery({
    queryKey: [QRKEY.SERVER, queryConfig],
    queryFn: () => {
      return serversService.get({ ...queryConfig, page: '1', limit: '99999' })
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const handleExport = () => {
    if (selectedRowKeys && selectedRowKeys.length >= 1) {
      ClientApi.getListExport({ client_id: selectedRowKeys.join(',') }).then((res) => {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(res.data)
        link.download = res.headers['content-disposition'].replace(/^attachment; filename=/, '')
        link.click()
        link.parentNode?.removeChild(link)
      })
    }
  }
  const handleSearch = (value: string) => {
    setSearchValue(value.trim())
    setIsPaster(false)
  }

  const handleSearchOnpaster = (value: string) => {
    setSearchValue(value.trim())
    setIsPaster(true)
  }

  if (!currentServer || isClientsLoading) return <Loading />
  return (
    <div className=''>
      <div className=' flex flex-wrap items-center justify-between gap-4'>
        <div className='col-span-12 sm:col-span-4'>
          <h1 className='text-sm font-normal text-[#246CF9] sm:text-base'>{selectedRowKeys.length} Clients selected</h1>
        </div>
        <div className='flex flex-wrap gap-[20px]'>
          {listUserServer?.data && (
            <PopoverSelect
              value={currentServer?.id}
              options={listUserServer?.data}
              onChange={(id) => {
                const dataFilter = listUserServer?.data.find((data) => data.id === id)
                if (dataFilter) {
                  setCurrentServer(dataFilter)
                  const n = {
                    ...serverSetting,
                    default_server_id: dataFilter.id
                  }
                  setServerSetting(n)
                }
              }}
            />
          )}
          <Input
            onPaster={handleSearchOnpaster}
            onSearch={handleSearch}
            classNameIcon='mr-[10px] h-5 w-5'
            classNameForm='flex items-center justify-around rounded-[10px] bg-[#1E1F25] p-3 text-[#757B8C]'
            className='grow border-none bg-transparent text-[#757B8C] outline-none'
          />
          <Button
            label='Export'
            onClick={handleExport}
            classNameIcon='mr-[10px] h-6 w-6'
            className='flex items-center justify-around rounded-[16px] bg-[#246CF9] px-[16px] py-[13px] text-[#FFFFFF]'
          />
        </div>
      </div>
      <div className='flex flex-col pb-4 '>
        <div className={`my-4 ${dataSource.length >= 1 ? `h-[calc(100vh-260px)] ` : `h-full`}  overflow-x-auto pb-4`}>
          <Table
            className='table-fixed'
            dataSource={dataSource}
            columns={[
              {
                title: 'Email',
                width: 280,
                render: ({ email }) => <div className='flex h-[63px] items-center truncate'>{email}</div>
              },
              {
                width: 300,
                title: 'Device ID',
                render: ({ device_id }) => <div className='truncate'>{device_id}</div>
              },
              {
                title: 'IP address',
                width: 190,
                render: ({ user_ip_wifi, user_ip_cellular }) => (
                  <>
                    <div className='flex truncate'>
                      <span className='block w-[60px] text-[#FFF]'>Wifi</span> {user_ip_wifi}
                    </div>
                    <div className='flex truncate'>
                      <span className='block w-[60px] text-[#FFF]'>Cellular</span> {user_ip_cellular}
                    </div>
                  </>
                )
              },
              {
                title: 'Connection time',
                width: 180,
                render: ({ user_ip_wifi, time_start_wifi, user_ip_cellular, time_start_cellular }) => {
                  return (
                    <>
                      <div className='min-h-[1rem]'>
                        <ConnectionTime time={user_ip_wifi ? time_start_wifi : undefined} />
                      </div>
                      <div className='min-h-[1rem]'>
                        <ConnectionTime time={user_ip_cellular ? time_start_cellular : undefined} />
                      </div>
                    </>
                  )
                }
              },
              {
                title: 'Server',
                width: 150,
                render: ({ server_name, icon_url }) => (
                  <div className='flex'>
                    {icon_url && <img className='mr-1 h-[20px] w-[28px]' src={icon_url} alt={server_name} />}
                    <div className='ml-3 truncate'>{server_name}</div>
                  </div>
                )
              },
              {
                width: 140,
                title: 'Server IP',
                render: ({ server_ip }) => <div className='truncate'>{server_ip}</div>
              },
              {
                title: 'Bandwidth usage',
                width: 190,
                render: ({ bandwidth }) => <div className='truncate'>{bandwidth ? `${bandwidth}ps` : ''}</div>
              },
              {
                title: 'Loss',
                width: 160,
                render: ({ loss }) => (
                  <>
                    <div className='truncate'>{loss}</div>
                  </>
                )
              },
              {
                title: 'Latency',
                width: 160,
                render: ({ latency }) => (
                  <>
                    <div className='truncate'>{latency} ms</div>
                  </>
                )
              },
              {
                title: 'Status',
                width: 100,
                render: ({ status }) => (
                  <>
                    {status ? (
                      <>
                        <button
                          style={{ background: 'rgba(48, 224, 161, 0.20)' }}
                          className=' min-w-[100px] rounded-[5px] bg-[#30E0A133] p-2 text-[12px] font-semibold text-[#30E0A1] md:min-w-[70px] xl:min-w-[70px]'
                        >
                          Connected
                        </button>
                      </>
                    ) : (
                      <>
                        <button className=' min-w-[100px] rounded-[5px] bg-[#FA225633] p-2 text-[12px] font-semibold text-[#FA2256] md:min-w-[70px] xl:min-w-[70px]'>
                          Disconnect
                        </button>
                      </>
                    )}
                  </>
                )
              },
              {
                align: 'center',
                width: 50,
                render: (record) => (
                  <PopoverDemo
                    renderPopover={
                      <>
                        {statusProps ? (
                          <>
                            <button
                              onClick={() => setEmailDisconnectStatus(record.email)}
                              className='z-10 flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
                            >
                              <CloudIcon />
                              <span className=' ml-4 text-[#FFF]'>Disconnect</span>
                            </button>

                            <button
                              onClick={() => {
                                setEmailBlock(record.email)
                                setStatusBlock(record.status)
                              }}
                              className='z-10 flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
                            >
                              <BlockIcon />
                              <span className='ml-4  text-[#FFF]'>Block</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEmailBlock(record.email)
                                setStatusBlock(false)
                              }}
                              className='z-10 flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
                            >
                              <BlockIcon />
                              <span className='ml-4  text-[#FFF]'>unBlock</span>
                            </button>
                          </>
                        )}
                      </>
                    }
                  />
                )
              }
            ]}
            rowSelection={{
              selectedRowKeys,
              onChange: (selectedRowKeys) => {
                setSelectedRowKeys(selectedRowKeys)
              }
            }}
          />
        </div>

        {pagination && pagination.total_count >= 1 && (
          <Pagination
            pageSizeOptions={[10, 20, 50, 100]}
            path={path.client}
            queryConfig={queryConfig}
            pageSize={pagination.total_page}
          />
        )}
        <BlockAndError
          name='Confirmation'
          title_one={`Are you sure want to ${statuBlock ? 'Block' : 'unBlock'} `}
          title_two='this user?'
          note='This action can not be undo'
          image={<ImageDelete />}
          visible={visibleBlockUser}
          ok={handleBlockUser}
          cancel={handleCancelBlockUser}
        />
        <BlockAndError
          name='Confirmation'
          title_one='Are you sure want to Disconnect'
          title_two='this user?'
          note='This action can not be undo'
          image={<ImageDelete />}
          visible={visibleDisconnect}
          ok={handleDisconnectStatus}
          cancel={handleCancelDisconnectStatus}
        />

        <BlockAndError
          name='Error'
          title_one='There was an error while'
          title_two='performing the action'
          note='Please try again later'
          image={<ImageDelete />}
          visible={visibleError}
          ok={handleOKError}
          cancel={handleCancelError}
        />
      </div>
    </div>
  )
}
