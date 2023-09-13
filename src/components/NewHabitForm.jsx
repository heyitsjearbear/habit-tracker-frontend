/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

const NewHabitForm = ({ editHabits, habitsList }) => {
  const [habit, setHabit] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompletedBox] = useState(false);
  const checkBoxRef = useRef([]);
  const submitHabit = async (e) => {
    e.preventDefault();
    // console.log(`Date: ${date}, habit: ${habit}, completed: ${completed}`)
    try {
      let newData = await fetch("http://localhost:3000/api/post", {
        method: "post",
        body: JSON.stringify({ habit, date, completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await newData.json();
      if (newData.ok) {
        // alert("data submitted to database successfully");
        //reset fields
        setHabit("");
        setDate("");
        setCompletedBox(false);
        checkBoxRef.current[0].checked = false;
        //update locally here
        editHabits((lastList) => {
          return[...lastList,json]
        });
        console.log(json);
        console.log(habitsList)
      } else {
        throw new Error(
          JSON.stringify({ code: newData.status, message: newData.statusText })
        );
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <form action="">
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
        <input
          ref={(box) => {
            checkBoxRef.current[0] = box;
          }}
          type="checkbox"
          value={completed}
          onChange={(e) => setCompletedBox(e.target.checked)}
        />
        <button type="submit" onClick={submitHabit}>
          submit
        </button>
      </form>
    </>
  );
};

export default NewHabitForm;
