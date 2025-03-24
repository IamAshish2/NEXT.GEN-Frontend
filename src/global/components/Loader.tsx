import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
            <PacmanLoader color="#E26300" size={25} />
        </div>
    );
};

export default Loader;