import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from './navbar';

const More = () => {
    return (
        <div>
            <NavBar />
            MORE
        </div>
    );
}

export default More;