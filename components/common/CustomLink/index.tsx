import { Fragment } from 'react'

const CustomLink = ({
  children,
  type,
  text,
}: {
  children: any
  type: string
  text: string
}) => {
  const getPhone = (str: string) => {
    const arr: any = str.split('')
    for (let i = 0; i < arr.length; i++) {
      if (isNaN(arr[i]) || !arr[i].length) arr.splice(i, 1)
    }

    return arr.join('')
  }
  const clickHandler = () => {
    if (type == 'phone') window.location.href = `tel:${getPhone(text)}`
    if (type == 'email') window.location.href = `mailto:${text}`
  }

  return <div onClick={clickHandler}>{children}</div>
}
export default CustomLink
