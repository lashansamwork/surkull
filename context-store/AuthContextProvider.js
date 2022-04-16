import 'react-native-gesture-handler';
import React from 'react';
// import RNBootSplash from "react-native-bootsplash";
import { useState, useEffect } from 'react';
const AuthContext = React.createContext();
import auth from '@react-native-firebase/auth';


function AuthContextProvider({ children }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (<AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>);
}

export { AuthContext, AuthContextProvider };
