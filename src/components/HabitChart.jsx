import { Bar } from "react-chartjs-2";

const HabitChart = ({ habits }) => {
  const datesMap = new Map();
  // add dates into dates map
  for (let i = 0; i < habits.length; i++) {
    // if existing date label check if completed, else add date label
    if(datesMap.has(habits[i].date)){
      if(habits[i].completed===true){
        console.log(habits[i].habit)
        const newVal = datesMap.get(habits[i].date)
        datesMap.set(habits[i].date, newVal+1);
      }
    }
    else datesMap.set(habits[i].date, 1);
  }
  console.log(datesMap)
  let dates = Array.from(datesMap.keys());
  let completedTasks = Array.from(datesMap.values())
  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: dates,
          datasets: [
            {
              label: "# of things completed",
              data: completedTasks,
              fill: true,
              borderWidth: 4,
              backgroundColor: "lightBlue",
              borderColor: "blue",
              responsive: true,
            },
          ],
        }}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
};

export default HabitChart;
