type UserAccountPageProps = {
    params: {
        id: string;
    }
}

export default function UserAccountPage( { params }: UserAccountPageProps) {
    return (
        <div>
            <h1>
                { params.id }
            </h1>
        </div>
    )
}