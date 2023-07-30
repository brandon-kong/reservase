import { User } from 'next-auth';
import React from 'react';

export type UserSession =
    | (User & {
          id: string;
      })
    | undefined;

export type ProtectedPageProps = {
    children: React.ReactNode;
};

export type ProfileData = {
    name: string,
    joinDate: string,
    reviewCount: number,
}