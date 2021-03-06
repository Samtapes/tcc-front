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

interface Medic {
  id: string,
  image_url: string,
  name: string,
  specialization: string,
  price: number,
  description: string,
  additional_info: string,
  start_of_work: string,
  end_of_work: string
}

interface IDate {
  day: number,
  month: number,
  year: number,
}

interface Consult {
  date?: IDate,
  scheduled_time?: string,
  additional_info: string | undefined
}

interface IMeet {
  id: string,
  confirmed: boolean,
  specialization: string, 
  image_url: string,
  name: string,
  additional_info: string,
  date: string,
  scheduled_time: string,
  started_at: string,
  finished_at: string,
}

interface AuthContextData {
  signed: boolean,
  user: User | null | undefined,
  signIn({email, password}: Login): Promise<boolean>,
  signOut(): void,
  consult: {medic: Medic, consult: Consult} | undefined | null,
  newConsult(medic?: Medic, consult?: Consult): void,
  removeConsult(): void

  consultMeet: IMeet | undefined | null,
  newConsultMeet(meet?: IMeet): void,
  removeConsultMeet(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [consult, setConsult] = useState<{medic: Medic, consult: Consult} | undefined | null>(null);
  const [consultMeet, setConsultMeet] = useState<IMeet | undefined | null>(null);

  useEffect(() => {
    const user: any = localStorage.getItem('@conncare/user')

    if (user !== null){
      signIn({email: JSON.parse(user).email, password:JSON.parse(user).password})
    }
  }, [])

  async function signIn({email, password} : Login): Promise<boolean> {
    try {
      const login = await api.post('/users', {email, password});
      setUser(() => login.data);
      localStorage.setItem('@conncare/user', JSON.stringify(login.data))
      return true

    } catch(error: any) {
      alert(error.response.data.message);
      return false
    }

  }

  function signOut(): void {
    localStorage.removeItem('@conncare/user')
    setUser(() => undefined)
  }

  function newConsult(medic: Medic, consult: Consult) {
    setConsult({medic, consult})
  }

  function removeConsult(){
    setConsult(() => undefined)
  }


  function newConsultMeet(meet: IMeet) {
    setConsultMeet(meet)
  }

  function removeConsultMeet(){
    setConsultMeet(() => undefined)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, consult, newConsult, removeConsult, consultMeet, newConsultMeet, removeConsultMeet}}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;