import React, {  useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react'
import './styles.css';
import ActivityStore from "../stores/ActivitityStore";
import { NavBar } from '../../features/nav/NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { LoadingComponent } from './LoadingComponent'
import { observer } from 'mobx-react-lite'



const App = () => {

  const activitySore = useContext(ActivityStore)

  useEffect(() => {
    activitySore.loadActivities()
  }, [activitySore]);

  if (activitySore.loadingInitial) return <LoadingComponent content='Loading activities' />

  return (
    <div>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard  />
      </Container>

    </div>
  );

}


export default observer(App);
