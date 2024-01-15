import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import BlockAndError from 'src/components/Modal/BlockAndError'
import EditModal from 'src/components/Modal/Edit/EditModal'
import { EmailIcon, ImageError } from 'src/icons'
import authApi from 'src/services/auth.api'
import UserApi from 'src/services/user.api'
import { SchemaDetailRegister, schemaDetailRegister } from 'src/validates/rule'

export default function Content() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleError, setVisibleError] = useState<string | null>(null)
  const { id } = useParams()
  const { data: getUser } = useQuery({
    queryKey: ['user', id],
    queryFn: () => UserApi.getUser(id as string),
    enabled: id !== undefined,
    staleTime: 1000 * 10
  })
  const { register, setValue } = useForm<SchemaDetailRegister>({
    defaultValues: {
      email: '',
      ip_cellular: '',
      ip_Wifi: ''
    },
    resolver: yupResolver(schemaDetailRegister)
  })
  const dataEdit = getUser?.data.data
  useEffect(() => {
    if (dataEdit) {
      setValue('email', dataEdit.email)
      setValue('ip_cellular', dataEdit.ip_cellular)
      setValue('ip_Wifi', dataEdit.ip_wifi)
    }
  }, [dataEdit, setValue])
  const handleCancel = () => {
    setVisible(false)
  }

  const handleOK = () => {
    setVisible(false)
  }

  const forgotPasswordMutation = useMutation({
    mutationFn: (id: number) => authApi.resetPassword(id)
  })

  const handleForgotPassword = () => {
    if (dataEdit?.id) {
      if (dataEdit?.id) {
        setVisible(true)
      }
      forgotPasswordMutation.mutate(dataEdit?.id, {
        onSuccess: (data) => {
          if (data.data.code === '200') {
            setVisible(true)
          } else {
            setVisibleError('open')
          }
        },
        onError: (e) => {
          setVisibleError('open')
          console.log('', e)
        }
      })
    }
  }
  const handleCancelError = () => {
    setVisibleError(null)
  }
  const handleOKError = () => {
    setVisibleError(null)
  }

  return (
    <div className='pb-6'>
      <div className='flex h-screen justify-center md:h-full'>
        <div className=' w-full rounded-[20px] bg-[#1E1F25] px-[10%] text-[#FFF] sm:h-full lg:px-[20%] '>
          <h1 className='mt-9'>Edit user information</h1>
          <div className='mt-[28px] h-[3px] bg-[#31343C] md:mt-[35px]'></div>
          <span className='ml-8 mt-[20px] block text-[#A4A8AB] md:mt-[32px]'>User information</span>
          <div className='mt-5 md:mt-[30px]'>
            <div className='relative flex items-center rounded-[20px] bg-[#282B32]'>
              <span className='absolute left-[20px] mx-auto w-[14px] text-2xl md:top-[20px] md:h-[24px] md:w-[24px]'>
                <EmailIcon />
              </span>
              <div className='absolute left-12 h-[13px] w-[1px] bg-[#C3CDDB] md:left-[56px]'> </div>
              <input
                className={classNames(
                  ' h-[50px] w-full rounded-[20px] border-2 bg-[#282B32] pl-[60px] pr-4 text-[12px] text-white placeholder-gray-500 outline-none md:h-[64px] md:pl-[72px]  md:text-[16px]',
                  {
                    'border-[#EB445A]': false,
                    'border-none': true
                  }
                )}
                disabled
                type='email'
                placeholder='Email Address'
                {...register('email')}
              />
            </div>
          </div>
          <div className='mt-3 md:mt-[30px]'>
            <div className='relative flex items-center rounded-[20px] bg-[#282B32]'>
              <span className='absolute left-[20px] mx-auto w-[14px] text-2xl md:top-[20px] md:h-[24px] md:w-[24px]'>
                <EmailIcon />
              </span>
              <div className='absolute left-12 h-[13px] w-[1px] bg-[#C3CDDB] md:left-[56px]'> </div>
              <input
                className={classNames(
                  ' h-[50px] w-full rounded-[20px] border-2 bg-[#282B32] pl-[60px] pr-4 text-[12px] text-white placeholder-gray-500 outline-none md:h-[64px] md:pl-[72px]  md:text-[16px]',
                  {
                    'border-[#EB445A]': false,
                    'border-none': true
                  }
                )}
                disabled
                type='text'
                placeholder='IP Address'
                {...register('ip_cellular')}
              />
            </div>
          </div>
          <div className='mt-3 md:mt-[30px]'>
            <div className='relative flex items-center rounded-[20px] bg-[#282B32]'>
              <span className='absolute left-[20px] mx-auto w-[14px] text-2xl md:top-[20px] md:h-[24px] md:w-[24px]'>
                <EmailIcon />
              </span>
              <div className='absolute left-12 h-[13px] w-[1px] bg-[#C3CDDB] md:left-[56px]'> </div>
              <input
                className={classNames(
                  ' h-[50px] w-full rounded-[20px] border-2 bg-[#282B32] pl-[60px] pr-4 text-[12px] text-white placeholder-gray-500 outline-none md:h-[64px] md:pl-[72px]  md:text-[16px]',
                  {
                    'border-[#EB445A]': false,
                    'border-none': true
                  }
                )}
                disabled
                type='text'
                placeholder='IP Address'
                {...register('ip_Wifi')}
              />
            </div>
          </div>
          <button
            onClick={handleForgotPassword}
            className='ml-auto mt-5 block text-[12px] font-bold text-[#246CF9] md:mt-[32px] md:text-[16px]'
          >
            Reset password
          </button>
          <div className='mt-[16px] h-[3px] bg-[#31343C]'></div>
          <div className='mt-[20px] grid grid-cols-12 gap-4 md:mt-[26px] '>
            <div className='col-span-12 lg:col-span-6'>
              <p className='text-[12px] font-normal text-[#A4A8AB] md:text-[16px] '>Account Created at :</p>
              <div className='mt-1 text-[12px] font-normal text-[#FFF] md:text-[16px]'>{dataEdit?.created_at}</div>
            </div>
            <div className='col-span-12 mb-4 grid grid-cols-12 lg:col-span-6'>
              <button
                onClick={() => navigate(-1)}
                className='col-span-6 rounded-3xl   bg-[#16171C] px-2 py-3 text-[12px] md:p-4 md:text-[14px]'
              >
                Cancel
              </button>
              <button
                disabled
                className='col-span-6  ml-5 rounded-3xl bg-[#246CF9] px-2 py-3 text-[12px] md:p-4 md:text-[14px] lg:p-0'
                onClick={() => setVisible(true)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        <BlockAndError
          name='Error'
          title_one='There was an error while'
          title_two='performing the action'
          note='Please try again later'
          image={<ImageError />}
          visible={visibleError}
          ok={handleOKError}
          cancel={handleCancelError}
        />
        <EditModal visible={visible} ok={handleOK} cancel={handleCancel} />
      </div>
    </div>
  )
}
