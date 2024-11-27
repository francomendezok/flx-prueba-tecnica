import { useState } from 'react'
import { Button, Modal, Form, Input, Row, Col, Select } from 'antd'
import PropTypes from 'prop-types'
import { updateUserFromDB } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

const { Option } = Select

const EditUserButton = ({ user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleCreate = (values) => {
    const age = Number(values.age)
    dispatch(updateUserFromDB({ userID: user.id, userData: values, age })) // paso correctamente los parametros // 
    setVisible(false)
  }

  return (
    <>
      <a onClick={showModal}>Editar</a>
      <Modal title="Editar Usuario" open={visible} onCancel={handleCancel} footer={null}>
        <Form
          layout="vertical"
          requiredMark="optional" 
          onFinish={handleCreate} 
          initialValues={{
            username: user.username,
            name: user.name,
            status: user.status,
            email: user.email,
            lastname: user.lastname,
            age: user.age
        }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Usuario"
                name="username"
                rules={[
                  { required: true, message: 'Por favor ingresa un nombre de usuario' },
                  { type: 'string', message: 'Debe ser un texto válido' }
                ]}
              >
                <Input placeholder={user.username}  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Por favor ingresa un correo' },
                  { type: 'email', message: 'Por favor ingresa un correo válido' }
                ]}
              >
                <Input placeholder={user.email} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[
                  { required: true, message: 'Por favor ingresa un nombre' },
                  { type: 'string', message: 'Debe ser un texto válido' }
                ]}
              >
                <Input placeholder={user.name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[
                  { required: true, message: 'Por favor ingresa un apellido' },
                  { type: 'string', message: 'Debe ser un texto válido' }
                ]}
              >
                <Input placeholder={user.lastname} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Estado"
                name="status"
                rules={[
                  { required: true, message: 'Por favor selecciona un estado' },
                  {
                    validator: (_, value) =>
                      ['activo', 'inactivo'].includes(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error('El estado debe ser activo o inactivo')),
                  }
                ]}
              >
                <Select placeholder={user.status}>
                  <Option value="activo">Activo</Option>
                  <Option value="inactivo">Inactivo</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Edad"
                name="age"
                rules={[
                  { required: true, message: 'Por favor ingresa una edad' },
                  { type: 'string', message: 'Debe ser un número'}
                ]}
              >
                <Input placeholder={user.age} type="number" />
              </Form.Item>
            </Col>
          </Row>
          <div className='submit-box'>
            <Button type="primary" htmlType="submit">
              Editar Usuario
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

EditUserButton.propTypes = {
  user: PropTypes.object.isRequired,
}

export default EditUserButton
