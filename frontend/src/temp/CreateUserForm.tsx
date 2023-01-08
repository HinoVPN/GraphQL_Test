import {Form, Button, Container } from 'react-bootstrap'  
import { useForm, Controller ,SubmitHandler } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { gql, useMutation } from '@apollo/client';

type UserFormInput = {
  name: string;
  phone: number;
  email: string;
  password: string
  country: string;
};



const submit = gql`
    mutation addUser($userInfo: UserInput!) {
      addUser(userInfo: $userInfo) {
          _id
          name
          email
          password
          country
      }
    }
`;


function CreateUserForm() {
  const [createUser, { data, loading, error }] = useMutation(submit);
  const { register,handleSubmit,formState: { errors } } = useForm<UserFormInput>();
  const onSubmit: SubmitHandler<UserFormInput> = data => {
    console.log(data)
    createUser({variables:{userInfo: data}})
  }

  return (
    <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <input className='form-control'
          type="text"
          placeholder='Enter your name'
          {...register("name", { required: "This is required." })} />
        
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </Form.Group>

        

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
            <input
              className='form-control'
              type="text" 
              placeholder="Phone number" 
              {...register("phone", { 
                required: "This is required.",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => <p className="text-danger">{message}</p>}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <input
            className='form-control'
            type="email" 
            placeholder="Enter email" 
            {...register("email", { 
              required: "This is required.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <input
            className='form-control'
            type="password" 
            placeholder="Enter password" 
            {...register("password", { 
              required: "This is required.",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select 
            {...register("country", { 
              validate: value => value != 'default' || "This is required."
            })}
          >
            <option value="default">Select</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Taiwan">Taiwan</option>
          </Form.Select>

          <ErrorMessage
            errors={errors}
            name="country"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    
  );
}

export default CreateUserForm;