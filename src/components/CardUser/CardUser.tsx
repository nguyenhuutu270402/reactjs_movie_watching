import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import EyeIcon from 'src/icons/EyeIcon'
import GithubIcon from 'src/icons/GithubICon'
import ProfileRemove from 'src/icons/ProfileRemove'
import UserEditIcon from 'src/icons/UserEditIcon'
import UserRemoveIcon from 'src/icons/UserRemoveIcon'
import { STATUSKEYREGISTER } from 'src/pages/DashBoardRegister/enum'
import UserApi from 'src/services/user.api'
import { user } from 'src/types/user.type'
import path from 'src/utils/path'

import DeleteModal from '../Modal/Delete'
import SuspendModal from '../Modal/Suspend'
import PopoverDemo from '../Popover/Popover'

interface Props {
  user: user
}
export default function CardUser({ user }: Props) {
  const queryClient = useQueryClient()
  const [idSuspend, setIdSuspend] = useState<number | undefined>()
  const [idDelete, setIdDelete] = useState<number | undefined>()
  const [statusSuspend, setStatusSuspend] = useState<boolean>(false)
  const visibleDelete = idDelete
  const visibleSuspend = idSuspend
  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => UserApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATUSKEYREGISTER.Active] })
      queryClient.invalidateQueries({ queryKey: [STATUSKEYREGISTER.Suspend] })
    },
    onError: (e) => {
      console.log(e)
    }
  })
  const handleSuspend = () => {
    setIdSuspend(user.id), setStatusSuspend(user.status)
  }
  const updateUserStatusMutation = useMutation({
    mutationFn: (id: number) => UserApi.updateStatus(id, !statusSuspend),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STATUSKEYREGISTER.Active] })
      queryClient.invalidateQueries({ queryKey: [STATUSKEYREGISTER.Suspend] })
    },
    onError: (e) => {
      console.log(e)
    }
  })
  const handleCancelDelete = () => {
    setIdDelete(undefined)
  }
  const handleOKDelete = () => {
    if (idDelete) {
      deleteUserMutation.mutate(idDelete)
    }
    setIdDelete(undefined)
  }

  const handleCancelSuspend = () => {
    setIdSuspend(undefined)
  }

  const handleOKSuspend = () => {
    if (idSuspend) {
      updateUserStatusMutation.mutate(idSuspend)
    }
    setIdSuspend(undefined)
  }
  return (
    <div className='rounded-[20px] border-[1px] border-solid border-[transparent] bg-[#1D1F25] p-4 hover:border-[#246CF9]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center text-[#FFF]'>
          <GithubIcon />
          <span className='ml-2 block max-w-[140px] truncate text-[14px]'>{user.email}</span>
        </div>
        <PopoverDemo
          renderPopover={
            <>
              <Link
                to={`${path.registerUser_edit}/${user.id}`}
                className='z-10 flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
              >
                <EyeIcon />
                <span className='ml-4  text-[#FFF]'>Details</span>
              </Link>
              <Link
                to={`${path.registerUser_edit}/${user.id}`}
                className='flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
              >
                <UserEditIcon />
                <span className='ml-4  text-[#FFF]'>Edit</span>
              </Link>
              <button
                onClick={() => setIdDelete(user.id)}
                className='flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
              >
                <ProfileRemove />
                <span className='ml-4  text-[#FFF]'>Delete</span>
              </button>
              <button
                onClick={handleSuspend}
                className='z-10 flex w-full items-center  rounded-[10px] p-[10px] text-[#FFF] hover:bg-[#246CF9]'
              >
                <UserRemoveIcon />
                <span className=' ml-4  text-[#FFF]'> {user.status ? 'Suspend' : 'Active'}</span>
              </button>
            </>
          }
        />
      </div>
      <div className='mt-3 flex justify-between gap-2 text-[12px] text-[#757B8C]'>
        <div className='flex flex-col '>
          <span>IP Address</span>
          <div className='mt-[6px] flex justify-between text-[#FFFFFF]'>
            {/* <div className='mr-2'>Wifi</div> */}
            <div className=' text-[#FFF]'>{user.ip_wifi}</div>
          </div>
          <div className='mt-[6px] flex justify-between text-[#FFFFFF]'>
            {/* <div className='mr-2'>Cellular</div> */}
            <div className='text-[#FFF]'>{user.ip_cellular}</div>
          </div>
        </div>
        <div className='flex flex-col'>
          <span>Status</span>
          {user.status === false && (
            <button className='mt-3 min-w-[80px] rounded-[5px] bg-[#FA225633] p-2 text-[12px] font-semibold text-[#FA2256] md:min-w-[70px] '>
              Suspended
            </button>
          )}
          {user.status === true && (
            <button className='mt-3 min-w-[80px] rounded-[5px] bg-[#30E0A133] p-2 text-[12px] font-semibold text-[#30E0A1] md:min-w-[70px] '>
              Active
            </button>
          )}
        </div>
      </div>
      <DeleteModal visible={visibleDelete} ok={handleOKDelete} cancel={handleCancelDelete} />
      <SuspendModal visible={visibleSuspend} ok={handleOKSuspend} cancel={handleCancelSuspend} />
    </div>
  )
}
