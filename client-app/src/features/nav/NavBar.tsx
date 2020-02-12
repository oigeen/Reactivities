import React, { useContext } from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'
import { observer } from 'mobx-react-lite'

const NavBar:React.FC = () => {

    const activityStore = useContext(ActivityStore)
    const { openCreateForm: OnCreateActivity } = activityStore;

    return (
      <Menu fixed='top' inverted>
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt='logo'></img>
                Reactivities
            </Menu.Item>
            <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button positive onClick={OnCreateActivity}>
                    Add Activity
                </Button> 
            </Menu.Item>
        </Container>  
      </Menu>  
    )
}


export default observer(NavBar);