import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivitityStore from '../../app/stores/ActivitityStore';

interface IProps {
    
}

export const NavBar: React.FC<IProps> = () => {
    const activityStore= useContext(ActivitityStore);
    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <img src="/assets/logo.png" alt="" style={{ marginRight: 10 }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities' />
                    <Menu.Item  >
                        <Button onClick={activityStore.openCreateForm} positive content="Create Activity" />
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}
