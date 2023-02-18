import React, { Component, RefObject } from 'react'
import {autorun} from 'mobx'
import QRCode from 'easyqrcodejs'
import DocumentManagerContext from '../DocumentManager';
import { Button, Fab, MobileStepper, Tab, Tabs } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { observer } from 'mobx-react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';

type Props = {}

type State = {}

class Footer extends Component<Props, State> {
    static contextType = DocumentManagerContext;
    declare context: React.ContextType<typeof DocumentManagerContext>;
    labels = ["Team", "Auto", "Tele", "Driving", "Notes", "Scan"]
    render() {
        return <>
                <AppBar position="static">
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <IconButton size="large" onClick={()=>this.context.data.prevPage()}>
                        <KeyboardArrowLeft></KeyboardArrowLeft>
                    </IconButton>
                    {this.labels[this.context.data.page % 6]}
                    <IconButton size="large" onClick={()=>this.context.data.nextPage()}>
                        <KeyboardArrowRight></KeyboardArrowRight>
                    </IconButton>
                </div>
                </AppBar>

{/* 
                <MobileStepper
        variant="text"
        steps={5}
        position="static"
        activeStep={this.context.data.page}
        nextButton={
          <Button
            size="small"
            onClick={()=>this.context.data.nextPage()}
          >
            Next
              <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={()=>this.context.data.prevPage()}>
              <KeyboardArrowLeft />
            Back
          </Button>
        }
      /> */}
        </>
    }
}

export default observer(Footer)