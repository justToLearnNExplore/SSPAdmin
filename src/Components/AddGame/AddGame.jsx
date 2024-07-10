import React, { useState } from 'react';
import './AddGame.css';
import upload from '../../assets/upload.png'; 
import { useNavigate } from 'react-router-dom';
import { uploadImages, addGame } from '../../api/authApi'; // Assuming your API functions are in api.js or similar

const AddGame = () => {
  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [gameCategory, setGameCategory] = useState('');
  const [players, setPlayers] = useState('');
  const [age, setAge] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const user = JSON.parse(localStorage.getItem('user_info'));
  const navigate = useNavigate();

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + additionalImages.length <= 3) {
      setAdditionalImages(prevImages => [...prevImages, ...files]);
    } else {
      alert('You can only upload a maximum of 3 additional images.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add new game');
      navigate('/login');
      return;
    }

    const gameDetails = {
      name: gameName,
      category: gameCategory,
      price: gamePrice,
      players: players,
      age: age,
      lo: learningOutcomes,
      youtubeLink: youtubeLink,
      image: null,
      images: []
    };

    const formData = new FormData();
    formData.append('mainImage', mainImage);
    additionalImages.forEach((image, index) => {
      formData.append('additionalImages', image);
    });

    try {
      const uploadResponse = await uploadImages(formData);

      if (uploadResponse.data.success) {
        gameDetails.image = uploadResponse.data.mainImageURL;
        gameDetails.images = uploadResponse.data.additionalImagesURLs;

        const addGameResponse = await addGame(gameDetails);

        if (addGameResponse.data.success) {
          alert('Game Added Successfully');
        } else {
          alert('Failed to add game');
        }
      } else {
        alert('Failed to upload images');
      }
    } catch (error) {
      
      alert(`An error occurred: ${error.response?.data?.error || error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='add-game'>
      <form onSubmit={handleSubmit}>
        <div className="addgame-itemfield">
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        </div>  

        <div className="addgame-row">
          <div className="addgame-itemfield">
            <p>Price</p>
            <input
              type="text"
              name="price"
              placeholder="price"
              required
              value={gamePrice}
              onChange={(e) => setGamePrice(e.target.value)}
            />
          </div>  

          <div className="addgame-itemfield">
            <p>Category</p>
            <select
              name="category"
              required
              className='addgame-selector'
              value={gameCategory}
              onChange={(e) => setGameCategory(e.target.value)}
            >
              <option value="" disabled>Select category</option>
              <option value="memory">Memory</option>
              <option value="puzzle">Puzzle</option>
              <option value="card">Card</option>
              <option value="board">Board</option>
              <option value="hks">HKS</option>
              <option value="bgt">BGT</option>
            </select>
          </div>
        </div>

        <div className="addgame-row">
          <div className="addgame-itemfield">
            <p>No. of Players</p>
            <input
              type="text"
              name="players"
              placeholder="players"
              required
              value={players}
              onChange={(e) => setPlayers(e.target.value)}
            />
          </div>  

          <div className="addgame-itemfield">
            <p>Age</p>
            <input
              type="text"
              name="age"
              placeholder="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <div className="addgame-itemfield">
          <p>Learning Outcomes</p>
          <input
            type="text"
            name="lo"
            placeholder="learning outcomes"
            required
            value={learningOutcomes}
            onChange={(e) => setLearningOutcomes(e.target.value)}
          />
        </div>  

        <div className="addgame-itemfield">
          <p>YouTube Link</p>
          <input
            type="text"
            name="youtubeLink"
            placeholder="youtube link"
            required
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
        </div>

        <div className="addgame-itemfield">
          <p>Main Image</p>
          <label htmlFor="main-image-input">
            <img src={upload} alt="upload main image" className='addgame-uploader' />
          </label>
          <input
            type="file"
            name="mainImage"
            id="main-image-input"
            hidden
            onChange={handleMainImageChange}
          />
        </div>

        <div className="addgame-itemfield">
          <p>Additional Images (up to 3)</p>
          <label htmlFor="additional-images-input">
            <img src={upload} alt="upload additional images" className='addgame-uploader' />
          </label>
          <input
            type="file"
            name="additionalImages"
            id="additional-images-input"
            multiple
            hidden
            onChange={handleAdditionalImagesChange}
          />
        </div>

        <div className="image-preview">
          {mainImage && (
            <div className="preview-image-container">
              <img src={URL.createObjectURL(mainImage)} alt="main preview" className="preview-image" />
              <p>Main Image</p>
            </div>
          )}
          {additionalImages.map((image, index) => (
            <div key={index} className="preview-image-container">
              <img src={URL.createObjectURL(image)} alt={`preview ${index}`} className="preview-image" />
              <p>Additional Image {index + 1}</p>
            </div>
          ))}
        </div>  

        <button className='addgame-btn'>Add Game</button>
      </form>
    </div>
  );
}

export default AddGame;
