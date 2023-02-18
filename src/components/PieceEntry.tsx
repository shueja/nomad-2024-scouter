import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import {observer} from 'mobx-react'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext, { INumberEntry, IPieceListStore } from '../DocumentManager';
import { Badge, Button, IconButton } from '@mui/material';
import { Square, Clear } from '@mui/icons-material';

type Props = {
    piece: INumberEntry;
    color: string;
    undoSide: "left" | "right";
}

type State = {}


class PieceList extends Component<Props, State> {
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
                <div>
                  {this.props.undoSide === "left" && <IconButton onClick={()=>this.props.piece.dec()}>
                    <Clear></Clear>
                  </IconButton>}
                  <IconButton onClick={()=>this.props.piece.inc()} size='large' style={{color:this.props.color}}>
                  <Badge badgeContent={this.props.piece.value} color="secondary">
                    <Square style={{color:this.props.color, fontSize:'200%'}}></Square>
                    </Badge>
                  </IconButton>
                  {this.props.undoSide === "right" && <IconButton onClick={()=>this.props.piece.dec()}>
                    <Clear></Clear>
                  </IconButton>}
                </div>
      </>
    )
  }
}

export default observer(PieceList)