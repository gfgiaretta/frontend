import { ImageIcon, PenTool, Zap } from 'lucide-react'

import ExerciseCard from '@/components/ExercisesCard/ExerciseCard'

export default function TestExercisesPage() {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      <ExerciseCard
        variant="support-blue"
        icon={ImageIcon}
        title="conexão artística"
        description="Refresque a memória através da identificação entre artistas e obras."
      />
      <ExerciseCard
        variant="secondary"
        icon={PenTool}
        title={'narrativa limitada'}
        description="Exercite o quanto pode criar com pouco através de uma narrativa limitada."
      />
      <ExerciseCard
        variant="primary"
        icon={Zap}
        title="inversão"
        description="Inverta a lógica de tudo que sabe sobre criação de marca."
      />
    </div>
  )
}
