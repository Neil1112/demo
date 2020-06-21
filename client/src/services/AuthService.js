export default {
    
    // login service
    login : user => {
        return fetch('/user/login', {
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: {username: "", role: ""} }
            }
        })
    },


    // register client service
    registerClient : user => {
        return fetch('/client/register', {
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: {username: "", role: ""} }
            }
        })
    },


    // register counselor service
    registerCounselor : user => {
        return fetch('/admin/registerCounselor', {
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: {username: "", role: ""} }
            }
        })
    },


    // register admin service
    registerAdmin : user => {
        return fetch('/admin/registerAdmin', {
            method : "POST",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: {username: "", role: ""} }
            }
        })
    },


    // logout service
    logout : () => {
        return fetch('/user/logout')
            .then(res => {
                if(res.status !== 401) {
                    return res.json().then(data => data);
                } else {
                    return { isAuthenticated: false, user: {username: "", role: ""}}
                }
            })
    },


    // isAuthenticated service - persist authentication
    isAuthenticated : () => {
        return fetch('/user/authenticated')
            .then(res => {
                if(res.status !== 401) {
                    return res.json().then(data => data);
                } else {
                    return { isAuthenticated: false, user: {username: "", role: ""}}
                }
            })
    }

}