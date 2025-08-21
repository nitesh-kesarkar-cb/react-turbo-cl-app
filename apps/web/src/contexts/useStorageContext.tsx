import {
    createContext,
    useContext,
    type ReactNode,
} from 'react'
import { decryptData, encryptData } from '../utils/crypto'

type StorageContextType = {
    getItem<T>(key: string): T | null
    setItem<T>(key: string, value: T): void
    removeItem(key: string): void
}

const StorageContext = createContext<StorageContextType>({
    getItem: () => null,
    setItem: () => { },
    removeItem: () => { },
})

export const StorageProvider = ({ children }: { children: ReactNode }) => {
    const getItem = <T,>(key: string): T | null => {
        const cipher = localStorage.getItem(key)
        const decrypted = decryptData<string | null>(cipher)
        if (decrypted === null) return null
        try {
            return JSON.parse(decrypted) as T
        } catch {
            // If not JSON, return as is
            return decrypted as unknown as T
        }
    }

    const setItem = <T,>(key: string, value: T) => {
        let toStore: string
        if (typeof value === 'object' && value !== null) {
            toStore = JSON.stringify(value)
        } else {
            toStore = String(value)
        }
        const cipher = encryptData(toStore)
        localStorage.setItem(key, cipher)
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key)
    }

    return (
        <StorageContext.Provider value={{ getItem, setItem, removeItem }}>
            {children}
        </StorageContext.Provider>
    )
}

export const getLocastorageItem = <T,>(key: string): T | null => {
    const cipher = localStorage.getItem(key)
    const decrypted = decryptData<string | null>(cipher)
    if (decrypted === null) return null
    try {
        return JSON.parse(decrypted) as T
    } catch {
        // If not JSON, return as is
        return decrypted as unknown as T
    }
}

export const setLocastorageItem = <T,>(key: string, value: T) => {
    let toStore: string
    if (typeof value === 'object' && value !== null) {
        toStore = JSON.stringify(value)
    } else {
        toStore = String(value)
    }
    const cipher = encryptData(toStore)
    localStorage.setItem(key, cipher)
}

export const removeLocalStorageItem = (key: string) => {
    localStorage.removeItem(key)
}


export function useStorage() {
    return useContext(StorageContext)
}
