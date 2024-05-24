import React, { useState } from 'react';

import '../css/FrontPage.css';

const FrontCover = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [frontCover, setFrontCover] = useState('');
  const [frontCoverData, setFrontCoverData] = useState('');

  const handleBookNameChange = (e) => setBookName(e.target.value);
  const handleAuthorNameChange = (e) => setAuthorName(e.target.value);

  const handleFrontCoverChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFrontCoverData(reader.result);
    };
    if (file) {
      setFrontCover(file);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };
  

  return (
    <div className="front-cover">
      <div className="page-container">
        <h2>Front Cover Page</h2>
        <div className="page">
          <textarea className="header-box" value={bookName} onChange={handleBookNameChange}></textarea>
          <textarea className="written-box" value={`Written By ${authorName}`} onChange={handleAuthorNameChange}></textarea>
          <img id="frontCover" src={frontCoverData} width="100%" height="100%" alt="Front Cover" />
        </div>
      </div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
          <label htmlFor="bookName">Name of the Book <span>*</span></label>
          <input type="text" id="bookName" name="book_name" value={bookName} onChange={handleBookNameChange} placeholder='Enter Book Name Here'/>
          <label htmlFor="authorName">Author of the Book <span>*</span></label>
          <input type="text" id="authorName" name="author_name" value={authorName} onChange={handleAuthorNameChange} placeholder='Enter Author Name Here'/>
          <label htmlFor="frontCover">Upload front cover <span>*</span></label>
          <input type="file" id="frontCoverInput" name="front_cover" onChange={handleFrontCoverChange} />
          <input type="text" style={{ display: 'none' }} id="frontencoded" name="front_encoded" value={frontCoverData} readOnly />

          <input type="submit" value="Save Changes" />
        </form>
        <button className="button" id="frontnextstep">Next Steps</button>
      </div>
    </div>
  );
};

export default FrontCover;
