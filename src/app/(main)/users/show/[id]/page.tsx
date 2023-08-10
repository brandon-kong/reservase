type Props = {
    params: {
        id: string;
    };
};

export default function UserShow({ params }: Props) {
    return <div>UserShow: {params.id}</div>;
}
