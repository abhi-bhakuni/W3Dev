import axios from "axios";

const dashboardServerURL = axios.create({
    baseURL: "http://localhost:8000"
})

export const dashboardServerAPI = async(dashboardData) => {
    try {
        const apiData = await dashboardServerURL.post("/dashboard/fetch-articles", {query: dashboardData})
        console.log(apiData.data)
        return {status: apiData.status, data: apiData.data}
    } catch(e) {
        console.log(`Client Error on Dashboard Server API ${e}`)
        return {status: e.response.status, error: e.response.data.error}
    }
}
