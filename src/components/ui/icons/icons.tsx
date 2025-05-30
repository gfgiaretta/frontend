import * as React from 'react'

export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props
  return (
    <svg
      viewBox="0 0 21 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M4.523 19.145c-1.256 0-1.986-.712-1.986-1.943V8.817l-1.142.967c-.185.15-.387.281-.633.281-.475 0-.756-.342-.756-.703 0-.202.088-.413.281-.571l9.158-7.69c.66-.554 1.468-.554 2.118 0l4.623 3.884V3.201c0-.387.255-.633.633-.633h.94c.387 0 .634.246.634.633V6.84l2.32 1.951a.719.719 0 01.272.598c0 .422-.334.676-.747.676-.246 0-.448-.131-.624-.28l-1.221-1.03v8.447c0 1.23-.73 1.942-1.978 1.942H4.523zm8.508-7.304v5.889h3.085c.554 0 .861-.317.861-.888V7.569l-6.16-5.168c-.194-.175-.431-.175-.625 0l-6.24 5.23v9.21c0 .572.308.889.87.889H7.96v-5.89c0-.403.264-.667.677-.667h3.726c.405 0 .668.264.668.668z"
        fill="currentColor"
      />
    </svg>
  )
}
