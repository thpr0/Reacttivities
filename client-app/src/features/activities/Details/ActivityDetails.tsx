import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import ActivitityStore from '../../../app/stores/ActivitityStore'
import { observer } from 'mobx-react-lite'



const ActivityDetails: React.FC = () => {
    const activityStore= useContext(ActivitityStore)
    const {selectedActivity:  activity,openEditForm,cancelSelectedActivity}= activityStore;
    return (
        <div>
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity!.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity!.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity!.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity!.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button onClick={() => openEditForm(activity!.id)} basic color='blue' content='Edit'></Button>
                        <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'></Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        </div>
    )
}

export default observer(ActivityDetails);
