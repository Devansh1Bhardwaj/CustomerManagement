import { createContext, useContext, useEffect, useState } from 'react'
import mockCustomers from '../data/mockCustomers.js'

const STORAGE_KEY = 'cms_customers'
const CustomerContext = createContext(null)

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : mockCustomers
  })

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
  }, [customers])

  function addCustomer(data) {
    const newCustomer = { ...data, id: Date.now() }
    setCustomers(prev => [newCustomer, ...prev])
  }

  function updateCustomer(id, data) {
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)))
  }

  function deleteCustomer(id) {
    setCustomers(prev => prev.filter(c => c.id !== id))
  }

  function resetToSampleData() {
    setCustomers(mockCustomers)
  }

  return (
    <CustomerContext.Provider
      value={{ customers, addCustomer, updateCustomer, deleteCustomer, resetToSampleData }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomers() {
  return useContext(CustomerContext)
}
