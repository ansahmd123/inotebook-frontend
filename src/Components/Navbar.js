import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const Navbar = () => {

  // const form = document.querySelector('form.form-inline');
  // const searchBtn = form.querySelector('button[type="submit"]');
  // const searchBtn = document.getElementById('search');
  
  // searchBtn.addEventListener('click', (event) => {
  //   event.preventDefault();
    
  //   // Get the search query from the input field
  //   const searchQuery = form.querySelector('input[type="search"]').value;
    
  //   // Call a function to handle the search query and display the search results
  //   handleSearch(searchQuery);
  // });
  
  // function displaySearchResults(searchResults) {
  //   // Get the container element where the search results will be displayed
  //   const searchResultsContainer = document.querySelector('#search-results');
    
  //   // Clear any previous search results from the container
  //   searchResultsContainer.innerHTML = '';
    
  //   // Create HTML elements to display each search result
  //   searchResults.forEach((result) => {
  //     const resultElem = document.createElement('div');
  //     resultElem.classList.add('search-result');
  //     resultElem.innerHTML = `
  //       <h2>${result.title}</h2>
  //       <p>${result.description}</p>
  //       <a href="${result.link}">Read more</a>
  //     `;
  //     searchResultsContainer.appendChild(resultElem);
  //   });
  // }
  
  // function handleSearch(searchQuery) {
  //   // Make a request to the server using AJAX
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', `http://localhost:3000/search?q=${searchQuery}`);
    
  //   xhr.onload = () => {
  //     // Handle the response from the server
  //     if (xhr.status === 200) {
  //       // Display the search results on the page
  //       const searchResults = JSON.parse(xhr.responseText);
  //       displaySearchResults(searchResults);
  //     } else {
  //       console.log('Error: Could not retrieve search results.');
  //     }
  //   };
    
  //   xhr.send();
  // }
  
  let location = useLocation();

  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>            </li>
            {/* <li className="nav-item"> */}
            {/* <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} aria-current="page" to="/about">About</Link>            </li> */}

          </ul>
          <div>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn mx-2 btn-outline-success" id='search' type="submit">Search</button>
          </form></div>

          {!localStorage.getItem('token') ? <form className='d-flex'>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
          </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>}

        </div>
      </div>
    </nav>
  )
}

export default Navbar