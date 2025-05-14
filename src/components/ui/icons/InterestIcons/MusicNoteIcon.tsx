import * as React from 'react'

export const MusicNoteIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props
  return (
    <svg
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M10.0234 4.25C10.0234 4.50781 9.85938 4.71094 9.59375 4.76562L6.02344 5.54688C5.65625 5.625 5.57812 5.71094 5.57812 6.125V13.2734C5.57812 15.5469 3.85938 16.3906 2.71094 16.3906C1.41406 16.3906 0.492188 15.5547 0.492188 14.3594C0.492188 13.1797 1.22656 12.3828 2.78906 12.0547L4.03125 11.7969C4.375 11.7266 4.55469 11.4766 4.51562 11.0938L4.5 2.40625C4.5 1.96875 4.77344 1.69531 5.27344 1.58594L9.28906 0.710938C9.6875 0.632812 10.0234 0.898438 10.0234 1.3125V4.25Z"
        fill="currentColor"
      />
    </svg>
  )
}
