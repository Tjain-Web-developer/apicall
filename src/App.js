import axios from 'axios';
import React, { useState } from 'react'

const App = () => {
  const [animal, setanimal] = useState(["bird", "cat", "dog", "reptile", "rabbit"]);

  const [chosenAnimal, setchosenAnimal] = useState(null);
  const [chosenBreed, setchosenBreed] = useState(null);
  const [breedsAvailable, setbreedsAvailable] = useState([]);
  const [location, setlocation] = useState(null);

  const [response, setresponse] = useState([]);

  let changeHandler = async (e) => {
    setchosenAnimal(e.target.value);
    console.log(chosenAnimal)
    let { data } = await axios.get(`http://pets-v2.dev-apis.com/pets?animal=${e.target.value}&location=${location}`);
    setbreedsAvailable(data.pets);
  }

  let submitHandler = async (e) => {
    e.preventDefault();
    
    if(e.target[0].value && e.target[1].value && e.target[2].value){
      console.log(e.target[0].value, e.target[1].value, e.target[2].value)
      let { data } = await axios.get(`http://pets-v2.dev-apis.com/pets?animal=${chosenAnimal}&location=${location}&breed=${chosenBreed}`);
      setresponse(data.pets);
      console.log(data)
    }else{
      alert("Please Fill All The Fields");
    }
  }

  return (
    <div className='container'>
      <form className='mb-3' onSubmit={submitHandler} >
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input onChange={(e) => setlocation(e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" />
        </div>
        <select onChange={changeHandler} className="form-select mb-3" aria-label="Default select example">
          <option defaultValue="">Animals</option>
          {
            animal.map((eachAnimal,i) => (
              <option key={i} value={eachAnimal}>{eachAnimal}</option>
            ))
          }
        </select>
        <select onChange={(e) => setchosenBreed(e.target.value)} className="form-select mb-3" aria-label="Default select example">
          { breedsAvailable && breedsAvailable.map((e,i) => (
            <option key={i} value={e.breed}>{e.breed}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {
        response.length > 0
        ? (
          <div className='d-flex gap-2 flex-wrap'>
              {response.map((e) => (
            <div className="card" style={{width: '18rem'}}>
            <img src={e.images[0]} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            ))}
          </div>
        )
        : <h5 className='alert alert-danger'>No Pets Available</h5>
      }
    </div>
  )
}

export default App