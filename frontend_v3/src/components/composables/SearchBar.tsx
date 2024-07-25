import { SearchBarProps, SearchButtonProps } from "@/constants/ComposableTypes";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets/Icons";
import { Button } from "@/components/ui/button";

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

export const SearchButton: React.FC<SearchButtonProps> = ({ handleSearch, style }) => {
  return (
    <Button
      variant="ghost"
      onClick={handleSearch}
    >
      <SearchIcon className={`w-5 h-5 ${style}`} />
    </Button>
  )
}
