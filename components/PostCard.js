import { Card, Image } from 'react-bootstrap'

export default function PostCard({ post }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Footer>
                    <Image roundedCircle src="https://via.placeholder.com/50"></Image>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}
