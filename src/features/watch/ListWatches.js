import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Outlet, useParams } from "react-router-dom";
import { getAllWatch, getWatchesByCategory } from "./watchApi";
import WatchItem from "./WatchItem.js";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import WatchToAdmin from "./WatchToAdmin.js";
import './ListWatches.css'

const ListWatches = () => {

    let currentUser1 = useSelector((state) => state.user.currentUser);
    let isAdmin1 = useSelector((state) => state.user.isAdmin);
    let { category } = useParams();
    // let [prevWatches, setPrevWatches] = useState([]);

    let [watches, setWatches] = useState([]);
    let [page, setPage] = useState(1); // סטייט שמקבל את מספר העמוד הנוכחי
    let [isLoading, setIsLoading] = useState(false); // סטייט המציין האם הטעינה מתבצעת כרגע

    useEffect(() => {
        setIsLoading(true);
        loadWatches();
    }, [page]); // טעינת השעונים עם עדכון בסטייט של העמוד

    const loadWatches = () => {
        {/*איך אני מחלקת לקטגוריות*/ }

        getAllWatch(page, "") // 10 - כמות המוצרים להצגה בכל עמוד
            .then(res => {
                setWatches(prevWatches => [...prevWatches, ...res.data]);
                setIsLoading(false); // הטעינה הושלמה
            });
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setPage(prevPage => prevPage + 1); // עדכון העמוד כאשר הגלישה מגיעה לסוף העמוד
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="allWatches">
            {isAdmin1 && watches.map(item => (
                <div key={item._id} className="watch">
                    <WatchToAdmin product={item} watches={watches} setWatches={setWatches} />
                </div>
            ))}

            {!isAdmin1 && watches.map(item => (
                <div key={item._id} className="watch">
                    <WatchItem product={item} />
                </div>
            ))}

            {isLoading && ( // תצוגת ה-CircularProgress כאשר הטעינה נעשית
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" className='loadingOverlay'>
                    <CircularProgress color="secondary" />
                    <CircularProgress color="secondary" />
                    <CircularProgress color="secondary" />
                </Stack>
            )}

            <Outlet />
        </div>
    );
};

export default ListWatches;
