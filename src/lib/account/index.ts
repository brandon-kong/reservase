import { authOptions } from "@/pages/api/auth/[...nextauth]";
import instance from "../axios";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

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

export async function getAccessToken() {
    const session = await getServerSession(authOptions)

    if (!session) {
        signOut()
        return null
    }

    const { accessToken } = session.user as any

    if (!accessToken) {
        signOut()
        return null
    }

    return accessToken
}

export async function userIsHost() {
    const accessToken = await getAccessToken()

    try {
        const { data, status } = await instance.get(`is/host`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (status !== 200) {
            return null
        }
        else {
            return data.is_host
        }
    }
    catch (error) {
        return null
    }
}
