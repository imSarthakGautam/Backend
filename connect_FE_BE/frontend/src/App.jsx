import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {
  const [players, setPlayers] = useState([])

  //application load hune bittikai, data lyauna
  useEffect(() => {

    //--localhost:3000 ma get request pathaune
    //axios.get('http://localhost:3000/api/players')
    axios.get('/api/players')
    .then((response)=>{
      console.log("response aayo",response.data)
      setPlayers(response.data)
      // Axios will handle the conversion from the JSON string to a JavaScript object for you
    })
    .catch((error)=>{
      console.log('error in axios.catch()',error)
    })
    
  },[])


  return (
  <div>
   <div className="container">Player Details</div>
   
   <p>players: {players.length} </p>

   {
    players.map((player)=>(
      <div key={player.id}>
        <h3 className="name">{player.name}</h3>
        <p>{player.club}</p>

      </div>
    ))
   }
   </div>
  )
}

export default App
