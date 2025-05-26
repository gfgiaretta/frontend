'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { Text } from '@/components/ui/Text'
import { signIn } from '@/services/AuthService'
import { decodeToken, isTokenValid, setToken } from '@/utils/token'

export default function Login() {
  const t = useTranslations('Auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const HandleLogin = async () => {
    try {
      const { accessToken } = await signIn(email, password)

      if (!accessToken) {
        throw new Error('Token not found')
      }

      setToken(accessToken)

      const token = decodeToken(accessToken)

      if (!token || !isTokenValid(accessToken)) {
        throw new Error('Token is invalid or expired')
      }

      router.push('/home')
    } catch (_) {
      setError('Erro ao fazer login. Verifique suas credenciais.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="flex items-center mb-8 mt-10">
        <Image
          src="/creative-flow-logo-completo.svg"
          alt="scribble"
          width={350}
          height={350}
        />
      </div>

      <div className="w-full max-w-xs">
        <label
          className="text-primary mb-1"
          htmlFor="username"
        >
          <Text
            as="span"
            size="sub"
            className="text-grey-1"
          >
            {t('username')}
          </Text>
        </label>
        <input
          id="username"
          type="text"
          className="w-full border-b-2 border-grey-2 py-2 mb-4 outline-none"
          onChange={(event) => setEmail(event.target.value)}
        />

        <label
          className="text-primary mb-1"
          htmlFor="password"
        >
          <Text
            as="span"
            size="sub"
            className="text-grey-1"
          >
            {t('password')}
          </Text>
        </label>
        <div className="relative w-full">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="w-full border-b-2 border-grey-2 py-2 pr-10 outline-none"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <Image
              src={showPassword ? '/olho_fechado.svg' : '/olho.svg'}
              alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
        <Text className="text-red-900">{error}</Text>
        <Button
          variant="filled"
          onClick={HandleLogin}
          className="w-full py-4 text-lg"
        >
          {t('login')}
        </Button>
        <Button
          variant="filled"
          className="w-full py-4 text-lg"
          onClick={() => router.push('/register')}
        >
          {t('register')}
        </Button>
      </div>
    </div>
  )
}
