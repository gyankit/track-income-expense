const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

module.exports = {
    singleResponse: (res) => {
        let date = new Date(res.createdAt);
        const response = {
            ...res._doc,
            _id: res.id,
            date: `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`,
            time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
        // console.log(response);
        return response;
    },

    multiResponse: (resArray) => {
        const response = resArray.map(res => {
            let date = new Date(res.createdAt);
            return {
                ...res._doc,
                _id: res.id,
                date: `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`,
                time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
        });
        // console.log(response);
        return response;
    }
}