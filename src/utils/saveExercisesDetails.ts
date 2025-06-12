export const saveExercisesDetails = async (
  title: string,
  description: string,
  imageUrl: string,
) => {
  const exerciseObject = {
    title,
    description,
    imageUrl,
  }

  const encodedValue = encodeURIComponent(JSON.stringify(exerciseObject))

  document.cookie = `exerciseDetails=${encodedValue}; path=/; max-age=3600; secure; samesite=strict`
}
