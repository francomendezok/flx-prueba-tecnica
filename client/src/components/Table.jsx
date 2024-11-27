import { useEffect } from 'react'
import { Table, Tag, Space, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/userSlice'
import DeleteUserButton from './DeleteUser'
import EditUserButton from './EditUser'
import useLoading from './UseLoading'


const Tabla = () => {
  const dispatch = useDispatch()
  const { loading } = useLoading() // custom hook para manejo de loading // 
  const { users, error } = useSelector((state) => state.users) // estado a traves de redux // 

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  const columns = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a>{text}</a>,
      width: 300,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: 300,
    },
    {
      title: 'Estado',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <Tag color={status === 'activo' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EditUserButton user={record} />
          <DeleteUserButton user={record} /> {/* en reemplazo del tag <a> para Eliminar */}
        </Space>
      ),
    }
  ]

  if (loading) {
    return (
      <div className='loading-users'>
        <h1>Cargando usuarios...</h1>
        <Spin size='large'/>
      </div>
    )
  }

  if (error) {
    return <h1>Error al cargar usuarios</h1>
  }

  return <Table columns={columns} dataSource={users} rowKey="id" className="table" size="large" />
}

export default Tabla
