import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface Property {
	id: string;
	title: string;
}

interface FavoriteResponse {
	favResidenciesID: string[];
}

interface BookingResponse {
	bookedVisits: string[];
}

export const api = axios.create({
	baseURL: 'https://full-stack-real-estate-youtube.vercel.app/api',
});

export const getAllProperties = async (): Promise<Property[]> => {
	try {
		const response: AxiosResponse<Property[]> = await api.get(
			'/residency/allresd',
			{
				timeout: 10 * 1000,
			}
		);
		if (response.status === 400 || response.status === 500) {
			throw response.data;
		}
		return response.data;
	} catch (error) {
		toast.error('Something went wrong');
		throw error;
	}
};

export const getProperty = async (id: string): Promise<Property> => {
	try {
		const response: AxiosResponse<Property> = await api.get(
			`/residency/${id}`,
			{
				timeout: 10 * 1000,
			}
		);
		if (response.status === 400 || response.status === 500) {
			throw response.data;
		}
		return response.data;
	} catch (error) {
		toast.error('Something went wrong');
		throw error;
	}
};

export const createUser = async (
	email: string,
	token: string
): Promise<void> => {
	try {
		await api.post(
			`/user/register`,
			{ email },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch (error) {
		toast.error('Something went wrong, Please try again');
		throw error;
	}
};

export const bookVisit = async (
	date: string | number | Date | dayjs.Dayjs | null | undefined,
	propertyId: string,
	email: string,
	token: string
): Promise<void> => {
	try {
		await api.post(
			`/user/bookVisit/${propertyId}`,
			{
				email,
				id: propertyId,
				date: dayjs(date).format('DD/MM/YYYY'),
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch (error) {
		toast.error('Something went wrong, Please try again');
		throw error;
	}
};

export const removeBooking = async (
	id: string,
	email: string,
	token: string
): Promise<void> => {
	try {
		await api.post(
			`/user/removeBooking/${id}`,
			{
				email,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	} catch (error) {
		toast.error('Something went wrong, Please try again');
		throw error;
	}
};

export const toFav = async (
	id: string,
	email: string,
	token: string
): Promise<void> => {
	await api.post(
		`/user/toFav/${id}`,
		{
			email,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};

export const getAllFav = async (
	email: string,
	token: string
): Promise<string[]> => {
	if (!token) return [];
	try {
		const res: AxiosResponse<FavoriteResponse> = await api.post(
			`/user/allFav`,
			{ email },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data.favResidenciesID;
	} catch (e) {
		toast.error('Something went wrong while fetching favs');
		throw e;
	}
};

export const getAllBookings = async (
	email: string,
	token: string
): Promise<string[]> => {
	if (!token) return [];
	try {
		const res: AxiosResponse<BookingResponse> = await api.post(
			`/user/allBookings`,
			{ email },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data.bookedVisits;
	} catch (error) {
		toast.error('Something went wrong while fetching bookings');
		throw error;
	}
};

// Function to create a new residency
export const createResidency = async (
	data: Property,
	token: string
): Promise<void> => {
	await api.post(
		`/residency/create`,
		{ data },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
};
