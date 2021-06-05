import react,{Component} from 'react';
import {Nav,NavLink,NavbarToggler,NavbarBrand,Collapse, NavItem,Button , Navbar,Jumbotron,Form, FormGroup, Input} from 'reactstrap';
import { visuaizeBFS,visualizeDijkstra } from "./GridLayoutComponent";

class Header extends Component{
    constructor(props){
        super(props);

        this.state = {
            isNavOpen:false,
            algo:'',
            // dijkstra:visualizeDijkstra(),
            // bfs:visuaizeBFS(),
            name:null
        }

        this.togglefunc = this.togglefunc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    togglefunc(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    handleChange(event){
        console.log(event.target.value)
        this.setState({
            algo:event.target.value,
            name:event.target.name
        })
        console.log(this.state.algo);
        event.preventDefault();
    }
    handleSubmit(event){
        event.preventDefault()

        console.log(this.state.algo)
        if(this.state.algo === 'Dijkstra'){
            this.props.dijkstra()
        }
        else if(this.state.algo === 'BFS'){
            this.props.bfs()
        }
        else if(this.state.algo === 'GBFS'){
            this.props.gbfs()
        }
        else if(this.state.algo === 'DFS'){
            this.props.dfs()
        }
        else if(this.state.algo === 'BBFS'){
            this.props.bbfs()
        }
        else if(this.state.algo === 'A*'){
            this.props.astar()
        }
        
        // return this.state.algo;
        event.preventDefault()
    }


    render( ){
        const     val = this.props.dijkstra;

        return(
            <div>
                <Navbar dark expand="md" className="nav-bg">
                    <div className="container row">
                        <NavbarToggler onClick={this.togglefunc}/>

                            <NavbarBrand className="mr-auto" href="/">
                                Alog - Visualizer
                            </NavbarBrand>
                    </div>

                    {/* <Collapse isOpen={this.state.isNavOpen} className="collapse navbar-collapse">
                        <Nav className="ml-auto">
                            <NavItem className="navbar-nav">
                                <NavLink className="nav-link" to="/"> Home </NavLink>
                                <NavLink className="nav-link" to="/"> About </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse> */}
                </Navbar>
                
                <Navbar className='nav-bg1'>
                    <div className="container row">
                        
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type='select' className="select" name='algo' onChange={(e) => this.setState({ algo: e.target.value })}>
                                        <option value='null'>Algorithm</option>
                                        <option value='Dijkstra'>Dijkstra</option>
                                        <option value='BFS'>BFS</option>
                                        <option value='GBFS'>Greedy BFS</option>
                                        <option value='DFS'>DFS</option>
                                        <option value='BBFS'>Bi-Directional BFS</option>
                                        <option value='A*'>A star</option>
                                    </Input>
                                </FormGroup>
                                
                                <button type="submit" value="submit" className="btn btn-outline-info sub-btn"  >{`visualize ${this.state.algo !== 'null'? this.state.algo : '' }`} </button>
                            </Form>
                            <button className="btn btn-primary btn-1" onClick={() => this.props.randomGrid()}>Random Grid</button>
                            <button className="btn btn-primary btn-2" onClick={() => this.props.clearGrid()}>clearGrid</button>

                        
                    </div>


                </Navbar>
                    
            </div>
        );
    }

}


export default Header;