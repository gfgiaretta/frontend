import axios from 'axios'
import imageCompression, { Options } from 'browser-image-compression'

import { api } from '@/utils/api'
import { getToken } from '@/utils/token'

type ImageUploadResponse = {
  data: string
  status: number
  statusText: string
}

// eslint-disable-next-line no-magic-numbers
const SUCCESS_UPLOAD_STATUS = [200, 201]

export async function useImageUpload(file: File | null | undefined) {
  if (!file) {
    return
  }

  try {
    const options: Options = {
      maxSizeMB: 5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      alwaysKeepResolution: true,
      preserveExif: true,
      fileType: 'image/jpeg',
    }

    const key = `${new Date().getTime()}.jpeg`

    const s3Link = await getS3Link(key)
    const compressedFile = await imageCompression(file, options)
    await uploadToS3(s3Link, compressedFile)
    const result = extractS3Key(s3Link)
    return result
  } catch (_) {
    //TODO: ADD TOAST TO APP AND SHOW AN ERROR TOAST HERE
    //console.error('Compression error:', error)
  }
}

function extractS3Key(url: string): string | null {
  try {
    const parsedUrl = new URL(url)
    const pathname = parsedUrl.pathname

    // Ensure it starts with a slash and return the full S3 key
    return decodeURIComponent(pathname)
  } catch (_) {
    //console.error('Invalid URL:', e)
    return null
  }
}

async function getS3Link(key: string) {
  const token = getToken()
  const response = (await api(token).get('/presigned', {
    params: {
      key,
    },
  })) as ImageUploadResponse

  const s3Link = response.data
  if (!s3Link) {
    throw new Error('No S3 link returned')
  }
  return s3Link
}

async function uploadToS3(s3Link: string, compressedFile: File) {
  const uploadResponse = await axios.put(s3Link, compressedFile, {
    headers: {
      'Content-Type': compressedFile.type || 'application/octet-stream',
    },
  })

  if (!SUCCESS_UPLOAD_STATUS.includes(uploadResponse.status)) {
    throw new Error(
      `Failed to upload image to S3 : ${uploadResponse.statusText}`,
    )
  }
}
