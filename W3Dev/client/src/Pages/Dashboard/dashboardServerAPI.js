import axios from "axios";

const dashboardServerURL = axios.create({
    baseURL: "http://localhost:8000"
})

export const dashboardServerAPI = async(dashboardData) => {
    try {
        const apiData = await dashboardServerURL.post("/dashboard/fetch-articles", {query: dashboardData})
        return {status: apiData.status, article_data: apiData.data.article_data}
    } catch(e) {
        console.log(`Client Error on Dashboard Server API ${e}`)
        return {status: e.response.status, error: e.response.data.error}
    }
}
