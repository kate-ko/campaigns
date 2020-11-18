const apiUrl: string = 'http://localhost:5000';

class APIclass {
    find() {
        return fetch(`${apiUrl}/campaigns`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .catch(err => {
                console.log('error', err)
            })
    }

    add(data: Object) {
        return fetch(`${apiUrl}/new_campaign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(res => res.data)
            .catch(err => console.log(err))
    }
}

export default new APIclass()