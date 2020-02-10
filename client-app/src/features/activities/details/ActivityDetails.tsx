import React from "react";
import { Card, Icon, Image, ButtonGroup, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}

export const ActivityDetails:React.FC<IProps> = ({activity, setEditMode, setSelectedActivity}) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>Date</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href='http://google.com.au'>
          <Icon name="user" />
          22 Friends
        </a>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup widths={2}>
          <Button basic color="blue" content="Edit" onClick={() => setEditMode(true)}/>
          <Button basic color="grey" content="Cancel" onClick={() => setSelectedActivity(null)} />
        </ButtonGroup>
      </Card.Content>
    </Card>
  );
};
