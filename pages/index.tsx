import React, { useEffect, useState } from 'react';
import LandingPage from '@/components/LandingPage';

interface UserData {
    userId: string | null;
    username: string | null;
    hasRatings: boolean
}

function Index() {

    return (
        <div className='index-app' suppressHydrationWarning={true}>
            <LandingPage />
        </div>
    );

}

export default Index;