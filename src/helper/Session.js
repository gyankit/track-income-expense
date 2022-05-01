export const getSession = () => {
    let user = {};
    user._id = localStorage.getItem('_id');
    user.token = localStorage.getItem('token');
    return user;
}

export const setSession = (user) => {
    localStorage.setItem('_id', user._id);
    localStorage.setItem('token', user.token);
}

export const unSetSession = () => {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
}

export const isSessionSet = () => {
    const user = getSession();
    if (user._id === null || user.token === null) {
        return false;
    }
    return true;
}

