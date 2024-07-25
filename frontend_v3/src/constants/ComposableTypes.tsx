export interface SearchBarProps {
    inputQuery: string;
    setInputQuery: (query: string) => (void);
    placeholder: string;
    style: string;
}