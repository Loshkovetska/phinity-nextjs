import { observer } from 'mobx-react'
import Ellipse1 from '../../../../assets/Ellipse 67.svg'
import Hands from '../../../../assets/Hands.svg'
import Button from '../../../common/Button'
import GlobalState from '../../../../stores/GlobalState'

const NotFoundContent = observer(({ nofound }: { nofound: any }) => {
  if (!nofound) return <></>

  const linksL = GlobalState.links
  let main = ''
  if (linksL) {
    main = linksL.find((l: any) => l.id == 2).link
  }
  return (
    <section className="thanks ">
      <Ellipse1 className="therapist-intro__vector w31" />
      <Ellipse1 className="therapist-intro__vector w25" />
      <Ellipse1 className="therapist-intro__vector w71" />
      <Ellipse1 className="therapist-intro__vector w72" />
      <Ellipse1 className="therapist-intro__vector w120" />
      <Ellipse1 className="therapist-intro__vector w185" />
      <Ellipse1 className="therapist-intro__vector w254" />
      <div className="thanks__container">
        <div
          className="thanks__title"
          dangerouslySetInnerHTML={{ __html: nofound.title }}
        ></div>
        <Hands className="thanks__hands" />
        <div
          className="thanks__sub-text"
          dangerouslySetInnerHTML={{ __html: nofound.subText }}
        ></div>
        <div
          className="thanks__text"
          dangerouslySetInnerHTML={{ __html: nofound.text }}
        ></div>
        <div className="thanks__bottom">
          <Button
            classname="black-border p18p40"
            text={nofound.backButton}
            click={() => {
              window.history.go(-1)
            }}
          />
          <Button
            classname="blue p18p40"
            text={nofound.homeButton}
            click={() => (window.location.href = main)}
          />
        </div>
      </div>
    </section>
  )
})

export default NotFoundContent
