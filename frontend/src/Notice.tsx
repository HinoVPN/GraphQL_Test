import { gql, useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const findNoticeById = gql`
    query findNoticeById($notice_id: String!){
        findNoticeById(notice_id: $notice_id){
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
                _id
                name
        }
        }   
    }
`;

export default function Notice() {

    const location = useLocation();
    const { data, loading, error } = useQuery(findNoticeById,{variables:{notice_id: location.state._id}});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! {error.message}</p>;
    return (
        <div>
            <div className="allNoticeSection">
            {
            data.findNoticeById && data.findNoticeById.map(({
                title,
                createdAt,
                type,
                lostDate,
                description,
                venue,
                contact}:{
                title:String,
                createdAt:String,
                type:String,
                lostDate:String,
                description:String,
                venue:String,
                contact:String
                })=>{
            return(
            <div className="allNoticeContainer container d-grid gap-3">
                <h1>{title}</h1>
                <div className="itemSection">
                    <div className="itemContainer container">
                        <div className="items d-grid gap-3">
                            <div className="row mb-2" style={{ display: "flex", justifyContent: "space-around" }}>
                                <div className="container d-grid gap-3">
                                    <div className="container-fluid d-flex justify-content-center">
                                        Logo
                                    </div>
                                    
                                        <div className="container">
                                            <div className="text-start">
                                                <h5>Lost Date: {lostDate}</h5>
                                            </div>
                                            <div className="text-start">
                                                <h3>Venue: {venue}</h3>
                                            </div>
                                            <hr className="bg-dark border-1 border-top border-dark" />
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <p className="text-start fw-normal text-muted">Created Date: {createdAt}</p>
                                                </div>
                                                <div className="col">
                                                    <p className="text-end fw-normal text-muted">State: {type}</p>
                                                </div>
                                            </div>

                                            <div className="text-start fs-4 fw-normal">Description</div>

                                            <p className="text-start lh-lg">{description}</p>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )})}
            </div>
        </div>
  )
}
