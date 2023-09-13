/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useState } from "react";
import HabitDetails from "./HabitDetails";
import EditCard from "./EditCard";
const HabitCard = ({ habitDeets, editHabits, myKey }) => {
  const [isEditBtClicked, ChangeEditBtnClick] = useState(false);
  return (
    <div className="entry">
      {isEditBtClicked ? (
        <EditCard
          myKey={myKey}
          editHabits={editHabits}
          changeEditClicked={ChangeEditBtnClick}
          habitDeets = {habitDeets}
        />
      ) : (
        <HabitDetails
          habit={habitDeets}
          editHabits={editHabits}
          isEditBtClicked={isEditBtClicked}
          ChangeEditBtnClick={ChangeEditBtnClick}
        />
      )}
    </div>
  );
};
export default HabitCard;
