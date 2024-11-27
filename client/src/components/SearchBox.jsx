import { Input } from 'antd'
const { Search } = Input
import { useDispatch } from 'react-redux'
import { setFilterName } from '../redux/userSlice'

function SearchBox () {
    const dispatch = useDispatch()

    const handleEnter= (e) => {   
        console.log(e.target.value)
        dispatch(setFilterName(e.target.value))
    }
    const handleSearch= (value) => {   
        console.log(value)
        dispatch(setFilterName(value))
    }

    return <Search placeholder="Buscar usuario" className='search-button' onSearch={handleSearch} onPressEnter={handleEnter}/>
}
    


export default SearchBox