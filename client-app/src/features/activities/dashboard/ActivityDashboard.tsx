import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { ActivityList } from './ActivityList'
import { ActivityDetails } from '../Details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'


interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    setEditMode: (editMode: boolean) => void;
    editMode: boolean;
    setSelctedActivity: (activity: IActivity | null) => void;
    creatActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}
export const ActivityDashboard: React.FC<IProps> = ({
    activities,
    selectActivity,
    selectedActivity,
    editMode,
    setSelctedActivity,
    creatActivity,
    editActivity,
    setEditMode,
    deleteActivity }) => {
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    deleteActivity={deleteActivity}
                    activities={activities}
                    selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity && !editMode &&
                    <ActivityDetails setSelctedActivity={setSelctedActivity} activity={selectedActivity} setEditMode={setEditMode} />
                }
                {editMode &&
                    <ActivityForm
                        key={selectedActivity && selectedActivity.id || 0}
                        createActivity={creatActivity}
                        editActivity={editActivity}
                        setEditMode={setEditMode}
                        activity={selectedActivity!}
                    />
                }

            </Grid.Column>
        </Grid>
    )
}
