export interface HistoryItem {
  id: string
  title: string
  description: string
  interest: string
  date: string
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await fetch('/api/history', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Falha ao buscar histórico')
  }

  return response.json()
}