import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'

const RightClickCatcher = observer(({ children }: { children: any }) => {
  const ref = useRef<any>(null)

  useEffect(() => {
    if (!ref.current) return
    ;(ref.current as HTMLElement).addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
    ;(ref.current as HTMLElement).addEventListener(
      'touchstart',
      (e) => {
        return false
      },
      {
        passive: true,
      },
    )
  }, [])
  return (
    <div
      ref={ref}
      style={{ width: '100%', height: '100%', display: 'flex' }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
})

export default RightClickCatcher
