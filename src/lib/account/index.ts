import { Error, Success } from '@/types/response/types';
import axios from 'axios';

export async function GetAccountNotifications(): Promise<Success | Error> {
    try {
        const { data } = await axios.get('/accounts/notifications/show');

        const response: Success | Error = data;

        return data;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}

export async function archiveNotification(id: number): Promise<Success | Error> {
    try {
        const { data } = await axios.post('/accounts/notifications/archive', {
            id,
        });

        const response: Success | Error = data;

        return data;
    } catch (error: any) {
        const response: Error = error.response.data;
        return response;
    }
}
