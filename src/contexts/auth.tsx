import React, {createContext, useEffect, useState} from 'react';
import api from '../services/api'

interface User {
  id?: string,
  image_url?: string,
  name?: string,
  email?: string,
  password?: string,
  is_medic: boolean
}

interface Login {
  email: string,
  password: string,
}

interface AuthContextData {
  signed: boolean,
  user: User | null | undefined,
  signIn({email, password}: Login): Promise<boolean>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    const user: any = localStorage.getItem('@conncare/user')

    if (user !== null){
      setUser(() => user)
    }
  }, [])

  async function signIn({email, password} : Login): Promise<boolean> {

    try {
      const login = await api.post('/users', {email, password});
      setUser(() => login.data);
      localStorage.setItem('@conncare/user', login.data)
      return true

    } catch(error: any) {
      alert(error.response.data.message);
      return false
    }

  }

  function signOut(): void {
    setUser(() => undefined)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;