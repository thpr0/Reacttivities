import React, { useContext } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivitityStore from '../../../app/stores/ActivitityStore'

const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivitityStore);
    const { activitiesByDate, selectActivity,deleteActivity,submitting ,target} = activityStore;

    return (
        <div>
            <Segment clearing>
                <Item.Group divided>
                    {activitiesByDate.map(activity => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue} </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={(e) => selectActivity(activity.id)} floated="right" content="View" color="blue" />
                                    <Button name={activity.id} loading={target === activity.id && submitting} onClick={(e) => deleteActivity(activity.id,e)} floated="right" content="delete" color="red" />
                                    <Label basic content={activity.category}></Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </Item.Group>
            </Segment>

        </div>
    )
}

export default observer(ActivityList)
