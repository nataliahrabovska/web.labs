import axios from 'axios';
import { API_URL, FILTER_URL } from '../constants/apiConstants';

export const getLaptops = async () => {
    try {
        const laptops = await axios.get(API_URL);
        return laptops.data;
    } catch (error) {
        console.error(error);
    }
}

export const getLaptopById = async (id) => {
    try {
        const laptop = await axios.get(`${API_URL}/${id}`);
        return laptop.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getFilteredLaptops({ price, company, screenSize }) {
    try {
        const response = await axios.get(FILTER_URL,{
            params: {
                price,
                company,
                screenSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
