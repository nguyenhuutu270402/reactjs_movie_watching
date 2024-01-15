import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().required('Please fill in your email address').email('Wrong email format'),
  matkhau: yup.string().required('Please fill in your password'),
  ipAddress: yup.string().required('please fill in your ipAddress')
})

export const schemaDetailRegister = yup.object({
  email: yup.string().required('Please fill in your email address').email('Wrong email format'),
  ip_cellular: yup.string().required('please fill in your ip_cellular'),
  ip_Wifi: yup.string().required('please fill in your ip_Wifi')
})

export type Schema = yup.InferType<typeof schema>
export type SchemaDetailRegister = yup.InferType<typeof schemaDetailRegister>
