import React, { useState } from 'react';
import Success from './Success';

import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export default function AddForm() {

  // External library (react-hook-form) for validation
  const { register, handleSubmit, errors } = useForm();

  // Defining state for each value of a university to add
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [alpha_two_code, setAlphaTwoCode] = useState('');
  const [domain, setDomain] = useState('');
  const [web_page, setWebPage] = useState('');
  const [success, setSuccess] = useState(false);

  // POST function to add the requested item to mongodb and elasticsearch
  const onSubmit = () => {
    const item = {
      alpha_two_code: alpha_two_code,
      country: country,
      domain: domain,
      name: name,
      web_page: web_page
    }
    
    axios.post('http://www.localhost:8000/uni/add', item)
      .then(res => {
        console.log(res.data.success);
        if(res.data.success){
          setSuccess(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      { 
        (success)
        ? 
        <div>
          <Route path='/success' render={() => <Success/>}/>
          <Redirect push to='/success' />
        </div>
        :
        <div>
          <h2 className="my-5">Add a University:</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
            <div className="container">

              {/* Name of the University */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="name" 
                    type="text" 
                    onChange={e => {setName(e.target.value)}}
                    placeholder="Name of the University"
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.name && 'Please enter a name.'}</p>
                </div>
              </div>

              <br/>
              
              {/* Country */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Country:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="country" 
                    type="text"  
                    onChange={e => setCountry(e.target.value)} 
                    placeholder="Country"
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.country && 'Please enter a country.'}</p>
                </div>
              </div>

              <br/>

              {/* Country Code */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Country Code:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="alpha_two_code" 
                    type="text" 
                    onChange={e => setAlphaTwoCode(e.target.value)} 
                    placeholder="Country Code (Eg. IN, US, ...)"
                    ref={register({required: true})}
                    />
                    <p style={{color: "red"}}>{errors.alpha_two_code && 'Please enter a Country code.'}</p>
                </div>              
              </div>

              <br/>

              {/* Domain */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Domain:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="domain" 
                    type="text"  
                    onChange={e => setDomain(e.target.value)} 
                    placeholder="Domain Name"
                    ref={register({required: true, pattern: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/})}
                    />
                    <p style={{color: "red"}}>{errors.domain && 'Please enter a valid domain.'}</p>
                </div>              
              </div>

              <br/>

              {/* Web page */}
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Website:</label>
                <div className="col-sm-10">
                  <input 
                    className="form-control" 
                    name="web_page" 
                    type="text" 
                    onChange={e => setWebPage(e.target.value)} 
                    placeholder="Website of the University"
                    ref={register({required: true, pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/})}
                    />
                    <p style={{color: "red"}}>{errors.web_page && 'Please enter a valid URL.'}</p>
                </div>              
              </div>

              <br/>

              <button type="submit" className="btn btn-primary">Submit</button>
              
            </div>
          </form>
        </div>
    }
    </div>
  );
}
