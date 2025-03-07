import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
const [isFilterOpen, setIsFilterOpen] = useState(false);
const [activeFilterCount, setActiveFilterCount] = useState(0);


const [selectedTypes, setSelectedTypes] = useState({
  Album: false,
  EP: false,
  Single: false
});

useEffect(() => {
  const handleClickOutside = () => {
    setIsFilterOpen(false);
  };
  
  document.addEventListener('click', handleClickOutside);
  
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:3001/albums');
        const data = await response.json();
        setAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter(album => {
    if (!selectedTypes.Album && !selectedTypes.EP && !selectedTypes.Single) {
      return true;
    }
    return selectedTypes[album.type];
  });
  
  const handleTypeChange = (type) => {
    setSelectedTypes(prev => {
      const newState = {
        ...prev,
        [type]: !prev[type]
      };
      
      const count = Object.values(newState).filter(Boolean).length;
      setActiveFilterCount(count);
      
      return newState;
    });
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="landing-page">
      <div className="header">
        <h1>Overview</h1>
      </div>

      <div className="filters" bg='red'>
        <div className="search-container">
        <input
         type="text"
         placeholder="Search"
         className="search-input"
         value={searchTerm}
         onChange={handleSearch}
         />
          <button className="search-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="type-filter">
  <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
  <div 
  className={`dropdown-header ${activeFilterCount > 0 ? 'active-filter' : ''}`} 
  onClick={() => setIsFilterOpen(!isFilterOpen)}
>
  Type {activeFilterCount > 0 && `(${activeFilterCount})`}
</div>    {isFilterOpen && <div className="dropdown-menu">
      <label className="filter-option">
        <input 
          type="checkbox" 
          checked={selectedTypes.Album} 
          onChange={() => handleTypeChange('Album')} 
        />
        <span>Album</span>
      </label>
      <label className="filter-option">
        <input 
          type="checkbox" 
          checked={selectedTypes.EP} 
          onChange={() => handleTypeChange('EP')} 
        />
        <span>EP</span>
      </label>
      <label className="filter-option">
        <input 
          type="checkbox" 
          checked={selectedTypes.Single} 
          onChange={() => handleTypeChange('Single')} 
        />
        <span>Single</span>
      </label>
    </div>}
  </div>
</div>
      </div>

      {loading ? (
        <div className="loading">Loading albums...</div>
      ) : (
        <div className="table-container">
          <table className="albums-table">
            <thead>
              <tr>
                <th>Collection Name</th>
                <th>Type</th>
                <th>Song Count</th>
                <th>Duration</th>
                <th>Size</th>
                <th>Released On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredAlbums.map((album) => (
                <tr key={album.id}>
                  <td>
                    <div className="collection-info">
                      <div className="collection-name">{album.name}</div>
                      <div className="artist-name">{album.artist}</div>
                    </div>
                  </td>
                  <td>{album.type}</td>
                  <td>{album.songCount}</td>
                  <td>{album.duration}</td>
                  <td>{album.size}</td>
                  <td>{album.releasedOn}</td>
                  <td>
                    <Link to={`/album/${album.id}`} className="view-details">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LandingPage;