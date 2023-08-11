import UsersShowView from '@/components/layout/Users/Show';

type Props = {
    params: {
        id: string;
    };
};

export const dynamic = 'force-dynamic';

export default function UserShow({ params }: Props) {
    return <UsersShowView id={params.id} />;
}
