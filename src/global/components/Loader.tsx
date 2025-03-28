// import React from 'react';
// import { PacmanLoader } from 'react-spinners';

// const Loader = () => {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
//             <PacmanLoader color="#E26300" size={25} />
//         </div>
//     );
// };

// export default Loader;


import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function Loader() {
    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <Progress value={progress} className="w-[60%]" />
        </div>
    )
}
