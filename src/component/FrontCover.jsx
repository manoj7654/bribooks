import React, { useState,useEffect } from 'react';


const FrontCover = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
  

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid orangeRed", padding: "5px" }}>
            <div style={{ width: "90%",height:"100px", display: "flex",border:"1px solid green", alignItems: "center", justifyContent: "space-around", gap: "3px" }}>
                    <input
                        type="text"
                        placeholder="Write Your Book Title"
                        style={{ padding: "12px 40px", borderRadius: "10px" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                   
                    <input
                        type="text"
                        placeholder="Writer name"
                        style={{ padding: "12px 40px", borderRadius: "10px" }}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                       <input
                        type="file"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80vh',
                width: '80vh',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                marginTop: "10px",
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                margin: 'auto',
                border: '30px solid #c2e7ff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}>
                <h1 style={{ fontSize: '4.5em', textAlign: "center" }}>{title}</h1>
                <h3 style={{ marginLeft: "6rem" }}>Written By: {author}</h3>
            </div>
        </>
    );
}

export default FrontCover;
