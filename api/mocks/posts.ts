export type Post = {
  id: number
  title: string
  date: string
  shortInfo: string
  cat: string
  tags: Array<string>
  author: Author
  content: Array<any>
  img?: string | null
  views?: number
  refs?: Array<any>
  link?: string
}

export type Author = {
  name: string
  position: string
  area: string
  src: string
  about: string
  link?: string
}