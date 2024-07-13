import { useContext, useState, createContext } from 'react'

const NBTitleContext = createContext();
const NBUpdateTitleContext = createContext();
const NBDescriptionContext = createContext();
const NBUpdateDescriptionContext = createContext();

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

export function NBMetadataProvider({ children }) {
    const [notebookId, setNotebookId] = useState(12345)
    const [title, setTitle] = useState('My Notebook')
    const [description, setDescription] = useState('This study notebook is designed for students and professionals who want to deepen their understanding of machine learning algorithms. The notebook is structured to cover theoretical foundations, practical applications, and hands-on coding exercises. It aims to provide a comprehensive learning experience, blending concepts with practice.')

    const updateTitle = (newTitle) => {
        setTitle(newTitle)
    }

    const updateDescription = (newDescription) => {
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
