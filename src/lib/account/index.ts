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

export async function updateProfileData({ first_name, last_name, about_me, location, occupation, access }: any) {
    try {
        const { data, status } = await instance.post('http://127.0.0.1:8000/users/update/profile', {
            first_name,
            last_name,
            about_me,
            location,
            occupation
        }, {
            headers: {
                Authorization: `Bearer ${access}`
            }
        })

        //alert(status)

        if (status !== 200) {
            return null
        }
        else {
            return true
        }
    }
    catch (error) {
        return null
    }
}
