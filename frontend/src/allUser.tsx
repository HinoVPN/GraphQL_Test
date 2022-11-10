import { useQuery, gql } from '@apollo/client';

const getAllUser = gql`
    query allUser {
        allUser {
        _id
        name
        }
    }
`;

function AllUser() {
    const { loading, error, data } = useQuery(getAllUser);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return data.allUser.map(({_id, name}:{_id:string, name:string}) => (
        <div key={_id}>
        <h3>{name}</h3>
        {/* <img width="400" height="250" alt="location-reference" src={`${photo}`} />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        <br /> */}
        </div>
    ));
}
  
export default AllUser;