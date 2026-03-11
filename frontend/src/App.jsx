import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/countries")
            .then((res) => res.json())
            .then((data) => setCountries(data))
            .catch((err) => console.error(err));
    }, []);

    const filteredCountries = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.capital.toLowerCase().includes(search.toLowerCase()) ||
            c.region.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Countries</h1>
            <input
                type="text"
                placeholder="Search by name, capital, region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table>
                <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>Region</th>
                    <th>Population</th>
                </tr>
                </thead>
                <tbody>
                {filteredCountries.map((country, index) => (
                    <tr key={index} onClick={() => setSelectedCountry(country)}>
                        <td>
                            <img src={country.flag} alt="flag" width={50} />
                        </td>
                        <td>{country.name}</td>
                        <td>{country.capital}</td>
                        <td>{country.region}</td>
                        <td>{country.population.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedCountry && (
                <>
                    <div
                        className="modal-overlay"
                        onClick={() => setSelectedCountry(null)}
                    ></div>
                    <div className="modal">
                        <h2>{selectedCountry.name}</h2>
                        <img src={selectedCountry.flag} alt="flag" width={150} />
                        <p>
                            <strong>Capital:</strong> {selectedCountry.capital}
                        </p>
                        <p>
                            <strong>Region:</strong> {selectedCountry.region}
                        </p>
                        <p>
                            <strong>Population:</strong>{" "}
                            {selectedCountry.population.toLocaleString()}
                        </p>
                        <button onClick={() => setSelectedCountry(null)}>Close</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;