export type Video = {
  id: number
  title: string
  src: string
  poster?: string
  text: string
  views?: number
  link?: string
  category?: string
  author?: {
    about: string | null
    area: string | null
    name: string | null
    position: string | null
    src: string | null
  }
  date?: any
  linkAuthor?: any
}
