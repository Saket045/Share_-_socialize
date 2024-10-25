/* eslint-disable react/prop-types */
import { createContext , useContext ,useState } from "react";

export const AuthContext = createContext();

export  const useAuth =()=>{
    return useContext(AuthContext)
}

export const AuthContextProvider =({children})=>{
    const [authUser , setAuthUser] = useState(JSON.parse(localStorage.getItem('chatapp')) || null);

    return <AuthContext.Provider value={{authUser ,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}
//authcontext creates the context.

//useAuth easy way to consume the context and can be called and im ported anywhere and in any component so
//that the context made above can be used.

//AuthContextProvider is the provider that wraps the app and makes the context available to all components
//residing inside the app that it has wrapped.