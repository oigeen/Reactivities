import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import axios from "axios";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);    
  }

  const handleCreateActivity = (newActivity: IActivity) => {
    setActivities([...activities, newActivity]);
    setSelectedActivity(newActivity);
    setEditMode(false);
  }

  const handleEditActivity = (editedActivity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== editedActivity.id), editedActivity]);
    setSelectedActivity(editedActivity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(act => act.id !== id)]);
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0];
        });
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavBar OnCreateActivity={handleOpenCreateForm}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
