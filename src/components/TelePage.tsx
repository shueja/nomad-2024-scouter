import React, { Component, RefObject } from 'react'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, Radio, RadioGroup } from '@mui/material';
import { Square } from '@mui/icons-material';
import PieceList from './PieceList';

type Props = {}

type State = {}

class TelePage extends Component<Props, State> {
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
        <div style={{display: (this.context.data.page == 2) ? "block": "none"}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <PieceList pieceList={this.context.data.teleCones} color="yellow" undoSide='right'></PieceList>
              <div style={{display:"flex", flexDirection:"column", flexGrow:1, justifyContent:"space-around", fontSize:"200%"}}>
                <div>H</div>
                <div>M</div>
                <div>L</div>
              </div>
              <PieceList pieceList={this.context.data.teleCubes} color="purple" undoSide='left'></PieceList>
            </div>
            <div >
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap:"nowrap"}}>
            <FormControlLabel
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.playedDefense}/>} label="Played Defense" 
                style={{flex:"1 0 25%"}}
                value={this.context.data.playedDefense} onChange={(e, val)=>{this.context.data.setPlayedDefense(val)}}/>
            </FormGroup>
            <Divider>Climb</Divider>
            <FormGroup row={true} style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", flexWrap:"nowrap"}}>
              <RadioGroup
                row
                value={this.context.data.teleClimb}
                onChange={(e, val)=>{this.context.data.setTeleClimb(Number.parseInt(e.target.value) || 0)}}
                style={{margin:"auto"}}
              >
                <FormControlLabel value={-1} control={<Radio />} label="Fail" labelPlacement="bottom"/>
                <FormControlLabel value={0} control={<Radio />} label="No Try" labelPlacement="bottom"/>
                <FormControlLabel value={1} control={<Radio />} label="On" labelPlacement="bottom"/>
                <FormControlLabel value={2} control={<Radio />} label="Level" labelPlacement="bottom"/>

              </RadioGroup>
              </FormGroup>
            </div>        
            
        </div>
      </>
    )
  }
}

export default observer(TelePage)