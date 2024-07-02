import React, { useState } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js'
import Info from './Components/Info/Info.js'
import Input from './Components/Input/Input.js'
import Facerecognition from './Components/Face-recognition/Facerecognition.js'
import Signin from './Components/Signin/Signin.js'
import Register from './Components/Register/Register.js'



function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl]=useState("");
  const [box, setBox]=useState([]);
  const [route,setRoute]=useState("");
  const [isSignedIn, setIsSignedIn]=useState(null);
  const [user, setUser]=useState({
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined:''
  })

  const loadUser=(data)=>{
    setUser({
      id:data.id,
      name:data.name,
      email:data.email,
      password:data.password,
      entries:data.enteries,
      joined:data.joined
    })
  }
  


  const calculateFaceLocation = (data) => {
    
    const clarifaiFace = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const margins = [];

        clarifaiFace.forEach((region) => {
        const face = region.region_info.bounding_box;
        const margin = {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height)
        };
        margins.push(margin);
        });

    return margins;
  }




const makeClarifaiRequest = () => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentication
    const PAT = '3b964103b5d4427ab1ff36e959c26a06';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/versions/' +
        MODEL_VERSION_ID +
        '/outputs',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if(result){
          displayFaceBox(calculateFaceLocation(result));
          fetch('http://localhost:3000/images',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:user.id
            })

          }).then(res=>res.json()).then(entries=>{
            setUser({
              ...user,
              entries:entries.enteries
            })
          })
        }
        
      })
      .catch((error) => {
        console.log('error', error);
        // Handle the error appropriately (e.g., display an error message)
      });
  };
  

   

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const handleChange=(event)=>{
    setInput(event.target.value);
  }
  
  const handleclick = () => {
    setImageUrl(input);
    
    makeClarifaiRequest();

   setInput("");
  };

  const handleRoute=(page)=>{
    if(page==='home'){
      setIsSignedIn(true);
    }else if(page==='signin'){
      setIsSignedIn(false);
    }
    setRoute(page);
  }

  
  
  

  return (
    <div className="App">
      <Navigation handleRoute={handleRoute} isSignedIn={isSignedIn} /> 
      {route ==="home" ? 
      <>
        <Logo />
        <Info name={user.name} entries={user.entries} />
        <Input handleChange={handleChange} handleclick={handleclick} value={input}/>
        <Facerecognition url={imageUrl} box={box} />
      </> :(
        route === "signin" ? <Signin loadUser={loadUser} handleRoute={handleRoute} /> :
        <Register loadUser={loadUser} handleRoute={handleRoute}/>
      )
      
    
    }
       
      
    </div>
  );
}

export default App;
