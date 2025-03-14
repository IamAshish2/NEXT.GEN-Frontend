import { create } from "zustand";
import { IOpenPostCard } from "./interface";

// content
// image
// file

export const useOpenPostCard = create<IOpenPostCard>((set) => ({
    open:false,
    setOpen: (newOpen:boolean) => set({open:newOpen})
}));