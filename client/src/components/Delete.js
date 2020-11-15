import React, { useState } from 'react';

import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default function Delete(props){
  // props from the home page
  const uni = props.location.state;

  const [change, setChange] = useState(false);

  // Function to post the item to the backend for deleting the data
  const handleConfirmDelete = () => {
    axios.post('http://www.localhost:8000/uni/:id/delete', uni)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    setChange(true);
  }

  return (
    <div>
      {/* If deleted, it redirects to home page */}
      { change 
      ? <Redirect exact to="/"/>
      : <div className="jumbotron justify-content-center">
        
          <div className="row">
            <div className="col-md-12">
              <h1>Are you sure you want to delete it?</h1>
            </div>
          </div>


          <div class="row my-5">
            <div className="col-md-12">
              <button className="btn btn-danger btn-lg mx-5" onClick={handleConfirmDelete}>Yes</button>
              <Link to="/"><button className="btn btn-secondary btn-lg">No</button></Link>
            </div>
          </div>
          
        </div>
      }
    </div>
  )
}

