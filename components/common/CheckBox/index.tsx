import classNames from 'classnames'
import Check from '../../../assets/Regular.svg'
const CheckBox = ({
  ischeck,
  text,
  change,
}: {
  ischeck: boolean
  text: any
  change: (value: boolean) => void
}) => {
  return (
    <label className={classNames('checkbox', ischeck && 'checked')}>
      <div className="checkbox__cont">
        <input
          type="checkbox"
          className="input"
          checked={ischeck}
          onChange={(e) => change(e.target.checked)}
        />
        <Check/>
      </div>
      <span className="checkbox__text">{text}</span>
    </label>
  )
}

export default CheckBox
