import { useState, useCallback } from 'react'

interface Toast {
  title: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [, setToast] = useState<Toast | null>(null)

  const toast = useCallback((props: Toast) => {
    setToast(props)
    if (props.variant === 'destructive') {
      alert(`${props.title}\n${props.description || ''}`)
    }
    setTimeout(() => setToast(null), 3000)
  }, [])

  return { toast }
}
