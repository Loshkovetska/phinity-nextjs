import classNames from 'classnames'
const Button = ({
  classname,
  text,
  type,
  click,
}: {
  click: (e?: any) => void
  classname: string
  text: any
  type?: 'button' | 'submit'
}) => {
  return (
    <button
      className={classNames('button', classname)}
      onClick={click}
      type={type}
    >
      <div className="button__text"> {text}</div>
    </button>
  )
}

export default Button
