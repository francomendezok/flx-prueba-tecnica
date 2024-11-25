import { Breadcrumb } from 'antd'

const Label= () => (
  <Breadcrumb
  className='label-location'
  items={[
    { title: 'Usuarios', key: 'Usuarios' },
    { title: 'Listado de usuarios', key: 'Listado de usuarios' },
  ]}
/>
)

export default Label