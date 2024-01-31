import React, { Component } from 'react'
import {autorun} from 'mobx'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { observer } from 'mobx-react';
import { Button } from '@mui/material';
import styles from './QRPage.module.css'

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
          let qrcode = new QRCode(this.qrCodeRef.current, this.options);

          
      }
    })
  }

  componentWillUnmount(): void {
    this.updateListenerHandle(); 
  }

  render() {    
    return (
      <>
        <div style={{display: (this.context.data.page == 4) ? "block": "none"}}>
        <Button variant="contained" onClick={(e)=>this.context.data.reset()}>RESET</Button>

        <div>{`${this.context.data.initials}: ${this.context.data.team}, Match ${this.context.data.match}`}</div>
          <div className={styles.QRDiv} style={{maxWidth: "95vw", height:"auto", margin:"auto"}} ref={this.qrCodeRef}></div>

          
        </div>
      </>
    )
  }
}

export default observer(QRPage)