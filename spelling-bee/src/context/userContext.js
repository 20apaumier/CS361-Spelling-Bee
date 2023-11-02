import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// create context for the user data
export const UserContext = createContext({})

// Provider component to manage and provide user data to descendants
export function UserContextProvider({children}) {
    // state to hold user data
    const [user, setUser] = useState(null);

    // effect hook to fetch the user profile from the server
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
            })
        }
    }, [user]) // should only rerun when the user changed

    // Return the provider component wrapping the children and providing user data and a setUser function
    return (
        <UserContext.Provider value = {{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}