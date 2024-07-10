import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames, removeGame } from '../../api/authApi'; // Adjust import paths as per your project structure
import './GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user_info'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await getAllGames();
        setGames(response.data);
      } catch (error) {
       
        alert(`Error fetching games: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
        setError(error);
      }
    };

    fetchGames();
  }, []);

  const handleRemoveGame = async (id) => {
    try {
      await removeGame(id);
      setGames(games.filter(game => game.id !== id));
      alert('Game removed successfully');
    } catch (error) {
      
      alert(`Error removing game: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
  };

  if (error) {
    return <div>Error loading games: {error.message}</div>;
  }

  return (
    <div className='game-list'>
      {games.length > 0 ? (
        <ol>
          {games.map(game => (
            <li key={game.id} className='game-item'>
              <h3>{game.name}</h3>
              <p><strong>Price:</strong> {game.price}</p>
              <p><strong>Category:</strong> {game.category}</p>
              <p><strong>Players:</strong> {game.players}</p>
              <p><strong>Age:</strong> {game.age}</p>
              <p><strong>Learning Outcomes:</strong> {game.lo}</p>
              <p><strong>YouTube Link:</strong> <a href={game.youtubeLink} target="_blank" rel="noopener noreferrer">{game.youtubeLink}</a></p>
              <div className='images'>
                <img src={game.image} alt="main" className='game-image' />
                {game.images.map((img, index) => (
                  <img key={index} src={img} alt={`additional ${index}`} className='game-image' />
                ))}
              </div>
              <button onClick={() => handleRemoveGame(game.id)} className='remove-btn'>Remove</button>
            </li>
          ))}
        </ol>
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
}

export default GameList;
