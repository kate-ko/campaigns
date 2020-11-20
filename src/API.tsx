const apiUrl: string = 'http://localhost:5000';

class APIclass {
    find() {
        return fetch(`${apiUrl}/campaigns`, {
            method: 'GET',
        })
        .then((response) => response.json()).then(response => response.sort((a: any, b: any) => a.id < b.id ? 1 : -1))
    }

    add(data: Object) {
        return fetch(`${apiUrl}/new_campaign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response: any) => {
                return response.json().then((response: any) => {
                    if (!response.ok) return Promise.reject(response.error)
                    else return Promise.resolve()
                })
            })
    }
}

export default new APIclass()