import { useState } from 'react'
import { Button, Modal, Form, Input, Row, Col, Select } from 'antd'
const { Option } = Select
import { useDispatch } from 'react-redux'
import { createNewUser } from '../redux/userSlice'

const AddUserButton = () => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm() // para limpiar el form // 
  const dispatch = useDispatch()

  const showModal = () => {
    setVisible(true)
    form.resetFields()
  }

  const handleCancel = () => {
    setVisible(false)
  }


  const handleCreate = async (values) => {
    try {
      const age = Number(values.age)
      
      dispatch(createNewUser({...values, age}))

      setVisible(false)
    } catch (error) {
      console.log(`Hubo un error al crear el usuario ${error}`)
    }
  }

  return (
    <>
      <Button type="primary" size="medium" onClick={showModal}>
        Agregar usuario
      </Button>

      <Modal title="Crear Usuario" open={visible} onCancel={handleCancel} footer={null}>    
        <Form layout="vertical" requiredMark="optional" onFinish={handleCreate} form={form}>
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
                <Input placeholder="johndoe" />
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
                <Input placeholder="johndoe@domain.com" />
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
                <Input placeholder="John" />
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
                <Input placeholder="Doe" />
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
                <Select placeholder="Seleccione un estado">
                  <Option value="activo">activo</Option>
                  <Option value="inactivo">inactivo</Option>
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
                <Input placeholder="43" type="number" min={1} />
              </Form.Item>
            </Col>
          </Row>

          {/* boton de submit del form */}
          <div className='submit-box'>
            <Button type="primary" htmlType="submit">
              Agregar Usuario
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default AddUserButton
