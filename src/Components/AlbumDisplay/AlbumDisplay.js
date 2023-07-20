import React from 'react'

import './AlbumDisplay.css'

const AlbumDisplay = (topAlbums) => {
   return (
      <div className="albums">
         {topAlbums.topAlbums.map((element) => (
            <div key={element.name} className="album">
               <div>
                  <a href={element.url} target="_blank">
                     <img src={element.image[2]['#text']} className="img" alt="Album artwork is not available" />
                  </a>
               </div>
               <div className="albumTitle">{element.name}</div>
            </div>
         ))}
      </div>
   )
}

export default AlbumDisplay
