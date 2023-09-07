import { useState, useEffect } from 'react'
import { useAuthContext } from '@/hooks/useAuthContext'
import { getSingleUserService } from '@/services/userServices'

const Dashboard = () => {
  const { userPayload } = useAuthContext()
  const [userData, setUserData] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showUploadedData, setShowUploadedData] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSingleUserService(userPayload.id)
        if (response.status === 200) {
          setUserData(response.data)
        }
      } catch (error) {
        console.error('An error occurred in Dashboard', error.message)
      }
    }
    fetchUserData()
  }, [userPayload.id])

  const handleFileUpload = (event) => {
    const files = event.target.files
    const uploadedFilesArray = Array.from(files)
    setUploadedFiles(uploadedFilesArray)
  }

  const handleUpload = () => {
    if (window.confirm('¿Estás seguro de que deseas subir los archivos?')) {
      // Lógica para subir los archivos al servidor
      console.log('Archivos subidos:', uploadedFiles)
      setShowUploadedData(true)
      alert('¡Waaaaa! Tu archivo fue subido')
    }
  }

  const handleEditar = () => {
    if (window.confirm('¿Estás seguro de que deseas editar?')) {
      // Lógica para editar lo que haya sido subido
      console.log('Editar función')
    }
  }

  const handleBorrar = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar?')) {
      // Lógica para borrar lo que haya sido subido
      console.log('Borrar función')
    }
  }

  const handleVaciar = () => {
    if (window.confirm('¿Estás seguro de que deseas vaciar?')) {
      // Lógica para reestablecer todo
      console.log('Vaciar función')
    }
  }

  const handleSaberMas = () => {
    if (window.confirm('¿Estás seguro de que deseas saber más?')) {
      // Lógica para mostrar información sobre la página
      console.log('Saber más función')
    }
  }

  return (
    <div className='container mt-5' style={{ display: 'grid', justifyContent: 'center' }}>
      <h1 className='mb-4' style={{ display: 'grid', justifyContent: 'center', fontSize: '30px', color: 'navy' }}>
        ¡Bienvenido al Dashboard!
      </h1>
      <h2 className='mb-4' style={{ display: 'grid', justifyContent: 'center', fontSize: '20px', color: 'gray' }}>
        Espero que tengas un grandioso día
      </h2>
      <p
        className='mb-4'
        style={{
          display: 'grid',
          justifyContent: 'center',
          fontSize: '18px',
          color: 'darkgreen',
          maxWidth: '500px',
          textAlign: 'center'
        }}
      >
        En este momento tienes acceso completo al Dashboard. ¡Explora tus opciones y sorpréndete!
      </p>
      <h3 className='mb-4' style={{ display: 'grid', justifyContent: 'center', fontSize: '24px', color: 'navy' }}>
        Elige una de las siguientes opciones:
      </h3>
      <div style={{ display: 'grid', justifyContent: 'center' }}>
        <button onClick={handleEditar} style={{ margin: '10px', cursor: 'pointer', fontFamily: 'cursive', background: 'aliceBlue', borderRadius: '100px', padding: '10px 20px' }}>
          Editar
        </button>
        <label htmlFor='file-upload' style={{ margin: '10px', cursor: 'pointer', fontFamily: 'cursive', background: 'aliceBlue', borderRadius: '100px', padding: '10px 20px' }}>
          Agregar
        </label>
        <input id='file-upload' type='file' multiple onChange={handleFileUpload} style={{ display: 'none' }} />
        <button onClick={handleBorrar} style={{ margin: '10px', cursor: 'pointer', fontFamily: 'cursive', background: 'aliceBlue', borderRadius: '100px', padding: '10px 20px' }}>
          Borrar
        </button>
        <button onClick={handleVaciar} style={{ margin: '10px', cursor: 'pointer', fontFamily: 'cursive', background: 'aliceBlue', borderRadius: '100px', padding: '10px 20px' }}>
          Vaciar
        </button>
        <button onClick={handleSaberMas} style={{ margin: '10px', cursor: 'pointer', fontFamily: 'cursive', background: 'aliceBlue', borderRadius: '100px', padding: '10px 20px' }}>
          Saber más
        </button>
      </div>
      {showUploadedData && (
        <div className='row'>
          <div className='col-md-6'>
            {userData?.first_name && <h4>{userData.first_name}</h4>}
            {userData?.last_name && <h4>{userData.last_name}</h4>}
            {userData?.gender && <h4>{userData.gender}</h4>}
            {userData?.email && <h4>{userData.email}</h4>}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
