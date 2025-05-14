'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { CREATED_STATUS, signIn, signUp } from '@/services/AuthService'
import { decodeToken, isTokenValid, setToken } from '@/utils/token'

type RegisterObject = {
  value: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

type RegisterField = {
  title: string
  inputType: string
  refValue: RegisterObject['value']
  setState: RegisterObject['setState']
  hasIcon?: boolean
}

function useRegisterFields({
  emailObj: { value: email, setState: setEmail },
  usernameObj: { value: username, setState: setUsername },
  passwordObj: { value: password, setState: setPassword },
  confirmPasswordObj: { value: confirmPassword, setState: setConfirmPassword },
}: {
  emailObj: RegisterObject
  usernameObj: RegisterObject
  passwordObj: RegisterObject
  confirmPasswordObj: RegisterObject
}): RegisterField[] {
  return [
    {
      title: 'username',
      inputType: 'text',
      refValue: username,
      setState: setUsername,
      hasIcon: false,
    },
    {
      title: 'email',
      inputType: 'text',
      refValue: email,
      setState: setEmail,
      hasIcon: false,
    },
    {
      title: 'password',
      inputType: 'password',
      refValue: password,
      setState: setPassword,
      hasIcon: true,
    },
    {
      title: 'confirmPassword',
      inputType: 'password',
      refValue: confirmPassword,
      setState: setConfirmPassword,
      hasIcon: true,
    },
  ]
}

export default function Register() {
  const t = useTranslations('Auth')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const validateInputs = () => {
    if (!username) {
      setError(t('registerErrors.usernameRequired'))
      return false
    }
    if (!email) {
      setError(t('registerErrors.emailRequired'))
      return false
    }
    if (!password) {
      setError(t('registerErrors.passwordRequired'))
      return false
    }
    if (!confirmPassword) {
      setError(t('registerErrors.confirmPasswordRequired'))
      return false
    }
    if (password !== confirmPassword) {
      setError(t('registerErrors.passwordMismatch'))
      return false
    }
    return true
  }

  const handleRegister = async () => {
    setError('')
    try {
      if (!validateInputs()) {
        return
      }
      const resp = await signUp(email, password, username)
      if (resp.statusCode !== CREATED_STATUS) {
        throw new Error(resp.message)
      }

      await handleLogin(email, password)
    } catch {
      setError(t(`registerErrors.unknownError`))
    }
  }

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    try {
      const { accessToken } = await signIn(loginEmail, loginPassword)
      setToken(accessToken)

      const token = decodeToken(accessToken)

      if (!token || !isTokenValid(accessToken)) {
        throw new Error('Token is invalid or expired')
      }

      router.push('/pickInterest')
    } catch (_) {
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="flex items-center mb-14 mt-11">
        <Image
          src="/creative-flow-logo-completo.svg"
          alt="scribble"
          width={350}
          height={350}
        />
      </div>
      {useRegisterFields({
        emailObj: { value: email, setState: setEmail },
        usernameObj: { value: username, setState: setUsername },
        passwordObj: { value: password, setState: setPassword },
        confirmPasswordObj: {
          value: confirmPassword,
          setState: setConfirmPassword,
        },
      } as const).map((field) => {
        const isActive = field.refValue.length

        return (
          <div
            key={`${field.title}wrapper`}
            className="relative w-full max-w-xs mb-6 pt-3"
          >
            <input
              id={field.title}
              type={field.hasIcon && showPassword ? 'text' : field.inputType}
              value={field.refValue}
              onChange={(e) => field.setState(e.target.value)}
              className="peer w-full border-b-2 border-grey-2 bg-transparent pt-5 pb-1 px-2 outline-none text-black"
              placeholder=" "
            />

            <label
              htmlFor={field.title}
              className={`
                cursor-text
                absolute left-2 transition-all duration-250 
                text-grey-1
                ${isActive ? '-top-2 text-xs text-grey-1' : 'top-7 text-base'} 
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-grey-1
              `}
            >
              {t(field.title)}
            </label>

            {field.hasIcon && (
              <button
                type="button"
                className="absolute right-2 top-9 cursor-pointer"
                onClick={() => {
                  setShowPassword((prev) => !prev)
                }}
              >
                <Image
                  src={showPassword ? '/olho_fechado.svg' : '/olho.svg'}
                  alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  width={20}
                  height={20}
                />
              </button>
            )}
          </div>
        )
      })}

      <div className="mt-0 w-full max-w-sm flex flex-col items-center gap-4">
        <Text
          className={`text-red-900 min-h-7 transition-opacity duration-250 ${error ? 'opacity-100' : 'opacity-0'}`}
        >
          {error || ' '}
        </Text>

        <Button
          variant="filled"
          className="w-full py-4 text-lg"
          onClick={() => handleRegister()}
        >
          {t('registerAction')}
        </Button>
      </div>
    </div>
  )
}
