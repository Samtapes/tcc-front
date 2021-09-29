import React, {createContext, useState} from 'react';
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
  user: User,
  signIn({email, password}: Login): void
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);

  function signIn({email, password} : Login): void {
    api.post('/users', {email, password}).then((response) => {
      setUser(response.data)
    }).catch((error) => {
      alert(error.response.data.message)
    });
  }

  function signOut(): void {
    setUser(() => undefined)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user: {id: '', image_url: '', name: '', email: '', password: '', is_medic: false}, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;