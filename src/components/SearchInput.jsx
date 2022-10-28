import React from 'react'

const SearchInput = ({setPokeSearch, setOptionType}) => {

  const handleSubmit = e => {
    e.preventDefault()
    setPokeSearch(e.target.searchText.value.trim().toLowerCase())
    setOptionType('All')
    e.target.searchText.value = ""
  }

  return (
    <form onSubmit={handleSubmit} className="btn__card">
      <input id="searchText" type="text" className="input__card" />
      <button className="search__card">Search</button>
    </form>
  );
};

export default SearchInput;
