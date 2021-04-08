import { Card, Image } from 'react-bootstrap'

export default function PostCard({ post }) {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
            </Card.Body>
            <Card.Footer>
                <Image roundedCircle src="https://via.placeholder.com/32"></Image>
            </Card.Footer>
        </Card>
    )
}
