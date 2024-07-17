import { NBCreatedAtContextType, NBNewCreatedAtContextType, NBNewUpdatedAtContextType, NBUpdatedAtContextType } from '@/constants/NBContextTypes';
import { NBTimestampProviderProps } from '@/constants/NBProviderProps';
import { useContext, useState, createContext } from 'react'

const CreatedAtContext = createContext<NBCreatedAtContextType | undefined>(undefined);
const NewCreatedAtContext = createContext<NBNewCreatedAtContextType | undefined>(undefined);
const UpdatedAtContext = createContext<NBUpdatedAtContextType | undefined>(undefined);
const NewUpdatedAtContext = createContext<NBNewUpdatedAtContextType | undefined>(undefined);

export const useCreatedAt = () => {
    return useContext(CreatedAtContext)
}

export const useUpdatedAt = () => {
    return useContext(UpdatedAtContext)
}

export const useNewCreatedAt = () => {
    return useContext(NewCreatedAtContext)
}

export const useNewUpdatedAt = () => {
    return useContext(NewUpdatedAtContext)
}

export function NBTimestampProvider({ children }: NBTimestampProviderProps) {
    const [createdAt, setCreatedAt] = useState('Jul-12, 2024')
    const [updatedAt, setUpdatedAt] = useState('')

    const updateCreatedAt = () => {
        setCreatedAt(new Date().toISOString())
    }

    const updateUpdatedAt = () => {
        setUpdatedAt(new Date().toISOString())
    }

    return (
        <CreatedAtContext.Provider value={ createdAt }>
            <UpdatedAtContext.Provider value={ updatedAt }>
                <NewCreatedAtContext.Provider value={ updateCreatedAt }>
                    <NewUpdatedAtContext.Provider value = {updateUpdatedAt}>
                        { children }
                    </NewUpdatedAtContext.Provider>
                </NewCreatedAtContext.Provider>
            </UpdatedAtContext.Provider>
        </CreatedAtContext.Provider>
    )
}
