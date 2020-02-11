import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../../api/agent";
import { LoadingComponent } from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (newActivity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(newActivity).then(() => {
      setActivities([...activities, newActivity]);
      setSelectedActivity(newActivity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleEditActivity = (editedActivity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(editedActivity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== editedActivity.id),
        editedActivity
      ]);
      setSelectedActivity(editedActivity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (id: string, event: SyntheticEvent<HTMLButtonElement>) => {    
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(act => act.id !== id)]);
    }).then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list().then(response => {
      response.forEach(activity => {
        activity.date = activity.date.split(".")[0];
      });
      setActivities(response);
    }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content={"Activities loading..."}/>

  return (
    <Fragment>
      <NavBar OnCreateActivity={handleOpenCreateForm} />
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
