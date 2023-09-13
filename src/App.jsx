import { useEffect, useState } from "react";
import NewHabitForm from "./components/NewHabitForm";
import HabitCard from "./components/HabitCard";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import "../node_modules/animate.css"
import "./App.css";
import "./components/HabitChart"
import HabitChart from "./components/HabitChart";
Chart.register(CategoryScale)
const App = () => {
  const [habits, setHabits] = useState(null);
  //fetch habits from database
  useEffect(() => {
    let habitDates = new Array();
    const fetchHabits = async () => {
      const response = await fetch("http://localhost:3000/api/getAll");
      const json = await response.json();
      if (response.ok) {
        setHabits(json);
        for(let i = 0; i<json.length; i++)
        {
          habitDates.push(json[i].date)
        }
      }
    };
    fetchHabits();
  }, []);

  return (
    <>
      <h1>Productibity Tracker</h1>
      <div className="main">
        <div className="habits">
          <TransitionGroup className="css-transition">
            {habits &&
              habits.map((habitEntry) => (
                <CSSTransition
                  key={habitEntry._id}
                  classNames={{
                    enterActive: "animate__animated animate__lightSpeedInLeft",
                    exitActive: "animate__animated animate__lightSpeedOutLeft",
                  }}
                  timeout={900}
                >
                  <HabitCard
                    className="habit-card"
                    key={habitEntry._id}
                    myKey={habitEntry._id}
                    habitDeets={habitEntry}
                    editHabits={setHabits}
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </div>
        <NewHabitForm habitsList={habits} editHabits={setHabits} />
      </div>
      {/* < HabitChart  /> */}
      {habits && (
        < HabitChart habits={habits} />
      )}
    </>
  );
};

export default App;
