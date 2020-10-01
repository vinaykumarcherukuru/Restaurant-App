import axios from 'axios';

function CloudinaryAPI() {
    const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWUyZThmZTA3MjFmODFhNDdjOTA0YiIsImlhdCI6MTYwMDY3MTU0NywiZXhwIjoxNjAwNzU3OTQ3fQ.DOLA_bFSsOWs91GenlwlbKu-UxVkiHAO2LmrVNp6bbw'
    const config = {
        headers: {
            'content-type': 'application/json',
            'Authorization': `${access_token}`
        }
    }

    const uploadImage = async (file) => {
        let response = await axios.post("/api/upload", file, config)
        return response.data; 
    }

    const destroyImage = async (public_id) => {
        const response = await axios.delete("/api/upload/", public_id, config);
        return response.data;
    }

    return {
        upload: uploadImage,
        destroy: destroyImage
    }
}

export default CloudinaryAPI
