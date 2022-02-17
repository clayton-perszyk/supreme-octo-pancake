import React, { useState, useEffect } from 'react'
import './App.css';

const API_URL = 'https://fakerapi.it/api/v1/companies';

function App() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = () => {
    setIsLoading(true);
    fetch(`${API_URL}?_quantity`)
        .then(response => response.json())
        .then(data => {
          setCompanies(data.data)
          setIsLoading(false);
        }).catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleRefreshClick = () => {
    fetchCompanies();
  }

  return (
    <div className="app">
      {/* Your code starts here */}
      {isLoading && <div className="loading-text">Loading</div>}
      {!isLoading && Boolean(companies.length) && (
          <>
            <button type="button" onClick={handleRefreshClick}>Refresh</button>
            <table className="companies-table">
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Country</th>
                <th>Website</th>
              </tr>
            {companies.map((company, index)=> {
              return <tr key={`${index} + 1`}>
                <td>{company.name}</td>
                <td>{company.contact.firstname} {company.contact.lastname}</td>
                <td>{company.country}</td>
                <td><a className="company-website" href={company.website} target="_blank" rel="noreferrer">{company.website}</a></td>
                </tr>
            })}
            </table>
          </>
        )
      }
    </div>
  );
}

export default App;
