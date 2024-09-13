export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center my-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="border border-gray-300 rounded-l px-4 py-2 w-full"
      />
    </div>
  );
}
