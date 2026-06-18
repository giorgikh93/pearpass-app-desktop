import { useEffect, useRef } from 'react'

type ErrorValue =
  | string
  | null
  | undefined
  | unknown[]
  | Record<string, unknown>

const countActiveErrors = (errors: Record<string, ErrorValue>): number =>
  Object.values(errors).filter((v) => {
    if (v == null) return false
    if (typeof v === 'string') return v.length > 0
    if (Array.isArray(v)) return v.length > 0
    return Object.keys(v as Record<string, unknown>).length > 0
  }).length

// Scrolls to the first field error in the dialog after a failed form submission.
// Triggers when error count increases or stays the same (submit), not when it
// decreases (user editing a field clears one error).
export const useScrollToFirstError = (
  errors: Record<string, ErrorValue>
): void => {
  const prevErrorCountRef = useRef(0)

  useEffect(() => {
    const errorCount = countActiveErrors(errors)

    if (errorCount > 0 && errorCount >= prevErrorCountRef.current) {
      const firstAlert = document.querySelector<HTMLElement>(
        '[role="dialog"] [role="alert"]'
      )
      const fieldWrapper = firstAlert?.parentElement ?? firstAlert
      fieldWrapper?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    prevErrorCountRef.current = errorCount
  }, [errors])
}
