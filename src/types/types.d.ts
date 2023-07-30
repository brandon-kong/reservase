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
    pk: string;
    name: string;
    join_date: string;
    review_count: number;
    about_me: string;
    location: string;
    first_name: string;
    last_name: string;
};
