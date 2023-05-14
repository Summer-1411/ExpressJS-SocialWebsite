import { Link, useParams } from "react-router-dom";
import "./rightbar.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { makeRequest } from "../../axios";

const RightBar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const userId = Number(useParams().id)
    const [friends, setFriends] = useState([])
    console.log({userId});
    console.log({currentUser});
    useEffect(() =>  {
        const getFriends = async () => {
            const res = userId ? 
                await makeRequest.get(`/users/follow?id=${userId}`) : 
                await makeRequest.get(`/users/follow`)
            setFriends(res.data.users)
        }
        getFriends();
    }, [userId])
    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Theo dõi</span>
                    {friends.map((friend) => (
                        <Link to={`/profile/${friend.id}`} className="user" key={friend.id}>
                            <div className="userInfo">
                                <img
                                    src={"../upload/" +friend.profilePic}
                                    alt=""
                                />
                                <span>{friend.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightBar;

