function Loading() {
  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className='fixed inset-0 z-[110] flex items-center justify-center bg-white bg-opacity-[0.07]'>
      <div className='loader'></div>
    </div>
  )
}

export default Loading
