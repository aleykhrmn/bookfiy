import React from "react";
import photo1 from "../assets/Book.jpeg";
import photo2 from "../assets/Book1.jpeg";
import photo4 from "../assets/Book3.jpeg";

const Anasayfa = () => {
  return (
    <div style={{
        height: '90vh',
        backgroundColor: '#6F7667',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align items to the start
        alignItems: 'start',
        gap: '1rem', // Add some space between the images
        paddingLeft: '1rem', // Add some padding to the left
      }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <img src={photo4} alt="Photo 1" style={{ width: '29%', height: '70%', marginTop: "1rem" }} />
        <img src={photo1} alt="Photo 1" style={{ width: '27%', height: '70%', marginTop: "1rem" }} />
        <img src={photo2} alt="Photo 3" style={{ width: '40%', height: '100%', marginTop: "1rem" }} />
      </div>
      <h3 style={{ alignSelf: 'flex-start', marginLeft: '1rem', marginTop: '-10rem'}}>OKUMAK, İNSANIN DÜŞÜNME BİÇİMİNİ DEĞİŞTİREN BİR YOLCULUKTUR.</h3>
    </div>
  );
};

export default Anasayfa;