import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Header from '../Components/Header/Header'
import Form from '../Components/Form/Form'
import AlbumDisplay from '../Components/AlbumDisplay/AlbumDisplay'
import mockedAlbums from './mockedAlbums.json'
import TrackDisplay from '../Components/TrackDisplay/TrackDisplay'
import mockedTracks from './mockedTracks.json'
import App from '../App'

describe('Header component tests', () => {
   it('renders header image', () => {
      render(<Header />)
      const logo = screen.getByRole('img')
      expect(logo).toHaveAttribute(
         'src',
         'https://hostedimages-cdn.aweber-static.com/MTQ0MjU1NQ==/original/3250f960b0184f7498c125c0748dce50.png'
      )
   })
})

describe('Form component tests', () => {
   const setup = () => {
      const utils = render(<Form />)
      const input = screen.getByRole('textbox')
      return {
         input,
         ...utils,
      }
   }

   it('renders instructional text', () => {
      render(<Form />)
      const instructionalText = screen.getByText(
         'Search for your favorite band and find a list of their most popular albums and tracks below!'
      )
      expect(instructionalText).toBeInTheDocument()
   })

   it('confirms input is rendered', () => {
      render(<Form />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
   })

   it('confirms user can type into input', () => {
      const { input } = setup()
      fireEvent.change(input, { target: { value: 'ACDC' } })
      expect(input.value).toBe('ACDC')
   })

   it('confirms button is disabled when input is empty', () => {
      render(<Form />)
      const input = screen.getByRole('textbox')
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(input).toBeEmptyDOMElement()
   })

   it('confirms empty form submission attempt is not successful', () => {
      render(<App />)
      const { container } = render(<App />)
      userEvent.click(screen.getAllByText('Submit'))
      expect(container).not.toHaveClass('albums')
   })
})

describe('Album and Track component tests', () => {
   it('renders album images and names', () => {
      jest.mock('./mockedAlbums', () => ({ mockedAlbums }))
      render(<AlbumDisplay topAlbums={mockedAlbums} />)
      const albums = screen.getByText(
         'The Universe Smiles Upon You',
         'Texas Sun',
         'Con Todo El Mundo',
         'Mordechai',
         'Texas Moon'
      )
      const albumArtUrls = screen.getAllByRole('img')
      expect(albums).toBeInTheDocument()
      waitFor(() =>
         expect(albumArtUrls).toHaveAttribute(
            'src',
            'https://lastfm.freetls.fastly.net/i/u/174s/846faf6966ea715e2bd8be1afd00a4f3.png',
            'https://lastfm.freetls.fastly.net/i/u/174s/5f8018f1bd85d104d0000947692cdf6c.png',
            'https://lastfm.freetls.fastly.net/i/u/174s/88e31946c4bf03ae1828f991d00cccdd.png',
            'https://lastfm.freetls.fastly.net/i/u/174s/71002e31be1b70d38d56758b4b5e9762.png',
            'https://lastfm.freetls.fastly.net/i/u/174s/1abd41b69b5f00d7030c97ef5d2803fb.png'
         )
      )
   })

   it('renders top track names', () => {
      jest.mock('./mockedTracks', () => ({ mockedTracks }))
      render(<TrackDisplay topTracks={mockedTracks} />)
      const tracks = screen.getByText(
         '#1) Texas Sun',
         '#2) WHITE GLOVES',
         '#3) PEOPLE EVERYWHERE (STILL ALIVE)',
         '#4) Time (You and I)',
         "#5) So We Won't Forget",
         '#6) Maria También',
         '#7) EVAN FINDS THE THIRD ROOM',
         '#8) TWO FISH AND AN ELEPHANT',
         '#9) Pelota',
         '#10) AUGUST 10'
      )
      waitFor(() => expect(tracks).toBeInTheDocument())
   })
})
