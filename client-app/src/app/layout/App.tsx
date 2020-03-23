import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import axios from 'axios';
import { IActivity } from '../models/activity';

import { NavBar } from '../../features/nav/NavBar'
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard'



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelctedActivity] = useState<IActivity | null>(null);

  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelctedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelctedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity= (activity: IActivity)=>{
    setActivities([...activities, activity])

    setSelctedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity=(activity: IActivity) =>{
    setActivities([...activities.filter(a=>a.id!==activity.id), activity])
    setSelctedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivty=(id: string)=> {
    setActivities([...activities.filter(a=> a.id!==id)]);
  }


  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        let activities : IActivity[]=[];
        response.data.forEach(activity =>{
          activity.date=activity.date.split('.')[0]
          activities.push(activity);
        })
        setActivities(activities)
      });
  }, []);

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
        />
      </Container>

    </div>
  );

}


export default App;
