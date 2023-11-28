import axios from 'axios';
import { API_URL, FILTER_URL } from '../constants/apiConstants';

function generateFilterUrl({ price, company, screenSize }) {
    const params = new URLSearchParams();

    // if (price !== null) {
    //     params.append('price', price.toString());
    // }

    // if (company !== null) {
    //     params.append('company', company);
    // }

    // if (screenSize !== null) {
    //     params.append('screenSize', screenSize.toString());
    // }

    // const url = params.toString();
    // console.log(url);
    // return url ? `?${url}` : '';
}

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
    const url = generateFilterUrl({ price, company, screenSize });
    console.log(`${FILTER_URL}${url}`);
    try {
        const response = await axios.get(FILTER_URL,{
            params: {
                // ...(price != 'price' && { price: price }),
                // ...(company != 'company' && { company: company }),
                // ...(screenSize && { screenSize: screenSize }),           
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
