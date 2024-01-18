"use client";

import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 9;
    const totalPages = Math.ceil(events.length / pageSize);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://retoolapi.dev/gerEem/events');
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, [pageNumber]);

    const getEventsByPage = () => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return events.slice(startIndex, endIndex);
    };

    console.log(getEventsByPage());
    const handlePageClick = (page: any) => {
        setPageNumber(page);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, pageNumber - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(startPage + maxPagesToShow - 1, Math.ceil(events.length / pageSize));

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className="btn btn-primary"
                    onClick={() => handlePageClick(i)}
                    disabled={pageNumber === i}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="bg-dark">
            
            <div style={{ backgroundImage: 'url(https://miro.medium.com/v2/resize:fit:1000/1*KDMx1YspSrBcFJG-NDZgDg.png)', backgroundRepeat: "no-repeat", backgroundSize: "100%", backgroundPosition: "center", width: "100%", height: "100vh" }}>

            </div>
            <div className="row mt-5" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                {getEventsByPage().map((event: any) => (
                    <div key={event.id} className="card col-md-4 my-2" style={{ width: "25rem", height: "13rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{event.title}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Duration: {event.duration}</h6>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Date: {event.date}</h6>
                            <p className="card-text">Location: {event.location}</p>
                            <a href={`/Event/${event.id}`} className="card-link">Read More </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex pagination justify-content-evenly mt-5 pb-5 w-50 mx-auto">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageClick(Math.max(1, pageNumber - 1))}
                    disabled={pageNumber === 1}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageClick(Math.min(pageNumber + 1, Math.ceil(events.length / pageSize)))}
                    disabled={pageNumber === Math.ceil(events.length / pageSize)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}