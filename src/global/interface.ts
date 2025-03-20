import { IToasterData } from "./components/toaster/interface";

export type IUserData =  {
  userName: string,
  token:string
}

export interface IGlobalStore {
    // activeUrl: string;
    // setActiveUrl: (url: string) => void;
    user : IUserData, 
    // setUser: (data: { role: string; token: string; name:string }) => void;
    setUser: (data: IUserData) => void,
    toaster: IToasterData,
    setToasterData: (data:IToasterData) => void,
    closeToasterData: () => void
  }

export interface IHamburgerStateStore {
  isOpen:boolean,
  setOpen : (open:boolean) => void
}