import React, { Component } from 'react'
import {observer} from 'mobx-react'
import DocumentManagerContext from '../DocumentManager';
import { TextField } from '@mui/material';

type Props = {}

type State = {}

class DrivingPage extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
  state = {}


  componentDidMount() {
  }

  componentWillUnmount(): void {
  }

  render() {    
    return (
        <div style={{display: (this.context.data.page != 4) ? "block": "none"}}>
            <TextField multiline label="Comments" fullWidth value={this.context.data.comments} onChange={(e)=>this.context.data.setComments(e.target.value)}></TextField>      
            
        </div>
    )
  }
}

export default observer(DrivingPage)