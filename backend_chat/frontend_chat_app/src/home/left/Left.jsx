import Search from '../../components/shared/Search'
import Users from '../../components/shared/Users'

const Left = () => {
  return (
    <div className='w-[30%]  border-white bg-black text-white'>
      <h1 className='font-bold text-3xl p-2 px-11'>Chats</h1>
    <Search></Search>
    <Users></Users>
    </div>
  )
}

export default Left