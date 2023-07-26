import React from "react";
import { useEffect, useState } from "react";  

function Guests() {    

  const [people, setPeople] = useState(null);

  useEffect(()=> {
    const fetchPeople = async () => {
      const response = await fetch("/api/tables")
      const json = await response.json()
    //   console.log(json);

      if(response.ok) {
        setPeople(json.people);
      }
    }
    fetchPeople()
  }, [])

    return (
      <div>
        {people && people.map((person) => (
          <p key={person._id}>{person.firstName} {person.lastName}'s table is {person.table}</p>
        ))}
        {/* {
          for ( let i = 0 ; i < people.length ; i++) {
            <p key={people[i]._id}>{people[i].firstName}{people[i].lastName}'s table is {people[i].table}</p>
          }
        } */}
        {/* <p>{JSON.stringify(people)}</p> */}
      </div>
    )
}


export default Guests;