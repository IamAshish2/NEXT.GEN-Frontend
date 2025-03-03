
export interface IGlobalStore {
    // activeUrl: string;
    // setActiveUrl: (url: string) => void;
    user: {
    //   role: string;
      token: string;
    //   name:string
    };
    // setUser: (data: { role: string; token: string; name:string }) => void;
    setUser: (data: {token:string}) => void
  }