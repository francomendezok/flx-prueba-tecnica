import { useState } from 'react'
import { Modal } from 'antd'
import axios from 'axios'
import PropTypes from 'prop-types'

const PopModal = ({ user, onDelete }) => {
    const fullname = `${user.name}${user.lastname}`.toLowerCase()
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState(`¿Está seguro que quiere eliminar el usuario @${fullname}?`)

    const showModal = () => {
        setOpen(true)
    };

    const handleOk = () => {
        setModalText('Eliminando usuario...')
        setConfirmLoading(true)
        axios.delete(`http://localhost:4000/users/${user.id}`)
        .then(() => {
            setConfirmLoading(false)
            setOpen(false)
            onDelete(user.id)
        })
        .catch((error) => {
            setConfirmLoading(false)
            setModalText('Error eliminando usuario')
            console.error('Error eliminando usuario:', error)
        });
    };

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

PopModal.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

export default PopModal