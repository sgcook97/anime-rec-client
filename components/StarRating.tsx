import React, { useState, useEffect } from "react";
import axios from "axios";

const StarRating = ( props : any ) => {

    const api_url = process.env.NEXT_PUBLIC_SAMNROLL_API_URL;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // useEffect(() => {
    //     // Fetch the user's rating for the anime
    //     const fetchUserRating = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://127.0.0.1:8000/api/ratings?userId=${props.userId}&animeId=${props.animeId}`
    //             );
    //             const userRating = response.data.rating || 0;
    //             setRating(userRating);
    //         } catch (error) {
    //             console.error("Error fetching user rating:", error);
    //         }
    //     };

    //     fetchUserRating();
    // }, [props.animeId, props.userId]);

    const handleClick = async (selectedRating : any) => {
        setRating(selectedRating);
    };

    const handleSubmit = async () => {
        if (rating > 0) {
            try { 
                await axios.post(
                    api_url + 'rate-anime',
                    {
                        userId : props.userId,
                        animeId : props.animeId,
                        rating: rating,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                            "Content-Type": "application/json", // Optional content type
                        },
                    }
                );
            } catch (error) {
                console.error("Error submitting rating:", error);
            }
        }
    };

    return (
        <>
            <div>
                {[...Array(10)].map((star, index) => {
                    const ratingValue = index + 1;

                    return (
                        <label  key={index}>
                            <div className="rating-selector">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => handleClick(ratingValue)}
                                />
                                <span>{ratingValue}</span>
                                <span
                                    className={
                                        ratingValue <= (hover || rating)
                                            ? "star fas fa-star"
                                            : "star far fa-star"
                                    }
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                ></span>
                            </div>
                        </label>
                    );
                })}
            </div>
            <button className="submit-rating" onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default StarRating;