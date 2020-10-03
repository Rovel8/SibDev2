import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDC3Veeb7YDqti5oS9pYND-MjsZ3Ejzxvs&type=video&'
})

export const getVideos = (query: string, order: string = 'rating', maxResults = 12) => {
    const trimQuery = query.trim().toLocaleLowerCase()
    const regex = /\s/g
    const queryWithoutWhitespaces = trimQuery.replace(regex, '+')
    return instance.get<any>(`order=${order}&maxResults=${maxResults}&q=${queryWithoutWhitespaces}`)
}