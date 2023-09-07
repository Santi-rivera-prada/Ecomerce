import useForm from '@/hooks/useForm'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { loginUserService } from '@/services/userServices'
import '@/styles/form.css'

const Login = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()

  const datos = {
    email: '',
    password: ''
  }

  const sendData = async (data) => {
    try {
      const response = await loginUserService(data)
      if (response.status === 200) {
        login(response.data.token)
        navigate('/dashboard')
      } else {
        alert('Usuario incorrecto o no existe. Por favor, inténtelo de nuevo.')
      }
    } catch (error) {
      console.error('Ocurrió un error en Login', error.message)
      alert('Ocurrió un error. Por favor, inténtelo de nuevo.')
    }
  }

  const { input, handleInputChange, handleSubmit } = useForm(sendData, datos)

  return (
    <main className='form-signin w-100 m-auto'>
      <form onSubmit={handleSubmit}>
        <img
          className='mb-4'
          src='https://i.pinimg.com/564x/00/f0/67/00f067b4169d3903e30af3051b8087af.jpg'
          alt=''
          width={150}
          height={150}
        />
        <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
        <div className='form-floating'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            name='email'
            value={input.email}
            onChange={handleInputChange}
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            name='password'
            value={input.password}
            onChange={handleInputChange}
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>
        <button className='btn btn-primary w-100 py-2' type='submit'>
          Sign in
        </button>
        <p className='mt-5 mb-3 text-body-secondary'>© 2017–2023</p>
      </form>
    </main>
  )
}

export default Login
