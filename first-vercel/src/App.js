import React, { useState, useEffect } from "react";
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { SWAPI_URL } from './constants/constants.js'
import Character from './components/Character.js'
import Details from './components/Details.js'



const App = () => {

  /* Create App state  /////////////////////////////////////////////////////////
  *  @param characters {Object} characters : All chars fetched from Star Wars / MSW API info
  *  @param currentCharacter {string} : selected Character by user 
  *  @param errorAPICall {string} : Star Wars / MSW API call error 
  */ //////////////////////////////////////////////////////////////////////////
  const [characters, setCharacters] = useState(null)
  const [errorAPICall, setErrorAPICall] = useState({ isError: false, message: 'URL error' })
  const [detailInfo, setDetailInfo] = useState(null)


  /* Call external Data from Star Wars / MSW API and update state /////////////////
  *  update characters , error states
  */////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    axios.get(`${SWAPI_URL}`)
      .then(res => {
        setCharacters(res.data);
      })
      .catch(err => {
        setErrorAPICall({ isError: true, message: err.message })
        console.warn('APP :: ERROR CALLING SWAPI API : ', err.message)
      }) // todo : adding nasa's error message.
  }, [])

  /* set states on currentCharacter by user interaction.
  *
  */

  const openDetails = props => {
    const { detailInfo, id } = props
    // console.log('openDetails id : ', id)
    // console.log('detailInfo : ', detailInfo.name)
    setDetailInfo(detailInfo)
  }

  const closeDetails = () => {
    setDetailInfo(null)
  }



  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  if (errorAPICall.isError) {
    return <h2>sorry : {errorAPICall.message}</h2>  /* display if error loading data  */

  } else if (characters) {
    return (
      <div className={`app background`}>
        <div className={`box-characters`}>

          {errorAPICall.isError && <h2>sorry : {errorAPICall.message}</h2>  /* display if error loading data  */}

          {characters && <h1>Characters</h1>}

          {characters ? characters.map(actor => {
            // console.log('actor', actor)
            return (<Character info={actor} key={uuid()} openDetails={openDetails} />)
          }) : <h3>loading characters</h3>
          }

          {detailInfo && <Details detailInfo={detailInfo} close={closeDetails} />}

        </div>
      </div>
    )

  } else {
    return <h2>loading App ... </h2>
  }
}

export default App;
