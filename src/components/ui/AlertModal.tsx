import React, {
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import { useTranslations } from 'next-intl'

import { Button } from './Button'

export interface GenericModalProps {
  title: string
  description: string
  confirmLabel?: string
  cancelButton?: boolean
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export interface AlertModalHandle {
  show: () => void
  hide: () => void
}

const BaseModal: ForwardRefRenderFunction<
  AlertModalHandle,
  GenericModalProps
> = (
  {
    title,
    description,
    confirmLabel,
    cancelButton = false,
    cancelLabel,
    onConfirm,
    onCancel,
  },
  ref,
) => {
  const t = useTranslations('Components')
  const [showModal, setShowModal] = useState(false)

  const resolvedCancelLabel = cancelLabel || t('modal.cancel')
  const resolvedConfirmLabel = confirmLabel || t('modal.confirm')

  const hide = useCallback(() => {
    setShowModal(false)
  }, [])

  const show = useCallback(() => {
    setShowModal(true)
  }, [])

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }))

  return (
    showModal && (
      <div
        className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50"
        onClick={hide}
      >
        <div
          className="bg-background rounded-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-2 text-gray-700">{description}</p>
          <div className="pt-6 flex w-full justify-around gap-3">
            {cancelButton && (
              <Button
                variant="negative"
                className="mr-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  onCancel?.()
                  hide()
                }}
              >
                {resolvedCancelLabel}
              </Button>
            )}
            <Button
              className="bg-primary text-white px-4 py-2 rounded"
              onClick={() => {
                onConfirm?.()
                hide()
              }}
            >
              {resolvedConfirmLabel}
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export const AlertModal = React.forwardRef(BaseModal)
