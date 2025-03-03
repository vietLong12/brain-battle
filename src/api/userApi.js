import ApiClient from "./config"

export const createUser = async ({ name, file }) => {
    console.log('file: ', file);
    const formData = new FormData();
    formData.append('name', name)
    formData.append('avatar', file)
    try {
        const res = await ApiClient.post('/user/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('res: ', res);
        return res
    } catch (error) {
        console.log('error: ', error);
    }
}