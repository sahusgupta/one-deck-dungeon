import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WaitingPage() {
    const navigate = useNavigate();

    return (
        <div className='relative z-10 flex flex-col items-center justify-center h-full space-y-8 text-white'> 
            {/* <h1> */}
                WaitingForTeammate ...
            {/* </h1> */}
        </div>
    )
}
export default WaitingPage;