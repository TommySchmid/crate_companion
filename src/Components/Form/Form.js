import React, { useState } from 'react'

import './Form.css'

const Form = ({ search }) => {
   const [btnIsDisabled, setBtnIsDisabled] = useState(true)
   const [searchValue, setSearchValue] = useState()

   const submitSearch = (event) => {
      event.preventDefault()
      search(searchValue)
   }

   return (
      <div className="form">
         <div>Search for your favorite band and find a list of their most popular albums and tracks below!</div>
         <form onSubmit={(event) => submitSearch(event)}>
            <input
               type="text"
               onKeyUp={() => setBtnIsDisabled(false)}
               onChange={(event) => setSearchValue(event.target.value)}
            />
            <br />
            <button className="button-74" disabled={btnIsDisabled || searchValue === ''}>
               Submit
            </button>
         </form>
      </div>
   )
}

export default Form
