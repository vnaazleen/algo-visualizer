import { Component } from 'react';
import {Jumbotron,Form, FormGroup, Input} from 'reactstrap';

class Chooser extends Component {
   render(){
       return(
        <Jumbotron>
            <div className="container">
                <div className="row">
                    <Form>
                        <FormGroup>
                            <Input type='select' name='algo' value=''>
                                <option>Algorithm 1</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </Jumbotron>
       );
   } 
}

export default Chooser;