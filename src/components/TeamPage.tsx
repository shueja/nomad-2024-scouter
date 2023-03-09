import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Badge, Button, Checkbox, FormControlLabel, FormGroup, IconButton, MenuItem, Rating, Select, TextField } from '@mui/material';
import { Square } from '@mui/icons-material';
import PieceList from './PieceList';
import { getSchedule, getTeams } from '../TBAInterface';

type Props = {}

type State = {}

class TeamPage extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
  state = {}
  
  constructor(props: Props) {
    super(props);

  }

  componentDidMount() {
   this.refreshEvent();
  }

  refreshEvent() {
    getTeams(this.context.data.event);
    getSchedule(this.context.data.event);
  }

  componentWillUnmount(): void {
  }

  render() {
    var event = this.context.data.event;
    var teams = this.context.data.teams;

    return (
      <>
        <div style={{display: (this.context.data.page == 0) ? "block": "none", height:"100%"}}>
            <div style={{display:"flex", flexDirection:"column", height:"100%", padding: "20px", gap:"20px"}}>
            <TextField label="Initials" variant="outlined" onChange={(e)=>this.context.data.setInitials(e.target.value)}/>
            <TextField label="Match" variant="outlined" value={this.context.data.match} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}} 
            onChange={(e)=>{
                    this.context.data.setMatch(e.target.value)
                }
                }/>
            
            {this.context.data.teams.length == 0 &&
            <TextField label="Team" variant="outlined" value={this.context.data.team} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}} 
            onChange={(e)=>{
                    this.context.data.setTeam(e.target.value)
                }
                }/>
            }
            {this.context.data.teams.length != 0 &&
            <Select variant="outlined" label="Select Team" value={this.context.data.team} onChange={(e)=>this.context.data.setTeam(e.target.value)}>
                {this.context.data.teams.map((value)=>{return <MenuItem value={value}>{value}</MenuItem>})}
             </Select>
            }

            <TextField label="Event Code" variant="outlined" disabled value={this.context.data.event} onChange={(e)=>{
                this.context.data.setEventCode(e.target.value);
                this.refreshEvent();
            }}></TextField>

            </div>
        </div>
      </>
    )
  }
}

export default observer(TeamPage)