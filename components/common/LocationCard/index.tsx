import { observer } from "mobx-react"
import { LocationItem } from "../../../api/mocks/locations";
import { useContentState } from "../../../hooks/RootStoreProvider";


const LocationCard = ({item}:{item:LocationItem}) => {
    const { links } = useContentState();
    const basicUrl = links?.find((c: any) => c.id == 5083) || '';
    return <a href={`${basicUrl?.link||""}/${item.slug}`} className="loc-card">
        <div className="loc-card__img">
            <img src={item.img.src} alt={item.img.alt } />
        </div>
        <div className="loc-card__content">
        <h3 className="loc-card__title"dangerouslySetInnerHTML={{__html:item.title}}></h3>
        </div>
    </a>
}

export default observer(LocationCard)