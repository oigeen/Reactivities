import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import { LoadingComponent } from "./LoadingComponent";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import "./styles.css";


const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content={"Activities loading..."} />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
