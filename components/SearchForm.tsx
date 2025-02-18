import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

interface ISearchFormProps {
  query?: string;
}

export default function SearchForm({ query }: ISearchFormProps) {
  return (
    <Form action="/" scroll={false} className="search-form" id="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
}
