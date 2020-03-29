import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList'
import ActivityDetails from '../Details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'
import ActivitityStore from '../../../app/stores/ActivitityStore'


const ActivityDashboard: React.FC = () => {

    const actitvityStore = useContext(ActivitityStore);
    const { editMode, selectedActivity } = actitvityStore;
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
                {
                    selectedActivity && !editMode && <ActivityDetails />
                }
                {
                    editMode && <ActivityForm key={selectedActivity && selectedActivity.id} activity={selectedActivity!} />
                }

            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);