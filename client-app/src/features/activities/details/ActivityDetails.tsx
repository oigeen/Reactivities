import React, { useContext, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { ActivityDetailedHeader } from "./ActivityDetailedHeader";
import { ActivityDetailedInfo } from "./ActivityDetailedInfo";
import { ActivityDetailedChat } from "./ActivityDetailedChat";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

interface DetailsProps {
  id: string;
}

export const ActivityDetails: React.FC<RouteComponentProps<DetailsProps>> = ({match, history}) => {

  const activityStore = useContext(ActivityStore);
  const {
    activity,    
    loadingInitial,
    loadActivity
  } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [activityStore, loadActivity, match.params.id]);

  if(loadingInitial || !activity) {
    return <LoadingComponent content="Loading Activity"/>
  }  
  return (
    <Grid>
      <GridColumn width='10'>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat/>
      </GridColumn>
      <GridColumn width='6'>
        <ActivityDetailedSidebar/>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetails);
