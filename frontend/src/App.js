import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Modal, Button, Form } from "react-bootstrap";

function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/countries");
            setCountries(response.data);
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    };

    const filteredCountries = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.capital.toLowerCase().includes(search.toLowerCase()) ||
            c.region.toLowerCase().includes(search.toLowerCase())
    );

    const handleRowClick = (country) => {
        setSelectedCountry(country);
        setShowModal(true);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Countries</h1>

            <Form.Control
                type="text"
                placeholder="Search by name, capital, or region"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-3"
            />

            <Table striped bordered hover responsive>
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
                {filteredCountries.map((country, idx) => (
                    <tr key={idx} onClick={() => handleRowClick(country)} style={{ cursor: "pointer" }}>
                        <td>
                            <img src={country.flag} alt="flag" width="50" />
                        </td>
                        <td>{country.name}</td>
                        <td>{country.capital}</td>
                        <td>{country.region}</td>
                        <td>{country.population.toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedCountry?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCountry && (
                        <div className="text-center">
                            <img src={selectedCountry.flag} alt="flag" width="150" className="mb-3" />
                            <p><strong>Capital:</strong> {selectedCountry.capital}</p>
                            <p><strong>Region:</strong> {selectedCountry.region}</p>
                            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;