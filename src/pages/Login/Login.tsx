import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from 'src/appStore'
import Loading from 'src/components/Loading'
import path from 'src/utils/path'

import { ArrowRightIcon, GmailIcon, PasswordIcon } from '../../icons'
import authApi from '../../services/auth.api'
import { Schema, schema } from '../../validates/rule'

type FormData = Pick<Schema, 'email' | 'matkhau'>
const loginSchema = schema.pick(['email', 'matkhau'])

export default function Login() {
  const { setIsAuthenticated } = useAppStore()
  const navigate = useNavigate()
  const [errMess, setErrMess] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      matkhau: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    setErrMess('')
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        if (data.data.result === true) {
          setErrMess('')
          // setProfile(data.data.data)
          // setProfileToLS(data.data.data)
          navigate(path.home)
          setIsAuthenticated(true)
        } else {
          setErrMess('The username or password is incorrect')
        }
      },
      onError: () => {
        setErrMess('Internal Server Error')
      }
    })
  })
  useEffect(() => {
    setErrMess('')
  }, [errors.email?.message, errors.matkhau?.message])

  return (
    <main className='flex min-h-screen w-full flex-col items-center justify-center bg-[#141518] sm:py-[10px] md:py-10 lg:py-6 xl:py-2'>
      {loginAccountMutation.isLoading && <Loading />}
      <div
        className=' mx-auto h-auto w-full rounded-[38px] bg-gray-900 bg-no-repeat p-4  sm:h-full sm:w-[480px] sm:p-[20px] md:w-[640px] lg:w-[768px] xl:h-[700px] xl:w-[1063px] '
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <form
          className='h-full w-full rounded-[38px] bg-[#12181F] px-4 py-[100px] text-[#C3CDDB] sm:w-[446px] sm:px-[74px] '
          onSubmit={onSubmit}
          noValidate
        >
          <h1 className='text-[30px] font-bold leading-[45px] text-white'>Log in</h1>
          <span className='block text-[16px] font-normal leading-[24px] text-[#C3CDDB]'>Log in to your app</span>
          <div className='mb-[40px] mt-2 h-2 text-[12px] font-[200] leading-[15px] text-[#EB445A]'>
            {!(errors.email?.message === '') && !(errors.matkhau?.message === '') ? errMess : ''}
          </div>
          <div className='mb-[20px]'>
            <div className='relative flex items-center rounded-[20px] bg-gray-800'>
              <span className='absolute left-[20px] top-[20px] mx-auto text-2xl'>
                <GmailIcon />
              </span>
              <div className='absolute left-[56px] h-[13px] w-[1px] bg-gray-300'></div>
              <input
                className={classNames(
                  ' disabled:autofill: h-[64px] w-full rounded-[20px] border-2 bg-gray-800 pl-[72px] pr-4 text-white placeholder-gray-500  outline-none',
                  {
                    'border-[#EB445A]': !errors.email?.message === false,
                    'border-none': !errors.email?.message === true
                  }
                )}
                type='email'
                placeholder='Email Address'
                autoComplete='off'
                {...register('email')}
              />
            </div>
            <div className='mt-2 text-[12px] font-[200] leading-[15px] text-[#EB445A] '>
              {!errMess && errors.email?.message}
            </div>
          </div>
          <div className='mb-[20px]'>
            <div className='relative flex items-center rounded-[20px] bg-gray-800'>
              <span className='absolute left-[20px] top-[20px] mx-auto text-2xl'>
                <PasswordIcon />
              </span>
              <div className='absolute left-[56px] h-[13px] w-[1px] bg-gray-300'></div>
              <input
                className={classNames(
                  ' h-[64px] w-full rounded-[20px] border-2 bg-gray-800 pl-[72px] pr-4 text-white placeholder-gray-500  outline-none',
                  {
                    'border-[#EB445A]': !errors.matkhau?.message === false,
                    'border-none': !errors.matkhau?.message === true
                  }
                )}
                type='password'
                placeholder='Password'
                autoComplete='off'
                {...register('matkhau')}
              />
            </div>
            <div className='mt-2 text-[12px]  font-[200] leading-[15px] text-[#EB445A]'>
              {!errMess && errors.matkhau?.message}
            </div>
          </div>
          <button
            className='relative h-[60px] w-full rounded-[25px] bg-[#246CF9] px-[17px] text-[14px] font-[400]'
            type='submit'
            disabled={loginAccountMutation.isLoading}
          >
            Continue
            <span className='absolute right-[18px] top-[12px] flex h-[36px] w-[36px] items-center justify-center rounded-[12px] bg-[#FFFFFF33]'>
              <ArrowRightIcon />
            </span>
          </button>
        </form>
      </div>
    </main>
  )
}
