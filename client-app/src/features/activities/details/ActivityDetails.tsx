import React, { useContext, useEffect } from "react";
import { Card, Icon, Image, ButtonGroup, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";

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
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>Date</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="http://google.com.au">
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button
            as={Link} to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => history.push("/activities")}
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
