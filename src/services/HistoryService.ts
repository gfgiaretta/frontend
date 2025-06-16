import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

export interface HistoryItem {
  id: string
  title: string
  description: string
  interest: string
  date: string
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  const token = getToken()
  const response = await api(token).get('/exercise/history')

  // eslint-disable-next-line no-magic-numbers
  if (response.status !== 200) {
    throw new Error('Falha ao buscar histórico')
  }

  console.log('HISTORY RESPONSE: ', response)

  return response.data as HistoryItem[]
}
