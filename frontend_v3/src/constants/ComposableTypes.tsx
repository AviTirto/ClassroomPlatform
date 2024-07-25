export interface SearchBarProps {
    inputQuery: string;
    setInputQuery: (query: string) => (void);
    placeholder: string;
    style: string;
}

export interface SearchButtonProps {
    handleSearch: () => (void);
    style: string;
}