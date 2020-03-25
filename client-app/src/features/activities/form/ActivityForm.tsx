import React, { useState, FormEvent } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import { v4 as uuid} from 'uuid'

interface IProps {
    setEditMode: (editModel: boolean) => void;
    activity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    submitting:boolean
}

export const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialeFormState, createActivity, editActivity,submitting }) => {

    const initializeForm = () => {
        if (initialeFormState)
            return initialeFormState;
        else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }
    const [activity, setActivity] = useState<IActivity>(initializeForm)

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        }
        else {
            editActivity(activity);
        }
    }

    const handeInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handeInputChange} name='title' placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handeInputChange} name='description' rows="2" value={activity.description} placeholder='Description' />
                <Form.Input onChange={handeInputChange} name='category' value={activity.category} placeholder='Category' />
                <Form.Input onChange={handeInputChange} name='date' value={activity.date} type="date" placeholder='Date' />
                <Form.Input onChange={handeInputChange} name='city' value={activity.city} placeholder='City' />
                <Form.Input onChange={handeInputChange} name='venue' value={activity.venue} placeholder='Venue' />
                <Button   loading={submitting} floated="right" positive type="submit" content="Submit" />
                <Button  onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}
