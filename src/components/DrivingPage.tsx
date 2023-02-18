import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Rating } from '@mui/material';
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
      <>
        <div style={{display: (this.context.data.page == 3) ? "block": "none"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
            <FormGroup row={true}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rateEfficiency} onChange={(e, val)=>{this.context.data.setRateEfficiency(val || 0)}}/>}
                label="Efficiency"
                 />
            <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rateControl} onChange={(e, val)=>{this.context.data.setRateControl(val || 0)}}/>}
                label="Control"
                 />
            </FormGroup>
            </div>        
            
        </div>
      </>
    )
  }
}

export default observer(DrivingPage)