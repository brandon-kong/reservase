import instance from "../axios";

export async function getProfileData(pk: number) {
    const { data, status } = await instance.get(`profile/${pk}`)

    if (status !== 200) {
        return null
    }
    else {
        return data
    }
}