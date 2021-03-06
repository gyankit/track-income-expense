const API = async (request) => {
    const url = process.env.NODE_ENV === 'production' ? '/api/graphql' : 'http://localhost:8000/api/graphql';
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
        },
        body: JSON.stringify(request)
    }
    if (localStorage.getItem('token')) {
        options.headers = {
            ...options.headers,
            "Authorization": localStorage.getItem('token')
        }
    }
    try {
        const res = await fetch(url, options);
        const rsp = await res.json();
        return rsp;
    } catch (error) {
        return error;
    }
}

export default API;