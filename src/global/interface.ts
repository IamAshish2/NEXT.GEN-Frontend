import { IToasterData } from "./components/toaster/interface";

export interface IGlobalStore {
    // activeUrl: string;
    // setActiveUrl: (url: string) => void;
    user: {
    //   role: string;
      token: string;
    //   name:string
    };
    // setUser: (data: { role: string; token: string; name:string }) => void;
    setUser: (data: {token:string}) => void,
    toaster: IToasterData,
    setToasterData: (data:IToasterData) => void,
    closeToasterData: () => void
  }

export interface IHamburgerStateStore {
  isOpen:boolean,
  setOpen : (open:boolean) => void
}