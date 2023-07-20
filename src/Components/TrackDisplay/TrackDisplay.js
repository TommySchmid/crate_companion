import React from 'react'

import './TrackDisplay.css'

const TrackDisplay = (topTracks) => {
   let trackList1 = topTracks.topTracks.slice(0, 5)
   let trackList2 = topTracks.topTracks.slice(5, 10)

   return (
      <div className="tracksContainer">
         <div className="tracksHeader">Keep an eye out for these top tracks!</div>
         <div className="trackListContainer">
            <div>
               {trackList1.map((topTracks, index) => (
                  <div className="topTrackList" key={topTracks.name}>
                     {'#' + (index + 1 + ')') + ' '}
                     {topTracks.name}
                  </div>
               ))}
            </div>
            <div>
               {trackList2.map((topTracks, index) => (
                  <div className="topTrackList" key={topTracks.name}>
                     {'#' + (index + 6 + ')') + ' '}
                     {topTracks.name}
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default TrackDisplay
