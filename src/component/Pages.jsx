import React, { useState, useEffect } from "react";

const Page = ({
  pageIndex,
  story,
  pageImage,
  fontFamily,
  fontColor,
  position,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: position === "left" ? "flex-start" : "flex-end",
      justifyContent: "space-between",
      height: "80vh",
      width: "160vh",
      backgroundImage: `url(${pageImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "20px",
      color: fontColor,
      fontWeight: "600",
      margin: "auto",
      fontFamily: fontFamily,
      border: "20px solid #c2e7ff",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      boxSizing: "border-box",
    }}
  >
    <p
      style={{
        fontSize: "1.5em",
        fontFamily: fontFamily,
        maxWidth: "45%",
        margin: "20px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      {story}
    </p>
  </div>
);

const Pages = ({ pagesData, setPagesData }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleStoryChange = (pageIndex, value) => {
    const updatedPages = [...pagesData];
    updatedPages[pageIndex].story = value;
    setPagesData(updatedPages);
  };

  const handlePageImageUpload = (pageIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPages = [...pagesData];
        updatedPages[pageIndex].image = reader.result;
        setPagesData(updatedPages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPage = () => {
    setPagesData([
      ...pagesData,
      {
        story: "",
        image: "",
        fontColor: "#000000",
        position: "left",
      },
    ]);
    setCurrentPage(pagesData.length); // Go to the newly added page
  };

  const removePage = () => {
    if (pagesData.length > 1) {
      const updatedPages = pagesData.filter(
        (_, index) => index !== currentPage
      );
      setPagesData(updatedPages);
      setCurrentPage(currentPage > 0 ? currentPage - 1 : 0);
    } else {
      alert("You must have at least one page.");
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("You have reached the last page.");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("You are on the first page.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "2px solid orangeRed",
          padding: "5px",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Write Your Story Part"
            style={{ padding: "12px 40px", borderRadius: "10px" }}
            value={pagesData[currentPage].story}
            onChange={(e) => handleStoryChange(currentPage, e.target.value)}
          />

          <input
            id={`file-pages-${currentPage}`}
            type="file"
            onChange={(e) => handlePageImageUpload(currentPage, e)}
          />
        </div>
      </div>
      <div
        id={`content-${currentPage}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Page
          pageIndex={currentPage}
          story={pagesData[currentPage].story}
          pageImage={pagesData[currentPage].image}
          fontFamily={pagesData[currentPage].fontFamily}
          fontColor={pagesData[currentPage].fontColor}
          position={pagesData[currentPage].position}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={handlePreviousPage}
          style={{ margin: "20px", padding: "10px 20px" }}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          style={{ margin: "20px", padding: "10px 20px" }}
        >
          Next Page
        </button>
        <button
          onClick={addPage}
          style={{ margin: "20px", padding: "10px 20px" }}
        >
          Add Page
        </button>
        <button
          onClick={removePage}
          style={{ margin: "20px", padding: "10px 20px" }}
        >
          Remove Page
        </button>
      </div>
    </>
  );
};

export default Pages;
