'use client';

import React, { createContext, useContext } from 'react';
import { LoginModal } from '@/components/Modal';

import { useDisclosure } from '@chakra-ui/react';

interface LoginModalContextProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const LoginModalContext = createContext<LoginModalContextProps>({} as LoginModalContextProps);

export const useLoginProvider = () => useContext(LoginModalContext);

type LoginProviderProps = {
    children: React.ReactNode;
};

export const LoginProvider = ({ children }: LoginProviderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LoginModalContext.Provider value={{ isOpen, onOpen, onClose }}>
            <LoginModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
            {children}
        </LoginModalContext.Provider>
    );
};
