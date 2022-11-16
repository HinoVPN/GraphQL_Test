import { useQuery, gql } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const getAllUser = gql`
    query allUser {
        allUser {
        _id
        name
        email
        }
    }
`;

const UserCards = (data:[]) => {
    // return data.allUser.map(({_id, name}:{_id:string, name:string}) => (
    //     <div key={_id}>
    //     <h3>{name}</h3>
    //     </div>
    // ))
}

function AllUser() {
    const { loading, error, data } = useQuery(getAllUser);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return(
        <Container className="col-md-5">
            {
                data.allUser.map(({_id, name, email}:{_id:string, name:string, email:string}) => {
                    return(
                        <Card key={_id}>
                            <Card.Header as="h5">{_id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{email}</Card.Title>
                                <Card.Text>
                                    {name}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    )
                })
            }
            
            
        </Container>
    )
}
  
export default AllUser;