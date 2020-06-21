export default {

    // is counselor allocated service. Persisting state of whether a counselor is allocated or not
    isCounselorAllocated : client => {
        return fetch('/client/isCounselorAllocated')
            .then(res => {
                if(res.status === 200) {
                    // check if counselor is allocated
                    res.json().then(client => {
                        if(client.allocatedCounselor.isTrue) {
                            return { isCounselorAllocated: true, client}
                        }
                    })
                } else {
                    return { isCounselorAllocated: false}
                }
            })
    }

}