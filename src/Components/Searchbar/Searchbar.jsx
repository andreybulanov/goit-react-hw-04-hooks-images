export const Searchbar = ({ onSubmit }) => {
    const handleSearch = (e) => {
        e.preventDefault()
        onSubmit(e.target.elements.searchImage.value.toLowerCase())
    }

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSearch}>
              <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
              </button>

              <input
                className="SearchForm-input"
                type="text"
                name='searchImage'
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
    )
};




