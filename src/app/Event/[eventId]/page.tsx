"use client";

import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

export default function EventDetails(props: any) {
    const [users, setUsers] = useState([]);
    const [eventObj, setEventObj] = useState<{
        id: number,
        date: string,
        title: string,
        details: string,
        duration: number,
        location: string
    }>();
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(users.length / pageSize);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const event = await axios.get(`https://retoolapi.dev/gerEem/events/${props.params.eventId}`);
                setEventObj(event.data);
                const res = await axios.get(`https://retoolapi.dev/ABoDfk/data`);
                const userEvents = res.data.filter((event: any) => event.eventId === parseInt(props.params.eventId));
                const res2 = await axios.get(`https://retoolapi.dev/OQZP0w/data`);
                const eventIds = userEvents.map((event: any) => event.userId);
                const userList = res2.data.filter((user: any) => eventIds.includes(user.userId));
                setUsers(userList);
                console.log(eventObj)
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, [pageNumber]);

    const getEventsByPage = () => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return users.slice(startIndex, endIndex);
    };

    // console.log(getEventsByPage());
    const handlePageClick = (page: any) => {
        setPageNumber(page);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxPagesToShow = 5;
        const startPage = Math.max(1, pageNumber - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(startPage + maxPagesToShow - 1, Math.ceil(users.length / pageSize));

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
        <>
            <div style={{ height: "auto", backgroundColor: "whitesmoke", borderRadius: 15, color: "black", margin: 15, padding: 15 }}>
                <h1>
                    {eventObj?.title}
                </h1>
                <p style={{ marginTop: 10 }}>
                    {eventObj?.details}
                </p>
                <h3 style={{ marginTop: 5 }}>
                    {eventObj?.date} - Duration: {eventObj?.duration}
                </h3>
                <h4 style={{ marginTop: 5 }}>
                    {eventObj?.location}
                </h4>

                <div className="row mt-5 px-5" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    {getEventsByPage().map((user: any) => (
                        <div key={user.id} className="card my-2">
                            <div className="card-body">
                                <h5 className="card-title">{user.userName}</h5>
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
                        onClick={() => handlePageClick(Math.min(pageNumber + 1, Math.ceil(users.length / pageSize)))}
                        disabled={pageNumber === Math.ceil(users.length / pageSize) || users.length <= 5}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>

    )
}
