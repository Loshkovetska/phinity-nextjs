import { useEffect, useMemo, useState } from 'react'

const DateTime = ({ type, date }: { type: 'short' | 'long'; date: string }) => {
  const res = useMemo(() => {
    return new Date(date).toLocaleDateString('en', {
      month: type,
      day: '2-digit',
      year: 'numeric',
    })
  }, [type, date])

  return <>{res}</>
}

export default DateTime
