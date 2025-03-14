
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Search({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className,
  ...props 
}: SearchProps) {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pl-10 ${className}`}
        {...props}
      />
    </div>
  );
}
