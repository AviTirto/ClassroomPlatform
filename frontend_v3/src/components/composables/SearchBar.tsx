import { SearchBarProps } from "@/constants/ComposableTypes";
import { Input } from "../ui/input";

export const SearchBar: React.FC<SearchBarProps> = ({ inputQuery, setInputQuery, placeholder, style }) => {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      className={`flex-1 focus-visible:ring-offset-0 focus-visible:ring-0 hover:bg-gray-50 duration-500 ${style}`}
      value={inputQuery}
      onChange={e => setInputQuery(e.target.value)}
    />
  )
}
