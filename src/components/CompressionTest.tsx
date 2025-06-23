// 'use client'

// //This NEEDS to be client side since we're handling compression by ourselves
// import React, { useRef } from 'react'

// import { useImageUpload } from '@/hooks/useImageUpload'

// export default function ImageCompressor() {
//   const inputRef = useRef<HTMLInputElement | null>(null)

//   // This is a workaround to trigger the file input click
//   return (
//     <div className="flex flex-col items-center gap-4">
//       <button
//         onClick={() => inputRef.current?.click()}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Select Image
//       </button>
//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         className="hidden"
//         onChange={useImageUpload}
//       />
//     </div>
//   )
// }
