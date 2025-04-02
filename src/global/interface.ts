import { AlertColor } from "@mui/material";
import { IToasterData } from "./components/toaster/interface";

export type IUserData =  {
  userName: string,
}

// for use with toaster
export type IResponse = {
  message: string;
  severity: AlertColor | undefined;
};

export interface IGlobalStore {
    // activeUrl: string;
    // setActiveUrl: (url: string) => void;
    user : IUserData, 
    setUser: (data: IUserData) => void,
    toaster: IToasterData,
    setToasterData: (data:IToasterData) => void,
    closeToasterData: () => void
  }

export interface IHamburgerStateStore {
  isOpen:boolean,
  setOpen : (open:boolean) => void
}