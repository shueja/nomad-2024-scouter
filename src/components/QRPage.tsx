import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { observer } from 'mobx-react';

type Props = {}

type State = {}

class QRPage extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
  state = {}
  options : any = {
	text: "google.com",
	correctLevel: QRCode.CorrectLevel.L,
    quietZone: 15,
    quietZoneColor: '#FFFFFF'
  };
  qrCodeRef = React.createRef<HTMLDivElement>();
  updateListenerHandle = autorun(()=>{});
  constructor(props: Props) {
    super(props);

  }

  componentDidMount() {
    this.updateListenerHandle = autorun(()=>{
      this.options.text = this.context.data.qr();
      if(this.qrCodeRef.current) {
          this.qrCodeRef.current.replaceChildren();
          new QRCode(this.qrCodeRef.current, this.options);
      }
    })
  }

  componentWillUnmount(): void {
    this.updateListenerHandle(); 
  }

  render() {    
    return (
      <>
        <div style={{display: (this.context.data.page == 5) ? "block": "none"}}>
          <button onClick={()=>{this.context.data.autoCones.high.inc()}}>test</button>
          <div ref={this.qrCodeRef}></div>
        </div>
      </>
    )
  }
}

export default observer(QRPage)