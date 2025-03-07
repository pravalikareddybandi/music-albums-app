import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/AlbumDetailsPage.css';

const AlbumDetailsPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await fetch(`http://localhost:3001/albums/${id}`);
        const albumData = await albumResponse.json();
        
        const songsResponse = await fetch(`http://localhost:3001/albums/${id}/songs`);
        const songsData = await songsResponse.json();
        
        setAlbum(albumData);
        setSongs(songsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album details:', error);
        setLoading(false);
      }
    };
  
    fetchAlbumDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading album details...</div>;
  }

  if (!album) {
    return <div className="error">Album not found</div>;
  }

  return (
    <div className="album-details-page">
      <div className="album-header"     
      >
        <div className="breadcrumb" background-color='#999999'>
          <Link to="/" className="breadcrumb-link">Overview</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="current-page">{album.name}</span>
        </div>
      </div>

      <div className="album-header">
        <h1>{album.name}</h1>
      </div>

      <div className="album-info">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Artist</span>
            <span className="info-value">{album.artist}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type</span>
            <span className="info-value">{album.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Song Count</span>
            <span className="info-value">{album.songCount}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Size</span>
            <span className="info-value">{album.size}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Total Duration</span>
            <span className="info-value">{album.duration}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Released On</span>
            <span className="info-value">{album.releasedOn}</span>
          </div>
        </div>
      </div>

      <div className="songs-section">
        <table className="songs-table">
          <thead>
            <tr>
              <th>Song</th>
              <th>Performers</th>
              <th>Duration</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.performers}</td>
                <td>{song.duration}</td>
                <td>{song.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumDetailsPage;