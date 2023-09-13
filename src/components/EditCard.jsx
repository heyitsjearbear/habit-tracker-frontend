/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
const EditCard = ({ habitDeets,myKey,editHabits, changeEditClicked }) => {
  const [habit, setHabit] = useState(habitDeets.habit);
  const [date, setDate] = useState(habitDeets.date);
  const [completed, setCompletedBox] = useState(habitDeets.completed);
  const checkBoxRef = useRef([]);
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      let updatedData = await fetch("http://localhost:3000/api/update/" + myKey, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
            },
        method: "PATCH",
        body: JSON.stringify({ habit:habit, date:date, completed:completed }),
      });
      // have to delete original habit here locally
      // so no duplication
      editHabits((lastList) => {
        let filteredArr = lastList.filter((obj) => {
          return obj._id !== myKey;
        });
        return filteredArr;
      });
    
      console.log(updatedData)
      const json = await updatedData.json();
      if (updatedData.ok) {
        // alert("habit edited successfully");
        //update locally here
        editHabits((lastList) => {
          return [...lastList, json];
        });
        console.log(json);
        //console.log(habitsList);
        //get out of edit interface
        changeEditClicked(false);
      } else {
        throw new Error(
          JSON.stringify({ code: updatedData.status, message: updatedData.statusText })
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <form className="row card" action="">
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {completed ? (<input
          ref={(box) => {
            checkBoxRef.current[0] = box;
          }}
          type="checkbox"
          value={completed}
          onChange={(e) => setCompletedBox(e.target.checked)}
          checked
        />) :
        (<input
            ref={(box) => {
              checkBoxRef.current[0] = box;
            }}
            type="checkbox"
            value={completed}
            onChange={(e) => setCompletedBox(e.target.checked)}
          />)}
        
        <button type="submit" onClick={updateHandler}>
          update
        </button>
      </form>
    </>
  );
};

export default EditCard;
