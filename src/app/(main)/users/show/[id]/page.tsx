import UsersShowView from '@/components/layout/Users/Show';

type Props = {
    params: {
        id: string;
    };
};

export default function UserShow({ params }: Props) {
    return <UsersShowView id={params.id} />;
}
