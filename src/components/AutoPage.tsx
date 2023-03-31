import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import { Square } from '@mui/icons-material';
import PieceList from './PieceList';

type Props = {}

type State = {}

class AutoPage extends Component<Props, State> {
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
        <div style={{display: (this.context.data.page == 1) ? "block": "none", marginBottom:"10px"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <PieceList pieceList={this.context.data.autoCones} color="yellow" undoSide='right'></PieceList>
              <div style={{display:"flex", flexDirection:"column", flexGrow:1, justifyContent:"space-around", fontSize: "200%"}}>
                <div>H</div>
                <div>M</div>
                <div>L</div>
              </div>
              <PieceList pieceList={this.context.data.autoCubes} color="purple" undoSide='left'></PieceList>
            </div>
            <div>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap:"nowrap"}}>
              <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.autoCrossed}/>} label="Cross Line"
                value={this.context.data.autoCrossed} onChange={(e, val)=>{this.context.data.setAutoCross(val)}} />
            </FormGroup>
            <Divider>Climb</Divider>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap:"nowrap"}}>
              <RadioGroup
                row
                value={this.context.data.autoClimb}
                onChange={(e, val)=>{this.context.data.setAutoClimb(Number.parseInt(e.target.value) || 0)}}
                style={{margin:"auto"}}
              >
                <FormControlLabel value={-1} control={<Radio />} label="Fail" labelPlacement="bottom"/>
                <FormControlLabel value={0} control={<Radio />} label="No Try" labelPlacement="bottom"/>
                <FormControlLabel value={1} control={<Radio />} label="On" labelPlacement="bottom"/>
                <FormControlLabel value={2} control={<Radio />} label="Level" labelPlacement="bottom"/>

              </RadioGroup>
              </FormGroup>
              {/* <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.autoDock}/>} label="On Platform" 
                value={this.context.data.autoDock} onChange={(e, val)=>{this.context.data.setAutoDock(val)}}/>
              <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                
                control={<Checkbox checked={this.context.data.autoLevel}/>} disabled={!this.context.data.autoDock} label="Level Platform"
                value={this.context.data.autoLevel} onChange={(e, val)=>{this.context.data.setAutoLevel(val)}} /> */}
            </div>        
        </div>
      </>
    )
  }
}

export default observer(AutoPage)