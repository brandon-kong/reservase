import instance from "../axios";

export async function getProfileData(pk: number) {
    try {
        const { data, status } = await instance.get(`profile/${pk}`)

        if (status !== 200) {
            return null
        }
        else {
            return data
        }
    }
    catch (error) {
        return null
    }
}