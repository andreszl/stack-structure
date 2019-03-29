export const timestamp = () => {
    let date : any = new Date()
    return Math.floor(date/1000)
}

export const date = () => {
    return new Date()
}