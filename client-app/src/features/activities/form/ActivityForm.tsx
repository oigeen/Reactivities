import React, { useState, useContext, useEffect } from "react";
import {
  Segment,
  Form,
  Button,
  Grid,
  GridColumn,
  FormGroup
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { ActivityFormValues } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { category } from "../../../app/common/options/categoryOptions";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan
} from "revalidate";

const validation = combineValidators({
  title: isRequired("Title"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Must be at least 5 characters"
    })
  )(),
  date: isRequired("Date"),
  time: isRequired("Time"),
  venue: isRequired("Venue"),
  city: isRequired("City")
});
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
    submitting
  } = activityStore;

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then(activity => setActivity(activity))
        .finally(() => setLoading(false));
    }
    return () => clearActivity();
  }, [loadActivity, match.params.id, clearActivity]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (activity.id) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <GridColumn width="10">
        <Segment clearing>
          <FinalForm          
            validate={validation}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, pristine, invalid }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  rows={3}
                  placeholder="Description"
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />
                <FormGroup widths="equal">
                  <Field
                    name="date"
                    placeholder="Date"
                    date={true}
                    value={activity.date}
                    component={DateInput}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={activity.time}
                  />
                </FormGroup>

                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || pristine || invalid}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                ></Button>
                <Button
                  onClick={() =>
                    activity.id
                      ? history.push(`/activities/${activity.id}`)
                      : history.push("/activities")
                  }
                  disabled={loading}
                  floated="right"
                  color="grey"
                  content="Cancel"
                ></Button>
              </Form>
            )}
          />
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
