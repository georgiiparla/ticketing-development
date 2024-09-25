import { Input } from '@nextui-org/input'
import { Chip } from '@nextui-org/chip'
import { EyeFilledIcon } from '@/config/icons'
import { EyeSlashFilledIcon } from '@/config/icons'
import { Button } from '@nextui-org/button'
import { useState, useEffect } from 'react'
import { FormEvent } from 'react'
import { CheckIcon } from '@/config/icons'
import { useRouter } from 'next/navigation'
import axios, { AxiosResponse, AxiosError } from 'axios'

interface UserAttrs {
  email: string
  password: string
}

type SerializedErrors = {
  message: string
  [key: string]: any
}[]

interface SerializedErrorsObject {
  errors: SerializedErrors
}

interface LoggedUserAttrs {
  email: string
  id: string
}

export default function CustomLoginForm() {
  // console.log(currentUser)
  const router = useRouter()

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<SerializedErrors>([])
  const [isSignedUp, setSignUpStatus] = useState(false)

  useEffect(() => {
    if (isSignedUp) {
      const timer = setTimeout(() => {
        router.push('/') // Replace with the actual route
      }, 2000)

      return () => clearTimeout(timer) // Clean up the timer on unmount
    }
  }, [isSignedUp, router]) // Add router to the dependency array

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post<
        LoggedUserAttrs,
        AxiosResponse<LoggedUserAttrs>,
        UserAttrs
      >('/api/users/signup', {
        email,
        password,
      })

      console.log(response.data)
      setErrors([])
      setSignUpStatus(true)
    } catch (error) {
      const axiosError = error as AxiosError<SerializedErrorsObject>
      if (axiosError.response) {
        setErrors(axiosError.response.data.errors)
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request)
      } else {
        console.error('Error:', axiosError.message)
      }
    }
  }

  const hasInvalidEmail = () => {
    if (errors) {
      for (const error of errors) {
        if (error.field === 'email') {
          return true
        }
      }
    }
    return false
  }

  return (
    <form
      onSubmit={onSubmit}
      className='flex w-full flex-col items-center justify-center gap-6'
    >
      <Input
        isRequired
        type='email'
        label='Email'
        defaultValue=''
        className='max-w-xs'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errors?.map((err, index) =>
        err.field === 'email' ? (
          <Chip
            color='danger'
            key={index}
            className='w-full max-w-xs rounded-lg'
          >
            <div className='max-w-[300px] truncate text-xs'>{err.message}</div>
          </Chip>
        ) : null,
      )}

      <Input
        label='Password'
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
            aria-label='toggle password visibility'
          >
            {isVisible ? (
              <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
            ) : (
              <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        className='max-w-xs'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {!hasInvalidEmail() &&
        errors?.map((err, index) =>
          err.field === 'password' ? (
            <Chip
              color='danger'
              key={index}
              className='w-full max-w-xs rounded-lg'
            >
              <div className='max-w-[300px] truncate text-xs'>
                {err.message}
              </div>
            </Chip>
          ) : null,
        )}
      <Button
        color='primary'
        type='submit'
        size='lg'
        className='w-full max-w-xs'
        variant='bordered'
      >
        Sign up
      </Button>
      {isSignedUp ? (
        <Chip
          startContent={<CheckIcon size={18} width={24} height={24} />}
          variant='faded'
          color='success'
          className='w-full max-w-xs rounded-lg'
        >
          Signed up successfully! Redirecting...
        </Chip>
      ) : null}
    </form>
  )
}
