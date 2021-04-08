import react,{Component} from 'react';
import {Nav,NavLink,NavbarToggler,Jumbotron,NavbarBrand,Collapse, NavItem,Button , Navbar} from 'reactstrap';

class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            isNavOpen:false
        }

        this.togglefunc = this.togglefunc.bind(this);
    }

    togglefunc(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render( ){
        return(
            <div>
                <Navbar dark expand="md" className="bg-primary">
                    <div className="container row">
                        <NavbarToggler onClick={this.togglefunc}/>

                            <NavbarBrand className="mr-auto" href="/">
                                Alog - Visualizer
                            </NavbarBrand>

                            <Collapse isOpen={this.state.isNavOpen} className="collapse navbar-collapse">
                                <Nav className="ml-auto">
                                    <NavItem className="navbar-nav">
                                        <NavLink className="nav-link" to="/"> Home </NavLink>
                                        <NavLink className="nav-link" to="/"> About </NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }

}


export default Header;