import React, { Component } from 'react'
import {observer} from 'mobx-react'
import DocumentManagerContext, { IPieceListStore } from '../DocumentManager';
import PieceEntry from './PieceEntry';

type Props = {
    pieceList: IPieceListStore;
    color: string;
    undoSide: "left" | "right";
}

type State = {}


class PieceList extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
  state = {}


  componentDidMount() {
  }

  componentWillUnmount(): void {
  }

  render() {    
    return (
      <>
              <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                <PieceEntry piece={this.props.pieceList.high} color={this.props.color} undoSide={this.props.undoSide}></PieceEntry>
                <PieceEntry piece={this.props.pieceList.mid} color={this.props.color} undoSide={this.props.undoSide}></PieceEntry>
                <PieceEntry piece={this.props.pieceList.low} color={this.props.color} undoSide={this.props.undoSide}></PieceEntry>

              </div>
      </>
    )
  }
}

export default observer(PieceList)