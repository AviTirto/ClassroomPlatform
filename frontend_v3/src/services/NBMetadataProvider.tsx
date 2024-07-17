import { NBDescriptionContextType, NBTitleContextType, NBUpdateDescriptionContextType, NBUpdateTitleContextType } from '@/constants/NBContextTypes';
import { NBMetadataProviderProps } from '@/constants/NBProviderProps';
import { useContext, useState, createContext } from 'react'

const NBTitleContext = createContext<NBTitleContextType | undefined>(undefined);
const NBUpdateTitleContext = createContext<NBUpdateTitleContextType | undefined>(undefined);
const NBDescriptionContext = createContext<NBDescriptionContextType | undefined>(undefined);
const NBUpdateDescriptionContext = createContext<NBUpdateDescriptionContextType | undefined>(undefined);

export const useTitle = () => {
    return useContext(NBTitleContext)
}

export const useUpdateTitle = () => {
    return useContext(NBUpdateTitleContext)
}

export const useDescription = () => {
    return useContext(NBDescriptionContext)
}

export const useUpdateDescription = () => {
    return useContext(NBUpdateDescriptionContext)
}

export function NBMetadataProvider({ children }: NBMetadataProviderProps) {
    // const [notebookId, setNotebookId] = useState(12345)
    const [title, setTitle] = useState('My Notebook')
    const [description, setDescription] = useState('This study notebook is designed for students and professionals who want to deepen their understanding of machine learning algorithms. The notebook is structured to cover theoretical foundations, practical applications, and hands-on coding exercises. It aims to provide a comprehensive learning experience, blending concepts with practice.')

    const updateTitle = (newTitle: string) => {
        setTitle(newTitle)
    }

    const updateDescription = (newDescription: string) => {
        setDescription(newDescription)
    }

    return (
        <NBTitleContext.Provider value={title}>
            <NBDescriptionContext.Provider value={description}>
                <NBUpdateTitleContext.Provider value={updateTitle}>
                    <NBUpdateDescriptionContext.Provider value={updateDescription}>
                        {children}
                    </NBUpdateDescriptionContext.Provider>
                </NBUpdateTitleContext.Provider>
            </NBDescriptionContext.Provider>
        </NBTitleContext.Provider>
    )
}
