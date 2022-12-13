import { observable, runInAction } from 'mobx'
import { DOMAIN } from '../mocks/doman'
import searchRes from '../mocks/search'

type GlobalType = {
  isMenuOpen: boolean
  isSearchOpen: boolean
  search: any
  locoScroll: any
  rating: any
  isTheraFilter: boolean
  filterCount: number
  history: any
  links: any
}
const GlobalState: GlobalType = observable({
  isMenuOpen: false,
  isSearchOpen: false,
  search: null,
  locoScroll: null,
  rating: null,
  isTheraFilter: false,
  filterCount: 0,
  history: null,
  links: null,
})

export default GlobalState

export const getLinks = async () => {
  const fd = new FormData()
  fd.append('status', 'linkPage')

  fetch(DOMAIN + 'react', {
    method: 'POST',
    body: fd,
  })
    .then((response) => response.json())
    .then((result) => {
      runInAction(() => {
        GlobalState.links = result
      })
    })
}

export const changeTheraFilterState = () => {
  runInAction(() => {
    GlobalState.isTheraFilter = !GlobalState.isTheraFilter
  })
}

export const changeMenuState = () => {
  if (!GlobalState.isMenuOpen) {
    runInAction(() => {
      GlobalState.isSearchOpen = false
      GlobalState.search = null
    })
  }
  runInAction(() => {
    GlobalState.isMenuOpen = !GlobalState.isMenuOpen
  })
}

export const changeSearchState = () => {
  if (!GlobalState.isSearchOpen) {
    runInAction(() => {
      GlobalState.isMenuOpen = false
      GlobalState.search = null
    })
  }
  runInAction(() => {
    GlobalState.isSearchOpen = !GlobalState.isSearchOpen
    GlobalState.search = null
  })
}

export const search = async (text: string) => {
  try {
    const fd = new FormData()
    fd.append('param1', text)
    fd.append('status', 'poisk')
    let response = await fetch(DOMAIN + 'react/', {
      method: 'POST',
      body: fd,
    })

    let res = await response.json()
    runInAction(() => {
      GlobalState.search = res
    })
  } catch (e) {
    console.log(e)
  }
}

export const getReviewsIO = async () => {
  try {
    let response = await fetch(
      'https://api.reviews.io/merchant/reviews?store=phinity-therapy&sku=SKUS',
      {
        method: 'GET',
      },
    )

    let res = await response.json()

    return {
      average_rating: res.stats.average_rating,
      num_ratings: res.stats.total_reviews,
    }

    // runInAction(() => {
    //   GlobalState.rating = {
    //     average_rating: res.stats.average_rating,
    //     num_ratings: res.stats.total_reviews,
    //   }
    // })
  } catch (e) {
    console.log(e)
  }
}
