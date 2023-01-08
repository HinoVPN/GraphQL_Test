import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Col, Row, Stack, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

const getAllNotices = gql`
    query{
        allNotice{
            _id
            createdAt
            userId
            title
            type
            lostDate
            foundDate
            found_user_id
            description
            venue
            contact
            imageDir
            user{
                name
                phone
                email
                country
            }
    }
}
`;

function Notices() {
    const { loading, error, data } = useQuery(getAllNotices);

    const navigate = useNavigate();


    const [checkId, setCheckId] = useState("");
    
    useEffect(()=>{
        if(checkId)
            navigate("/notice",{state:{_id: checkId}})
    }, [checkId])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return(
        <Container>
            <Stack gap={3}>

            
            {
                data.allNotice.map(({_id, title, description, user}:{_id:string, title:string, description:string, user:any}) => {
                    return(
                        <Card key={_id}>
                            <Card.Header as="h5">{title}</Card.Header>
                            <Card.Body>
                            <Row>
                                <Col>{description}</Col>
                                <Col md="1" style={{fontSize:"10px",alignItems: "flex-end",display: "flex"}}>
                                    {user.name}
                                </Col>
                                <Col xs lg="1">
                                    <Button onClick={() =>setCheckId(_id)}>Check</Button>
                                </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            </Stack>
            
            
        </Container>
    )
}
  
export default Notices;