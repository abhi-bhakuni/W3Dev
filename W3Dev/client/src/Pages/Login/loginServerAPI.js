import axios from 'axios'

const loginServerURL = axios.create({
    baseURL: "http://localhost:8000"
})

export const loginServerAPI = async(loginData) => {
    try {
        const apiData = await loginServerURL.post("/login/login-check", loginData)
        return {status: apiData.status, data: apiData.data}
    } catch(e) {
        console.error(`Client Error on Login Server API ${e}`)
        return {status: e.response.status, error: e.response.data.error}
    }
}
