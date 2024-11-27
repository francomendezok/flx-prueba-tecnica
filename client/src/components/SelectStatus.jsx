import { Select } from 'antd'
import { useDispatch } from 'react-redux'
import { setFilterStatus, setUsers } from '../redux/userSlice'

function SelectStatus() {
  const dispatch = useDispatch()

  const handleChange = (value) => {   
    if (value === "todos") {
      dispatch(setUsers())
      return
    }   
    dispatch(setFilterStatus(value))
  }

  return (
    <Select
      onChange={handleChange}
      className="select-user"
      placeholder="Filtrar por estado"
      options={[
        { value: 'todos', label: 'Todos' }, 
        { value: 'activo', label: 'Activo' },
        { value: 'inactivo', label: 'Inactivo' }
      ]}
    />
  )
}

export default SelectStatus
