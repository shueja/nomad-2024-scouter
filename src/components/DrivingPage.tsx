import React, { Component } from 'react'
import {observer} from 'mobx-react'
import DocumentManagerContext from '../DocumentManager';
import { Divider, FormControlLabel, FormGroup, Rating } from '@mui/material';

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
        <div style={{display: (this.context.data.page == 3) ? "block": "none", marginBottom:"10px"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems: "center", justifyContent:"space-around", gap: "20px"}}>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating max={3} size="large" value={this.context.data.rate.intake} onChange={(e, val)=>{this.context.data.rate.setIntake(val || 0)}}/>}
                label="Intaking"
                
                 />
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating max={3} size="large" value={this.context.data.rate.speed} onChange={(e, val)=>{this.context.data.rate.setSpeed(val || 0)}}/>}
                label="Driving Speed"
                 />
            </FormGroup>
            <Divider variant="middle" flexItem={true}>Scoring Consistency/Speed</Divider>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating max={3} size="large" value={this.context.data.rate.speaker} onChange={(e, val)=>{this.context.data.rate.setSpeaker(val || 0)}}/>}
                label="Speaker"
                 />
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating max={3} size="large" value={this.context.data.rate.amp} onChange={(e, val)=>{this.context.data.rate.setAmp(val || 0)}}/>}
                label="Amp"
                 />

            </FormGroup>
            </div>        
            
        </div>
      </>
    )
  }
}

export default observer(DrivingPage)