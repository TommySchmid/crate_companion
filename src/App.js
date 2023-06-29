import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '../src/Components/Header/Header'
import Form from '../src/Components/Form/Form'
import AlbumDisplay from './Components/AlbumDisplay/AlbumDisplay'
import TrackDisplay from './Components/TrackDisplay/TrackDisplay'
import './App.css'

function App() {
   const [displayAlbums, setDisplayAlbums] = useState(false)
   const [displayTracks, setDisplayTracks] = useState(false)
   const [topAlbums, setTopAlbums] = useState([''])
   const [topTracks, setTopTracks] = useState([''])

   const artistSearch = (artist) => {
      axios
         .get(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=ec2f1febe013b411a18b994f9cdb9319&format=json`
         )
         .then((response) => {
            setTopAlbums(response.data.topalbums.album.slice(0, 5))
            setDisplayAlbums(true)
         })
         .catch(() => {
            alert('We could not complete your search')
         })
      axios
         .get(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=ec2f1febe013b411a18b994f9cdb9319&format=json`
         )
         .then((response) => {
            setTopTracks(response.data.toptracks.track.slice(0, 10))
            setDisplayTracks(true)
         })
         .catch((error) => console.log('error', error))
   }

   return (
      <div className="app">
         <Header />
         <Form search={(artist) => artistSearch(artist)} />
         <div className="albumAndTrackContainer">
            {displayAlbums === true ? <AlbumDisplay topAlbums={topAlbums} /> : null}
            {displayTracks === true ? <TrackDisplay topTracks={topTracks} /> : null}
         </div>
      </div>
   )
}

export default App
