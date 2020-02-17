import React, { useState, FormEvent, useContext, useEffect } from "react";
import {
  Segment,
  FormInput,
  Form,
  FormTextArea,
  Button,
  Grid,
  GridColumn
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailProps {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    loadActivity,
    editActivity,
    clearActivity,
    submitting,
    activity: initialFormState
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => clearActivity();
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      editActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  const HandleFormInputChanged = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Grid>
      <GridColumn width="10">
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <FormInput
              onChange={HandleFormInputChanged}
              name="title"
              placeholder="Title"
              value={activity.title}
            />
            <FormTextArea
              onChange={HandleFormInputChanged}
              name="description"
              rows={2}
              placeholder="Description"
              value={activity.description}
            />
            <FormInput
              onChange={HandleFormInputChanged}
              name="category"
              placeholder="Category"
              value={activity.category}
            />
            <FormInput
              onChange={HandleFormInputChanged}
              name="date"
              type="datetime-local"
              placeholder="Date"
              value={activity.date}
            />
            <FormInput
              onChange={HandleFormInputChanged}
              name="venue"
              placeholder="Venue"
              value={activity.venue}
            />
            <FormInput
              onChange={HandleFormInputChanged}
              name="city"
              placeholder="City"
              value={activity.city}
            />
            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            ></Button>
            <Button
              onClick={() => history.push("/activities")}
              floated="right"
              color="grey"
              content="Cancel"
            ></Button>
          </Form>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
