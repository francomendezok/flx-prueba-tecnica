import { useState } from "react"
import { Spin } from 'antd'

// custom hook para simular carga de pagina al renderizar por primera vez el contenido // 
const useLoading = () => {

    return (
        <Spin size="large"/>
    )
}

export default useLoading