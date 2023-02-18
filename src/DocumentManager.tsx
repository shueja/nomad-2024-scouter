import { Instance, types } from "mobx-state-tree";
import { createContext } from "react";

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
});
export interface IPieceListStore
  extends Instance<typeof PieceListStore> {}


export const DataStore = types
.model({
    team: 0,
    match: 0,
    level: "qm",
    page: 0,
    autoCones: PieceListStore,
    autoCubes: PieceListStore,
    teleCones: PieceListStore,
    teleCubes: PieceListStore,
    autoCrossed: false,
    autoDock: false,
    autoLevel:false,
    teleDock: false,
    teleLevel: false,

    rateEfficiency: 0,
    rateControl: 0,
})
.actions((self)=>{
    return {
        setUiPage(page : number) {
            self.page = page;
        },
        nextPage() {
            self.page = (self.page + 1) % 6;
        },
        prevPage() {
            self.page = (self.page - 1) % 6;
            if (self.page == -1) {
                self.page = 5;
            }
            console.log(self.page)
        },
        setAutoCross(autoCross: boolean) {
            self.autoCrossed = autoCross
        },
        setAutoDock(autoDock:boolean) {
            self.autoDock = autoDock
        },
        setAutoLevel(autoLevel:boolean) {
            self.autoLevel = autoLevel
        },
        setTeleDock(teleDock:boolean) {
            self.teleDock = teleDock
        },
        setTeleLevel(teleLevel:boolean) {
            self.teleLevel = teleLevel
        },
        setRateEfficiency(rating:number) {
            self.rateEfficiency = rating;
        },
        setRateControl(rating:number) {
            self.rateControl = rating;
        }

    }
})
.views((self)=>{
    return{
        qr() {
            
            var text = "";
            // match info
            text += `t=${self.team}&m=${self.match}&l=${self.level}&`;
            // auto
            text += self.autoCones.qr() + self.autoCubes.qr();
            text += `am=${self.autoCrossed ? 1 : 0}&acs=${self.autoDock ? (self.autoLevel ? 2 : 1) : 0}&`
            text += self.teleCones.qr() + self.teleCubes.qr();
            text += `tcs=${self.teleDock ? (self.teleLevel ? 2 : 1) : 0}&`
            console.log(text)
            return text;
        }
    }

})



export class DocumentManager {
    data = DataStore.create({
        autoCones: PieceListStore.create({
            high:{label:"ahn"},
            mid:{label: "amn"},
            low:{label: "aln"}}),
        autoCubes: PieceListStore.create({
                high:{label:"ahb"},
                mid:{label: "amb"},
                low:{label: "alb"}}),
        teleCones: PieceListStore.create({
            high:{label:"thn"},
            mid:{label: "tmn"},
            low:{label: "tln"}}),
        teleCubes: PieceListStore.create({
            high:{label:"thb"},
            mid:{label: "tmb"},
            low:{label: "tlb"}}),
    });
}

let DocumentManagerContext = createContext(new DocumentManager());
export default DocumentManagerContext;