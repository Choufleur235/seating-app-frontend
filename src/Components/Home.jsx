import React from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";  


function Home()  {

  const [people, setPeople] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState("");

  useEffect(()=> {
    const fetchPeople = async () => {
      const response = await fetch("/api/tables")
      const json = await response.json()
    //   console.log(json);

      if(response.ok) {
        const labelledPeople = json.people.map((person) => {
          person.label = person.firstName + " " + person.lastName;
          return person;
        })
        setPeople(labelledPeople);
        setSelectedValue(null);
      }
    }
    fetchPeople()
  }, [])

  function handleClick() {
    if (selectedValue != null) {
      console.log(selectedValue.firstName, selectedValue.table);
      setSelectedPerson(selectedValue);
    }
    console.log("clicked");

  }

  function homeClick() {
    setSelectedPerson("");
    setSelectedValue(null)
    console.log("Home");

  }

    return (
        <div className="center d-flex flex-column" xs={8}>
          <Card hidden={selectedPerson === "" ? false : true} className="card">
            <Form  className="d-flex flex-column">
              <h3>Trouves ta table !</h3>

              <h3>Find your table !</h3>

              <Form.Group className="mb-3" controlId="">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={people}
                  sx={{ width: 300 }}
                  value = {selectedValue}
                  onChange={(event, newValue) => {
                      setSelectedValue(newValue);
                    }}

                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="Invité·e·s - Guests" />}
                  />
              </Form.Group>
              <IconButton onClick={handleClick} aria-label="check" className="icon" sx={{alignSelf: 'center'}}>
                <CheckCircleIcon className="checkIcon"/>
              </IconButton>
            </Form>
          </Card>

          <Card hidden={selectedPerson !== "" ? false : true}>
            <Form className="d-flex flex-column" >
              <h1>{selectedPerson.label}</h1>
              <h1>Table {selectedPerson.table}</h1>
              <IconButton onClick={homeClick} aria-label="check" className="icon" sx={{alignSelf: 'center'}}>
                <HomeIcon className="checkIcon"/>
              </IconButton>
            </Form>
          </Card>
      </div>
    )
}

export default Home;