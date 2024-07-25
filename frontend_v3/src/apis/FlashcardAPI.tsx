import axios from 'axios';

export const FlashcardAPI = {
    uploadDoc: async function (file: File) {
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/upload_doc',
                formData,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    },
    files: async function () {
        const response = await axios.get(`http://127.0.0.1:8000/files`)
        return response.data;
    },
    make_flashcards: async function (input_query: string) {
        const response = await axios.post(`http://127.0.0.1:8000/genai?query=${input_query}`)
        return response.data;
    }
};

