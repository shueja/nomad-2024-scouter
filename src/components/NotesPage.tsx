import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, Divider, FormControlLabel, FormGroup, FormHelperText, IconButton, Rating, TextField, Typography } from '@mui/material';
import { Square } from '@mui/icons-material';
import PieceList from './PieceList';

type Props = {}

type State = {}

class DrivingPage extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
  state = {}
  
  constructor(props: Props) {
    super(props);

  }

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