"use client"

import { TCartCollection, TDataCart } from '@/data/type';
import React, { createContext, useState } from 'react'

type TActiveContextProviderProps = {
    children: React.ReactNode
}

type TActiveContext = {
  dataCartCollection: TCartCollection,
  setDataCartCollection: React.Dispatch<React.SetStateAction<TCartCollection>>,
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ActiveContext = createContext<TActiveContext| null>(null);

const ActiveContextProvider: React.FC<TActiveContextProviderProps> = ({children}) => {
  const [dataCartCollection, setDataCartCollection] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <ActiveContext.Provider value={{
      dataCartCollection,
      setDataCartCollection,
      isOpen,
      setIsOpen
    }}>
      {children}
    </ActiveContext.Provider>
  )
}

export default ActiveContextProvider