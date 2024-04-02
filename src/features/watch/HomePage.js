
import React, { useState, useEffect } from 'react';
import './HomePage.css'
const HomePage = () => {
  const [itemData, setItemData] = useState([
    { img: '/img/m1.webp', title: 'Image 1' },
    { img: '/img/m2.webp', title: 'Image 9' },

    { img: '/img/m3.webp', title: 'Image 2' },
    { img: '/img/m4.webp', title: 'Image 3' },
    { img: '/img/m5.webp', title: 'Image 4' },
    { img: '/img/m6.webp', title: 'Image 5' },

    { img: '/img/m7.webp', title: 'Image 2' },
    { img: '/img/m8.webp', title: 'Image 3' },


    { img: '/img/m9.webp', title: 'Image 4' },
    { img: '/img/m10.webp', title: 'Image 5' },
    { img: '/img/m11.webp', title: 'Image 5' },
    { img: '/img/m12.webp', title: 'Image 5' },



    { img: '/img/m13.webp', title: 'Image 4' },
    { img: '/img/m14.webp', title: 'Image 5' },
    { img: '/img/m15.webp', title: 'Image 5' },
    { img: '/img/m1.webp', title: 'Image 1' },

    //
    { img: '/img/m2.webp', title: 'Image 9' },

    { img: '/img/m3.webp', title: 'Image 2' },
    { img: '/img/m4.webp', title: 'Image 3' },
    { img: '/img/m5.webp', title: 'Image 4' },
    { img: '/img/m6.webp', title: 'Image 5' },

    { img: '/img/m7.webp', title: 'Image 2' },
    { img: '/img/m8.webp', title: 'Image 3' },


    { img: '/img/m9.webp', title: 'Image 4' },
    { img: '/img/m10.webp', title: 'Image 5' },
    { img: '/img/m11.webp', title: 'Image 5' },
    { img: '/img/m12.webp', title: 'Image 5' },



    { img: '/img/m13.webp', title: 'Image 4' },
    { img: '/img/m14.webp', title: 'Image 5' },
    { img: '/img/m15.webp', title: 'Image 5' },
    { img: '/img/m2.webp', title: 'Image 9' },

    { img: '/img/m3.webp', title: 'Image 2' },
    { img: '/img/m4.webp', title: 'Image 3' },
    { img: '/img/m5.webp', title: 'Image 4' },
    { img: '/img/m6.webp', title: 'Image 5' },

    { img: '/img/m7.webp', title: 'Image 2' },
    { img: '/img/m8.webp', title: 'Image 3' },


    { img: '/img/m9.webp', title: 'Image 4' },
    { img: '/img/m10.webp', title: 'Image 5' },
    { img: '/img/m11.webp', title: 'Image 5' },

    // Add paths for more images
  ]);
  const [currentImages, setCurrentImages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  let numberOfImages = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      let newImages = [...itemData];

      // Shuffle the images randomly
      for (let i = newImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newImages[i], newImages[j]] = [newImages[j], newImages[i]];
      }

      setCurrentImages(newImages);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Blur effect for 1.5 seconds

    }, 3000); // Change images every 3 seconds

    return () => clearInterval(interval);
  }, [itemData]);

  // Inside the return statement of ImageList component
  return (<>
    <div className='head'>
      <div ><img src='/img/m17.webp' width='100%' /></div>
      <div  ><img src='/img/m16.webp' width='100%' /></div>
    </div>
    <div style={{
      // background: "rgba(220, 200, 220, 0.5)", 
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100vw',
      overflowX: 'hidden',
    }}>
      {currentImages.map((item, index) => (
        <div key={index} style={{
          width: `${100 / numberOfImages}vw`,
          textAlign: 'center',
          filter: isTransitioning ? 'blur(3px)' : 'none',
          flexShrink: 0, // Prevent flex items from shrinking beyond their content
        }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ maxWidth: '100%', height: 'auto', transition: 'filter 0.5s' }}
          />
        </div>
      ))}
    </div></>
  );
}

export default HomePage;