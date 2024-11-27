import { useState, useEffect } from "react"

// custom hook para simular carga de pagina al renderizar por primera vez el contenido // 
const useLoading = () => {
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false)
        }, 2500)
    
        return () => clearTimeout(timer)
      }, [loading])

      return { loading }
}

export default useLoading