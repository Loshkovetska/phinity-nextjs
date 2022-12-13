export const outputDate = (date: string) => {
    return new Date(date).toLocaleDateString('en', {
        month: 'short',
        day: '2-digit',
        year:'numeric'
  })
}

export const outputFullDate = (date: string) => {
    return new Date(date).toLocaleDateString('en', {
        month: 'long',
        day: '2-digit',
        year:'numeric'
  })
}
