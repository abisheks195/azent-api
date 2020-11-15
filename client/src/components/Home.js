import React, {useState, useEffect} from 'react';
import Pagination from './Pagination';

import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  
  const [data, setData] = useState([]);
  const [searchCommon, setSearchCommon] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    
    // GET entire data
    axios.get('http://www.localhost:8000/uni/all')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });  

  }, []);


  // Function to filter the data by name, domain and country code
  const filterByCommon = (data) => {

    // For pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    return currentData.filter(item => 
      (item.name.toLowerCase().indexOf(searchCommon.toLowerCase()) > -1) ||
      (item.domain.toLowerCase().indexOf(searchCommon.toLowerCase()) > -1) ||
      (item.alpha_two_code.toLowerCase().indexOf(searchCommon.toLowerCase()) > -1)
    )

  }

  // Changing page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>

      <div className="d-flex justify-content-between">
        <h1 className="my-5">List of all the Universities:</h1>
        <input 
          className="input-group form-control align-self-center" 
          style={{width: "40%"}} 
          type="text"
          onChange={e => setSearchCommon(e.target.value)}
          placeholder="Search by Name or Country code or Domain"
          />
      </div>

      <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Country Code</th>
              <th scope="col">Domain</th>
              <th scope="col">Website</th>
              <th scope="col" colSpan="2">Options</th>
            </tr>
          </thead>
          <tbody>
      
      {/* Calling the function to filter the data for search */}
      {filterByCommon(data).map((uni, index) => {
          return (
          <tr key={uni._id}>
            <td><Link to={{
              pathname: `/uni/${uni.name}`,
              state: uni
            }}>{uni.name}</Link></td>
            <td>{uni.country}</td>
            <td>{uni.alpha_two_code}</td>
            <td>{uni.domain}</td>
            <td><a href={uni.web_page}>{uni.web_page}</a></td>
            <td><Link to={{
              pathname: `/uni/${uni._id}/update`,
              state: uni
            }}><button className="btn btn-warning">Update</button></Link></td>
            <td><Link to={{
              pathname: `/uni/${uni._id}/delete`,
              state: uni
            }}><button className="btn btn-danger">Delete</button></Link></td>
          </tr>
          );
      })}
      </tbody>
      </table>
      
      <h6 style={{color: "grey"}} className="my-4">Displaying 10 items per page</h6>
      
      <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} paginate={paginate}/>

    </div>
  )
}



// Connected to elasticsearch and got the data back but could not use it to filter the name

  // let searchNameArray = [];
  // const newSearchData = () => {
  //   return axios.post('http://localhost:8000/uni/search', {searchName})
  //   .then(res => { 
  //     for (let i = 0; i < res.data.length; i++) {
  //       const element = res.data[i];
  //       console.log(element._source);
  //       searchNameArray.push(element._source);
  //     }
  // }, (err) => {
  //     console.log(err);
  //   })
  // }

  // newSearchData();

  // console.log(searchNameArray);