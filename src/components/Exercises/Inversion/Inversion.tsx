'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { TitleBar } from '@/components/TitleBar/TitleBar'
import { Text } from '@/components/ui/Text'
import useTokenCheck from '@/hooks/useToken'
import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

type Tool = 'pen' | 'fine' | 'thick' | 'eraser'

type InversionProps = {
  exerciseId: string
}

export function Inversion({ exerciseId }: InversionProps) {
  const t = useTranslations('Inversion')

  useTokenCheck()
  const router = useRouter()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  const [selectedTool, setSelectedTool] = useState<Tool>('pen')
  const [strokeColor, setStrokeColor] = useState('#000000')

  const DefaultScale = 1
  const FinePen = 1
  const DefaultPen = 5
  const EraserOrThickPen = 5

  const handleConfirm = async () => {
    // const exerciseId = '7a4fc39c-0f98-4cd6-9362-e161b142295a'

    try {
      const token = getToken()
      const response = await api(token).get('/auth/token')
      const userId = response.data.userId

      await api(token).post('/exercise/register', {
        userId,
        exerciseId,
      })

      router.push('/exercises/feedback')
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message)
      } else {
        console.error('Unexpected error:', err)
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const scale = window.devicePixelRatio || DefaultScale

    canvas.width = rect.width * scale
    canvas.height = rect.height * scale

    ctx.scale(scale, scale)
  }, []) // <- roda só uma vez

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx) return

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()

      if (e instanceof TouchEvent) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true
      const pos = getPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return
      const pos = getPos(e)

      ctx.lineTo(pos.x, pos.y)

      // Estilos da ferramenta
      ctx.strokeStyle = selectedTool === 'eraser' ? '#f6f6f6' : strokeColor

      ctx.lineWidth =
        selectedTool === 'fine'
          ? FinePen
          : selectedTool === 'thick' || selectedTool === 'eraser'
            ? EraserOrThickPen
            : DefaultPen

      ctx.lineCap = 'round'
      ctx.stroke()
    }

    const stopDrawing = () => {
      isDrawing.current = false
      ctx.closePath()
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseleave', stopDrawing)

    canvas.addEventListener('touchstart', startDrawing)
    canvas.addEventListener('touchmove', draw)
    canvas.addEventListener('touchend', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseleave', stopDrawing)

      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', draw)
      canvas.removeEventListener('touchend', stopDrawing)
    }
  }, [selectedTool, strokeColor])

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen bg-background text-text">
      <TitleBar
        label={t('title')}
        answer={{ finalPhrase: 'Você terminou!' }}
        onConfirm={handleConfirm}
      />

      <Text
        size="sub"
        className="text-base text-left"
      >
        Aqui a ideia é inverter a lógica de tudo que sabemos sobre a criação de
        marca. Desenhe sua versão do logo abaixo da pior maneira que conseguir
      </Text>

      <div className="flex justify-center bg-background py-7">
        <Image
          src="/twitter-logo.png"
          alt="Twitter logo"
          width={170}
          height={170}
        />
      </div>

      <div className="w-full h-[44vh] min-h-[16rem] max-h-[44rem] bg-background rounded-2xl relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
        />
      </div>

      {/* Barra de ferramentas */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedTool('pen')}
            className={`w-15 h-15 rounded-full border text-xl ${selectedTool === 'pen' ? 'border-text' : 'border-grey-2'}`}
            title="Caneta padrão"
          >
            ✏️
          </button>
          <button
            onClick={() => setSelectedTool('fine')}
            className={`w-15 h-15 rounded-full border text-xl ${selectedTool === 'fine' ? 'border-text' : 'border-grey-2'}`}
            title="Caneta fina"
          >
            🖊️
          </button>
          <button
            onClick={() => setSelectedTool('thick')}
            className={`w-15 h-15 rounded-full border text-xl ${selectedTool === 'thick' ? 'border-text' : 'border-grey-2'}`}
            title="Caneta grossa"
          >
            🖍️
          </button>
          <button
            onClick={() => setSelectedTool('eraser')}
            className={`w-15 h-15 rounded-full border text-xl ${selectedTool === 'eraser' ? 'border-text' : 'border-grey-2'}`}
            title="Borracha"
          >
            🧽
          </button>
        </div>
        {/* Paleta de cores */}
        <button
          className="w-15 h-15 rounded-full border"
          style={{ backgroundColor: strokeColor }}
          onClick={() => document.getElementById('colorPicker')?.click()}
        />

        <input
          id="colorPicker"
          type="color"
          value={strokeColor}
          onChange={(e) => setStrokeColor(e.target.value)}
          className="absolute top left-0 w-0 h-0 opacity-0"
        />
      </div>
    </div>
  )
}
