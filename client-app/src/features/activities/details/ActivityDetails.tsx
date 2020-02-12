import React, { useContext } from "react";
import { Card, Icon, Image, ButtonGroup, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

export const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity
  } = activityStore;

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
            basic
            color="blue"
            content="Edit"
            onClick={() => openEditForm(activity!.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => cancelSelectedActivity()}
          />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
