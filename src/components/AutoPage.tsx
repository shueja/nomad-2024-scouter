import React, { Component } from 'react'
import {observer} from 'mobx-react'
import DocumentManagerContext from '../DocumentManager';
import { Checkbox, Divider, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import PieceList from './PieceList';
import PieceEntry from './PieceEntry';

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
              <PieceEntry piece={this.context.data.autoSpeaker} color="blue" undoSide='right'></PieceEntry>
              <span>SPKR | AMP</span>
              <PieceEntry piece={this.context.data.autoAmp} color="blue" undoSide='left'></PieceEntry>
            </div>
            <div>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap:"nowrap"}}>
              <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.autoCrossed}/>} label="Cross Line"
                value={this.context.data.autoCrossed} onChange={(e, val)=>{this.context.data.setAutoCross(val)}} />
            </FormGroup>
            {/* <Divider>Climb</Divider>
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
              </FormGroup> */}
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