import axios from 'axios';

export const LectureAPI = {
    postLecture: async function (lect_url: string) {
        const response = await axios.post(
            'http://127.0.0.1:8000/upload_lecture',
            null,
            {
                params: {
                    link: `${lect_url}`
                },
                headers: {
                    'accept': 'application/json'
                }
            }
        );
        return response.data
    },
    queryLecture: async function (input_query: string) {
        const response = await axios.get(`http://127.0.0.1:8000/query_lecture?query=${input_query}`)
        return response.data;
    },
    cleanLecture: async function (lect_url: string) {
        const response = await axios.post(
            'http://127.0.0.1:8000/clean_lecture',
            null,
            {
                params: {
                    link: `${lect_url}`
                },
                headers: {
                    'accept': 'application/json'
                }
            }
        );
        return response.data
    }
};

