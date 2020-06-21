import React, {useState, useEffect, createContext} from 'react';

// local imports
import ClientService from '../services/ClientService';

// export AllocatedCounselorContext
export const AllocatedCounselorContext = createContext();


// AllocatedCounselorContext Provider
export default ({ children }) => {

    const [isCounselorAllocated, setIsCounselorAllocated] = useState(false);
    const [allocatedCounselor, setAllocatedCounselor] = useState("");

    // Syncing in with the server
    useEffect(() => {
        ClientService.isCounselorAllocated()
            .then(data => {
                if(data.isCounselorAllocated) {
                    setIsCounselorAllocated(true);
                    setAllocatedCounselor(data.client.allocatedCounselor.counselor);
                }
            })
    }, [])

    return (
        <div>

            <AllocatedCounselorContext.Provider value={isCounselorAllocated, setIsCounselorAllocated, allocatedCounselor, setAllocatedCounselor}>
                { children }
            </AllocatedCounselorContext.Provider>

        </div>
    )
}