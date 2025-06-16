import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

interface ExerciseDTO {
  exercise_id: string
  type: string
  title: string
  description: string
  interest_id: string
}

export interface InversionExerciseDTO extends ExerciseDTO {
  type: 'Inversão'
  content: {
    image_url: string
  }
}

export interface LimitedNarrativeExerciseDTO extends ExerciseDTO {
  type: 'Narrativa Limitada'
  content: {
    text_field: string[]
  }
}

type ArtistArtworkPair = {
  artist: {
    name: string
    image: string
  }
  artwork: {
    name: string
    image: string
  }
}
export interface ConnectionExerciseDTO extends ExerciseDTO {
  type: 'Conexão Artística'
  content: ArtistArtworkPair[]
}

export async function getExercise(exerciseId: string): Promise<ExerciseDTO> {
  const token = getToken()
  const response = await api(token).get(`/exercise/${exerciseId}`)
  return response.data
}
