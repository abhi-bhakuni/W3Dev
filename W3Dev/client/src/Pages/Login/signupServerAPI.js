import axios from 'axios'

const signupServerURL = axios.create({
    baseURL: "http://localhost:8000"
})

export const signupServerAPI = async(signupData) => {
    try {
        const apiData = await signupServerURL.post('/signup/signup-check', signupData)
        return {status: apiData.status, data: apiData.data};
    } catch(e) {
        console.error(`Client Error on Signup Server API ${e}`)
        return {status: e.response.status, error: e.response.data.error}
    }
}
