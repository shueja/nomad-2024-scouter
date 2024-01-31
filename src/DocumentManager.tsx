import { type } from "@testing-library/user-event/dist/type";
import { cast, Instance, types, unprotect } from "mobx-state-tree";
import { createContext } from "react";
import { getSchedule, getTeams, getTeamsForMatch } from "./TBAInterface";

export const NumberEntry = types.model({
    value : 0,
    label: ""
})
.actions((self)=>{
    return {
        set(val: number) {
            self.value = val;
        },
        inc() {
            self.value ++;
        },
        dec() {
            if (self.value == 0 ) {
                return;
            }
            self.value--;
        }   
    }
})
.views((self)=>{
    return {
        qr() {
            return `${self.label}=${self.value}&`;
        }
    }
})

export interface INumberEntry
  extends Instance<typeof NumberEntry> {}

export const PieceListStore = types.model({
    high: NumberEntry,
    mid: NumberEntry,
    low: NumberEntry
}).views((self)=>{
    return {
        qr() {
            return self.high.qr() + self.mid.qr() + self.low.qr();
        }
    }
}).actions((self)=>{
    return {
        reset() {
            self.high.set(0);
            self.mid.set(0);
            self.low.set(0);
        }
    }
});
export interface IPieceListStore
  extends Instance<typeof PieceListStore> {}

export const Ratings = types.model({
    intake:0,
    speed:0,
    speaker:0,
    amp: 0
}).actions((self)=>{
    return {
        setIntake(val:number) {self.intake = val},
        setSpeed(val:number) {self.speed = val},
        setSpeaker(val: number) {self.speaker = val},
        setAmp(val:number) {self.amp = val},
        reset() {
            self.intake = self.speed = self.speaker = self.amp;
        }

    }
}).views((self)=>{
    return {
        qr() {
            return `ri=${self.intake}&rd=${self.speed}&rs=${self.speaker}&ra=${self.amp}&`
        }
    }
})


export const DataStore = types
.model({
    event: types.string,
    teams: types.array(types.string),
    initials: "",
    team: "",
    match: "",
    level: "qm",
    page: 0,
    autoSpeaker: NumberEntry,
    autoAmp: NumberEntry,
    teleSpeaker: NumberEntry,
    teleAmp: NumberEntry,
    autoCrossed: false,
    teleClimb:0,

    playedDefense: false,
    rate: Ratings,
    comments: ""
})
.actions((self)=>{
    return {
    }
})
.actions((self)=>{
    return {
        reset() {
            self.team="";
            self.teams=cast([]);
            self.match="";
            self.autoSpeaker.set(0);
            self.autoAmp.set(0);
            self.teleSpeaker.set(0);
            self.teleAmp.set(0);
            self.autoCrossed = false;
            self.teleClimb = 0;
            self.playedDefense = false;
            self.rate.reset();
            self.comments = "";
            self.page = 0;
            
        },
        init() {
            unprotect(self.rate);
        },
        setPlayedDefense(defense: boolean) {
            self.playedDefense = defense;
        },
        setInitials(initials:string) {
            self.initials = initials;
        },
        setEventCode(code:string) {
            self.event = code;
            getTeams(code);
            getSchedule(code);
            self.teams = cast(getTeamsForMatch(self.event, self.match, self.level));
        },
        setTeam(team:string) {
            self.team = team;
        },
        setMatch(num:string) {
            self.match = num;
            self.teams = cast(getTeamsForMatch(self.event, self.match, self.level));
            console.log(self.teams);
        },
        setUiPage(page : number) {
            self.page = page;
        },
        nextPage() {
            self.page = (self.page + 1) % 5;
        },
        prevPage() {
            self.page = (self.page - 1) % 5;
            if (self.page == -1) {
                self.page = 4;
            }
            console.log(self.page)
        },
        setAutoCross(autoCross: boolean) {
            self.autoCrossed = autoCross
        },
        setTeleClimb(teleClimb:number) {
            self.teleClimb = teleClimb
        },
        setComments(comments: string) {
            self.comments = comments;
        },

    }
})
.views((self)=>{
    return{
        qr() {
            
            var text = "";
            // match info
            text += `i=${self.initials}&t=${self.team}&m=${self.match}&l=${self.level}&`;
            // auto
            text += `as=${self.autoSpeaker.value}&aa=${self.autoAmp.value}&`;
            text += `am=${self.autoCrossed ? 1 : 0}&`
            text += `ts=${self.teleSpeaker.value}&ta=${self.teleAmp.value}&`
            text += `pd=${self.playedDefense ? 1 : 0}&tc=${self.teleClimb}&`
            text += self.rate.qr();

            var comments = self.comments.replaceAll('\n', "|").replaceAll('&', "[and]").replaceAll('=', '[equals]');
            text += `comments=${comments}&`
            //console.log(text)
            return text;
        }
    }

})



export class DocumentManager {
    data = DataStore.create({
        event: "2023cabl",
        autoSpeaker: NumberEntry.create(),
        autoAmp: NumberEntry.create(),
        teleSpeaker: NumberEntry.create(),
        teleAmp: NumberEntry.create(),
        rate: Ratings.create({}),
        comments: ""
    });
}

let DocumentManagerContext = createContext(new DocumentManager());
export default DocumentManagerContext;