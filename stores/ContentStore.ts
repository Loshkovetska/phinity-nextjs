import { observable, runInAction } from 'mobx'
import { DOMAIN } from '../mocks/doman'
var FormData = require('form-data')

const ContentStore: any = observable({
  book: null,
  submenu: null,
  post: null,
  home: null,
  issues: null,
  services: null,
  therapists: null,
  about: null,
  works: null,
  service: null,
  issue: null,
  therapist: null,
  fees: null,
  contact: null,
  faq: null,
  menu: null,
  blog: null,
  privacy: null,
  terms: null,
  nofound: null,
  job: null,
  thanks: null,
  video: null,
  videos: null,
  cookie: null,
  cookiePage: null,
})

export default ContentStore

export const getHome = async () => {
  const formData = new FormData()
  formData.append('status', 'home')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()
  return response
}

export const getIssuesContent = async () => {
  const formData = new FormData()
  formData.append('status', 'issues-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getIssueContent = async (link: string) => {
  const formData = new FormData()
  formData.append('link', link.toString())
  formData.append('status', 'issue-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getTherapistsContent = async () => {
  const formData = new FormData()
  formData.append('status', 'therapists-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getTherapistContent = async (id: string) => {
  const formData = new FormData()
  formData.append('id', id.toString())
  formData.append('status', 'single-therapists')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response[0]
}

export const getAbout = async () => {
  const formData = new FormData()
  formData.append('status', 'about-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getWork = async () => {
  const formData = new FormData()
  formData.append('status', 'join-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getServicesContent = async () => {
  const formData = new FormData()
  formData.append('status', 'services-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getSinglePost = async (id: string) => {
  const formData = new FormData()
  formData.append('link', id.toString())
  formData.append('status', 'single-post')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response[0]
}

export const getSingleService = async (link: string) => {
  const formData = new FormData()
  formData.append('link', link.toString())
  formData.append('status', 'services-single')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response[0]
}

export const getBookBlock = async () => {
  const formData = new FormData()
  formData.append('status', 'book')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getMenu = async () => {
  const formData = new FormData()
  formData.append('status', 'menu')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getBlogContent = async () => {
  const formData = new FormData()
  formData.append('status', 'blog-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getPrivacy = async () => {
  const formData = new FormData()
  formData.append('status', 'policy-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getTerms = async () => {
  const formData = new FormData()
  formData.append('status', 'terms-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getNoFound = async () => {
  const formData = new FormData()
  formData.append('status', 'nofound-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getJobContent = async () => {
  const formData = new FormData()
  formData.append('status', 'job-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getThanks = async () => {
  const formData = new FormData()
  formData.append('status', 'thanks-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getVideoContent = async (link: string) => {
  const formData = new FormData()
  formData.append('link', link)
  formData.append('status', 'video-single')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response[0]
}

export const getVideosContent = async () => {
  const formData = new FormData()
  formData.append('status', 'video-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getCookieContent = async () => {
  const formData = new FormData()
  formData.append('status', 'cookie-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getCookiePageContent = async () => {
  const formData = new FormData()
  formData.append('status', 'cookie-p')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getFaqContent = async () => {
  const formData = new FormData()
  formData.append('status', 'faq-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getContactContent = async () => {
  const formData = new FormData()
  formData.append('status', 'contacts-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getFeesContent = async () => {
  const formData = new FormData()
  formData.append('status', 'fees-page')

  const request = await fetch(DOMAIN + 'react/', {
    method: 'POST',
    body: formData,
  })

  const response = await request.json()

  return response
}

export const getSeo = async (
  id: string | number,
  type?: string | undefined | null,
) => {
  const section =
    type == 'blog'
      ? 'blog'
      : type &&
        ['issues', 'services', 'vacancies', 'videos', 'therapists'].includes(
          type,
        )
      ? type
      : 'pages'

  const request = await fetch(
    `https://admin.phinitytherapy.com/wp-json/wp/v2/${section}/${id}`,
  )

  const response = await request.json()

  return response.yoast_head_json
}

export const getPlugins = async () => {
  try {
    let response = await fetch(
      `https://admin.phinitytherapy.com/wp-json/hs/v2/header`,
    )

    let res = await response.json()

    const result = res.match(
      /(<script(.*){1,}([\n\t\w.\s={}"":/>();!'+&&||[\],\\\-\?\*<#@]{1,})<\/script>)/g,
    )
    //(/(<script.*(\n\s*.*){1,}<\/script>)/g)

    const fd = new FormData()
    fd.append('status', 'plugin')
    let response1 = await fetch(`${DOMAIN}react/`, {
      method: 'POST',
      body: fd,
    })

    let res1 = await response1.text()

    return result.join('') + res1
  } catch (e) {
    console.log(e)
  }
}


