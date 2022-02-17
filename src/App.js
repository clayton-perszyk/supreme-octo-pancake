import React, { useState, useEffect} from 'react'
import './App.css';

function App() {
  const [companies, setCompanies] = useState([]);
  const [isLoaded, setIsLoaded ]= useState(false);

  async function  getCompanies() {
    const baseURL = 'https://fakerapi.it'
    
    try {
      const response = await fetch(`${baseURL}/api/v1/companies`);
      const companiesJSON = await response.json();
      setCompanies(companiesJSON);
      setIsLoaded(true);
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="app">
     <button onClick={getCompanies}>Refresh</button>
      {!isLoaded && (<div >loading...</div>)}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Country</th>
            <th>Website</th>
          </tr>
        </thead>
         <tbody>
            {companies.data && companies.data.map((company) =>{
              return (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{`${company.contact.firstname} ${company.contact.lastname}`}</td>
                  <td>{company.country}</td>
                  <td><a href={company.website}>{company.website}</a></td>
                </tr>
              );
            })}
         </tbody>
      </table>
    </div>
  );
}

export default App;
