import { observable, runInAction } from 'mobx'
import { Faq } from '../api/mocks/faqs'
import { Issue } from '../api/mocks/issues'
import { Post } from '../api/mocks/posts'
import { Review } from '../api/mocks/reviews'
import { Service } from '../api/mocks/services'
import { Therapist } from '../api/mocks/therapists'
import { Vacancy } from '../api/mocks/vacancies'
import { Video } from '../api/mocks/videos'
import { DOMAIN } from '../mocks/doman'
var FormData = require('form-data')

type DBStoreType = {
  reviews: Review[] | null
  therapists: Therapist[] | null
  services: Service[] | null
  posts: Post[] | null
  therapist: Therapist | null
  post: Post | null
  service: Service | null
  issues: Issue[] | null
  issue: Issue | null
  tags: Array<string> | null
  categories: Array<string> | null
  videos: Array<Video> | null
  video: Video | null
  faqs: Array<Faq> | null
  vacancies: Array<Vacancy> | null
  vacancy: Vacancy | null
  issuesFilters: any
  servicesFilters: any
  symptoms: Array<{
    title: string
    text: string
  }> | null
  popularVideos: Array<Video> | null
  therapistsFilter: any
  popularPosts: Array<Post> | null
  videosFilter: any
  postCategories: Array<any> | null
  worksCategories: Array<any> | null
}

const DBStore: DBStoreType = observable({
  reviews: Array(),
  therapists: Array(),
  services: Array(),
  posts: Array(),
  therapist: null,
  post: null,
  service: null,
  issues: null,
  issue: null,
  images: null,
  tags: null,
  categories: null,
  videos: null,
  video: null,
  faqs: null,
  vacancies: null,
  vacancy: null,
  symptoms: null,
  issuesFilters: null,
  servicesFilters: null,
  videosFilter: null,
  popularVideos: null,
  therapistsFilter: null,
  popularPosts: null,
  postCategories: null,
  worksCategories: null,
})

export default DBStore

export const getPopularVideos = async () => {
  const fd = new FormData()
  fd.append('status', 'popular-videos')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()

  return response
}

export const getPopularPosts = async () => {
  const fd = new FormData()
  fd.append('status', 'popular-post')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()

  return response
}

export const getReviews = async () => {
  const fd = new FormData()
  fd.append('status', 'reviews')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()

  return response
  // runInAction(() => {
  //   DBStore.reviews = response
  // })
}

export const getPosts = async () => {
  const fd = new FormData()
  fd.append('status', 'post')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getPost = async (link: string) => {
  const fd = new FormData()
  fd.append('status', 'post')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  runInAction(() => {
    DBStore.post = response.find((p: any) => p.link == link) || null
  })
}

export const getWorkFilters = async () => {
  const fd = new FormData()
  fd.append('status', 'category-vacancies')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getTherapists = async () => {
  const fd = new FormData()
  fd.append('status', 'therapists')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}
export const getTherapist = async (id: string) => {
  const fd = new FormData()
  fd.append('status', 'therapists')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response.find((t: any) => t.link == id) || null
}

export const getServices = async () => {
  const fd = new FormData()
  fd.append('status', 'services')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()

  return response
}

export const filterServices = async (st: any) => {
  const fd = new FormData()
  fd.append('dt', JSON.stringify(st))
  fd.append('status', 'filter-services')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const filterTherapists = async (st: any) => {
  const fd = new FormData()
  fd.append('dt', JSON.stringify(st))
  fd.append('status', 'filter-therapists')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getTherapistsFilters = async () => {
  const fd = new FormData()
  fd.append('status', 'category-therapists')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getServicesFilters = async () => {
  const fd = new FormData()
  fd.append('status', 'f-services')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getBlogCategories = async () => {
  const fd = new FormData()
  fd.append('status', 'category-post')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getVideosFilters = async () => {
  const fd = new FormData()
  fd.append('status', 'category-video')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getService = async (link: string) => {
  const fd = new FormData()
  fd.append('link', link.toString())
  fd.append('status', 'services')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response.find((r: any) => r.link == link)
}

export const getIssues = async () => {
  const fd = new FormData()
  fd.append('status', 'issues')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getIssuesFilters = async () => {
  const fd = new FormData()
  fd.append('status', 'f-issues')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const filterIssues = async (st: any) => {
  const fd = new FormData()
  fd.append('dt', JSON.stringify(st))
  fd.append('status', 'filter-issues')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const filterVideos = async (st: any) => {
  const fd = new FormData()
  fd.append('dt', JSON.stringify(st))
  fd.append('status', 'filter-videos')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getIssue = async (id: string) => {
  const fd = new FormData()
  fd.append('status', 'issues')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response.find((i: any) => i.link == id) || null
}

export const getTags = async () => {
  const fd = new FormData()
  fd.append('status', 'tags')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  runInAction(() => {
    DBStore.tags = response
  })
}

export const getCategories = async () => {
  const fd = new FormData()
  fd.append('status', 'category-therapists')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  runInAction(() => {
    DBStore.categories = response
  })
}

export const getFaqs = async () => {
  const fd = new FormData()
  fd.append('status', 'faqs')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getVacancies = async () => {
  const fd = new FormData()
  fd.append('status', 'vacancies')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const filterVacancies = async (st: any) => {
  const fd = new FormData()
  fd.append('dt', JSON.stringify(st))
  fd.append('status', 'filter-vacancies')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}
export const getVideos = async () => {
  const fd = new FormData()
  fd.append('status', 'videos')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response
}

export const getVideo = async (id: string) => {
  const fd = new FormData()
  fd.append('status', 'videos')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()

  return response.find((v: any) => v.link == id) || null
}

export const getVacancy = async (link: string) => {
  const fd = new FormData()
  fd.append('status', 'vacancies')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  return response.find((v: any) => v.link == link) || null
}

export const getSymptoms = async (id: number) => {
  const fd = new FormData()
  fd.append('id', id.toString())
  fd.append('status', 'symptoms')
  let request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: fd,
  })
  let response = await request.json()
  runInAction(() => {
    DBStore.symptoms = response
  })
}
