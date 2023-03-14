import React, { Component, RefObject } from 'react'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, FormControlLabel, FormGroup, IconButton } from '@mui/material';
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
                style={{flex:"0 0 25%"}}
                value={this.context.data.playedDefense} onChange={(e, val)=>{this.context.data.setPlayedDefense(val)}}/>
              <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.teleDock}/>} label="On Platform" 
                value={this.context.data.teleDock} onChange={(e, val)=>{this.context.data.setTeleDock(val)}}/>
              <FormControlLabel
                style={{flex:"0 0 25%"}}
                labelPlacement='bottom'
                control={<Checkbox checked={this.context.data.teleLevel}/>} disabled={!this.context.data.teleDock} label="Level Platform"
                value={this.context.data.teleLevel} onChange={(e, val)=>{this.context.data.setTeleLevel(val)}} />
            </FormGroup>
            </div>        
            
        </div>
      </>
    )
  }
}

export default observer(TelePage)