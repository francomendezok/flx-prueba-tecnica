import { useState } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteUserFromDB } from '../redux/userSlice'


const DeleteUserButton = ({ user }) => {
    const fullname = `${user.name}${user.lastname}`.toLowerCase()
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false) // efecto visual del boton OK //
    const [modalText, setModalText] = useState(`¿Está seguro que quiere eliminar el usuario @${fullname}?`)
    const dispatch = useDispatch()

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = async () => {
        setModalText('Eliminando usuario...')
        setConfirmLoading(true)
        await dispatch(deleteUserFromDB(user.id))
        .then(() => {
            setConfirmLoading(false)
            setOpen(false) // cierro el form //
        })
        .catch((error) => {
            setConfirmLoading(false)
            setModalText('Error eliminando usuario')
            console.error('Error eliminando usuario:', error)
        })
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <>
        <a onClick={showModal}>Eliminar</a>
        
        <Modal
            title="Eliminar Usario"
            cancelText="Cancelar"
            okText="Eliminar"
            okButtonProps={{danger: true}}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <p>{modalText}</p>
        </Modal>
        </>
    )
}

DeleteUserButton.propTypes = {
    user: PropTypes.object.isRequired
}

export default DeleteUserButton