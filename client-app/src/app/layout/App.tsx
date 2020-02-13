import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { Home } from "../../features/home/Home";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <Route path="/" exact component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Route path="/activities" exact component={ActivityDashboard} />
            <Route path="/activities/:id" component={ActivityDetails} />
            <Route
              key={location.key}
              path={["/createActivity", "/manage/:id"]}
              component={ActivityForm}
            />
          </Fragment>
        )}
      />
    </Container>
  );
};

export default withRouter(observer(App));
