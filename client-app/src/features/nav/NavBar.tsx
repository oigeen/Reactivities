import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface IProps {
    OnCreateActivity: () => void;
}
const NavBar:React.FC<IProps> = ({OnCreateActivity}) => {
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


export default NavBar;