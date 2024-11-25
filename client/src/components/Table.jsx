import { useEffect } from 'react'
import { Table, Tag, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../redux/slices/userSlice'
import PopModal from './Modal'
import axios from 'axios'

const Tabla = () => {
  const dispatch = useDispatch()

  const { users, loading, error } = useSelector((state) => state.users) // estado a traves de redux // 

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  async function handleDelete (userId) {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`)
      console.log("Delete successfully")
      
    } catch (error) {
      console.log(error)
    }
  }

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
          <a>Editar</a>
          <PopModal user={record} onDelete={handleDelete} /> {/* Reemplaza al tag <a> para Eliminar */}
        </Space>
      ),
    },
  ];

  if (loading) {
    return <p>Cargando usuarios...</p>
  }

  if (error) {
    return <p>Error al cargar usuarios: {error}</p>
  }

  return <Table columns={columns} dataSource={users} rowKey="id" className="table" size="large" />
}

export default Tabla
