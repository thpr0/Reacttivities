import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import { IActivity } from '../models/activity';

import { NavBar } from '../../features/nav/NavBar'
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent'



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelctedActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting,setSubmitting]=useState(false);
  const [target,setTaget]=useState("");

  const handleSelectActivity = (id: string) => {
  
    setSelctedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelctedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelctedActivity(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelctedActivity(activity);
      setEditMode(false);
    }).then(()=>  setSubmitting(false))
  }

  const handleDeleteActivty = (event:  SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmitting(true);
    setTaget(event.currentTarget.name);
    agent.Activities.del(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(()=>setSubmitting(false));

  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        })
        setActivities(activities)
      }).then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content='Loading activities' />

  return (
    <div>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={handleSelectActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelctedActivity={setSelctedActivity}
          editActivity={handleEditActivity}
          creatActivity={handleCreateActivity}
          deleteActivity={handleDeleteActivty}
          submitting={submitting}
          target={target}
        />
      </Container>

    </div>
  );

}


export default App;
