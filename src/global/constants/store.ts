import { create } from "zustand";
import { IHamburgerStateStore } from "../interface";

export const useHamburgerNavigation = create<IHamburgerStateStore>((set) => ({
    isOpen:false,
    setOpen: (isOpen:boolean) => set({isOpen:isOpen})
}))