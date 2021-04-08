import { Image, Badge, Button } from 'react-bootstrap'
import Link from 'next/link'
export default function UserInfo(props) {
    return (
        <>
            <Image className="mb-3" roundedCircle src="https://via.placeholder.com/200"></Image>
            <h2 className="font-weight-bold">Louis Morgan</h2>
            <p className="text-muted">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae reiciendis
                corrupti culpa beatae officiis numquam cum.
            </p>
            <div className="mb-4">
                <Badge variant="primary">JavaScript</Badge>{' '}
                <Badge variant="secondary">Reactjs</Badge> <Badge variant="success">Nextjs</Badge>{' '}
                <br />
            </div>
            <Link href="/profile/edit">
                <Button variant="secondary">Edit Profile</Button>
            </Link>
        </>
    )
}
