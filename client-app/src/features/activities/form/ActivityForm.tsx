import React, { useState, FormEvent, useContext } from "react";
import {
  Segment,
  FormInput,
  Form,
  FormTextArea,
  Button
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

interface IProps {
  activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({
  activity: initialFormState
}) => {
  const InitializeForm = () => {
    if (initialFormState) return initialFormState;
    else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };

  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen
  } = activityStore;

  const [activity, setActivity] = useState(InitializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const HandleFormInputChanged = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
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
          onClick={cancelFormOpen}
          floated="right"
          color="grey"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
