import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page as PDFPage, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import './App.css';
import  BackCover  from './component/BackCover';
import  FrontCover  from './component/FrontCover';
import  Pages  from './component/Pages';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
});

const PDFDocument = ({ frontCoverData, pagesData, backCoverData }) => (
  <Document>
    <PDFPage size="A4" style={styles.page}>
      <View style={styles.section}>
        {frontCoverData.selecImage && <Image src={frontCoverData.selectImage} style={styles.selectImage} />}
        <Text style={styles.text}>{frontCoverData.title}</Text>
        <Text style={styles.text}>Written by: {frontCoverData.author}</Text>
      </View>
    </PDFPage>
    {pagesData.map((page, index) => (
      <PDFPage key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          {page.image && <Image src={page.image} style={styles.image} />}
          <Text style={styles.text}>{page.story}</Text>
        </View>
      </PDFPage>
    ))}
    <PDFPage size="A4" style={styles.page}>
      <View style={styles.section}>
        {backCoverData.image && <Image src={backCoverData.image} style={styles.image} />}
        <Text style={styles.text}>Written by: {backCoverData.author}</Text>
        <Text style={styles.text}>{backCoverData.message}</Text>
      </View>
    </PDFPage>
  </Document>
);


function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [frontCoverData, setFrontCoverData] = useState({ title: '', author: '', image: '' });
  const [pagesData, setPagesData] = useState(
    Array.from({ length: 1 }, () => ({
      story: '',
      image: '',
    }))
  );
  const [backCoverData, setBackCoverData] = useState({ author: '', message: '', image: '' });

  const handleFinish = () => {
    setIsFormSubmitted(true);
  };

  return (
    <>
      {!isFormSubmitted ? (
        <>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "Grey" }}>Front Page</h1>
          <br />
          <div id="front-page">
            <FrontCover setFrontCoverData={setFrontCoverData} />
          </div>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "yellowgreen" }}>Content Pages</h1>
          <br />
          <div className="content-page">
            <Pages pagesData={pagesData} setPagesData={setPagesData} />
          </div>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "goldenrod" }}>Back Page</h1>
          <br /><br /><br />
          <div id="back-page">
            <BackCover setBackCoverData={setBackCoverData} />
          </div>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <button onClick={handleFinish} style={{ padding: '10px 20px', margin: '10px' }}>
              Finish and Preview PDF
            </button>
          </div>
        </>
      ) : (
        <>
          <PDFViewer style={{ width: '100%', height: '500px' }}>
            <PDFDocument frontCoverData={frontCoverData} pagesData={pagesData} backCoverData={backCoverData} />
          </PDFViewer>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <PDFDownloadLink
              document={<PDFDocument frontCoverData={frontCoverData} pagesData={pagesData} backCoverData={backCoverData} />}
              fileName="book.pdf"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
}

export default App;
