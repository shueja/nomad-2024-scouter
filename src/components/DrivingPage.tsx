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
      <>
        <div style={{display: (this.context.data.page == 3) ? "block": "none"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems: "center", justifyContent:"space-around", gap: "20px"}}>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.efficiency} onChange={(e, val)=>{this.context.data.rate.setEfficiency(val || 0)}}/>}
                label="Efficiency"
                 />
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.precision} onChange={(e, val)=>{this.context.data.rate.setPrecision(val || 0)}}/>}
                label="Precision"
                 />
            </FormGroup>
            <Divider variant="middle" flexItem={true}>Intaking Consistency/Speed</Divider>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.intakeCone} onChange={(e, val)=>{this.context.data.rate.setIntakeCone(val || 0)}}/>}
                label="Cone"
                 />
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.intakeCube} onChange={(e, val)=>{this.context.data.rate.setIntakeCube(val || 0)}}/>}
                label="Cube"
                 />

            </FormGroup>

            <Divider variant="middle" flexItem={true}>Scoring Consistency/Speed</Divider>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.placeCone} onChange={(e, val)=>{this.context.data.rate.setPlaceCone(val || 0)}}/>}
                label="Cone"
                 />
              <FormControlLabel 
                labelPlacement='bottom'
                control={<Rating value={this.context.data.rate.placeCube} onChange={(e, val)=>{this.context.data.rate.setPlaceCube(val || 0)}}/>}
                label="Cube"
                 />

            </FormGroup>
            </div>        
            
        </div>
      </>
    )
  }
}

export default observer(DrivingPage)