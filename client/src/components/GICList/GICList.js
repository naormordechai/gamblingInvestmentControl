import React, { useState, useRef, useEffect } from 'react';
import styles from './GICList.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import { GICRow } from '../GICRow/GICRow';

export const GICList = (props) => {
    const [items, setItems] = useState(Array.from({ length: 30 }));
    const [hasMore, setHasMore] = useState(true);
    const [infinitieScrollHeight, setInfinitieScrollHeight] = useState()
    const refList = useRef();

    useEffect(() => {
        if (refList.current && refList.current.offsetHeight) {
            setInfinitieScrollHeight(refList.current.offsetHeight - 50); // 50 => height of header table
        }
    }, [refList.current?.offsetHeight, infinitieScrollHeight])

    const fetchMoreData = () => {
        if (items.length >= 500) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setItems(prevItems => prevItems.concat(Array.from({ length: 30 })))
        }, 1000);
    };


    return (
        <div className={styles.list} ref={refList}>
            <div style={{ paddingRight: items.length > 16 ? 16 : 0 }}>
                <span>Date</span>
                <span>Profit/Loss</span>
                <span>Sum</span>
                <span>&nbsp;</span>
            </div>
            {infinitieScrollHeight && <InfiniteScroll
                dataLength={props.investments.length}
                next={props.fetchMoreData}
                hasMore={props.criteria.hasMore}
                height={infinitieScrollHeight}>
                {props.investments.map(investment => (
                    <GICRow 
                    key={investment._id} 
                    investment={investment} 
                    openDialogHandler={props.onOpenEditDialog} 
                    deleteInvestment={props.onDeleteInestment}/>
                ))}
            </InfiniteScroll>}
        </div>
    )
}
