function SearchButton({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-transparent text-white flex items-center justify-center rounded-3xl cursor-pointer hover:brightness-95 duration-200 ease-in-out transition-all"
    >
      <p className="flex text-base px-6 py-1">Buscar</p>
    </div>
  );
}

export default SearchButton;