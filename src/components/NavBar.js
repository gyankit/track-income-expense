import React, { useReducer, useContext } from 'react';
import AuthContext from '../helper/Context';

function NavBar() {
    const startYear = 2021;
    const context = useContext(AuthContext);

    const saveState = async (data, key) => {
        if (key === 1) {
            context.changeDisplay({ year: data, month: context.displayDate.month, date: context.displayDate.date });
        } else if (key === 2) {
            context.changeDisplay({ year: context.displayDate.year, month: data, date: context.displayDate.date });
            dispatch(data, context.displayDate.year);
        } else {
            context.changeDisplay({ year: context.displayDate.year, month: context.displayDate.month, date: data });
        }
    }

    function reducer(dayCount, month, year) {
        month = Number(month);
        if ([1, 3, 5, 7, 8, 10, 12].includes(month))
            dayCount = 31;
        else if ([4, 6, 9, 11].includes(month))
            dayCount = 30;
        else {
            if ((0 === year % 4) && (0 !== year % 100) && (0 === year % 400))
                dayCount = 29;
            else
                dayCount = 28;
        }
        return dayCount;
    }

    const [dayCount, dispatch] = useReducer(reducer, reducer(0, context.displayDate.month, context.displayDate.year));

    return (
        <div className="navbar">
            <form>
                <select className="form-select" aria-label="Default select year" value={context.displayDate.year} onChange={e => saveState(e.target.value, 1)}>
                    <option disabled>Year</option>
                    {
                        [...Array(context.displayDate.year - startYear)].map((e, i) =>
                            <option key={i} value={context.displayDate.year - i}>{context.displayDate.year - i}</option>
                        )
                    }
                </select>
                <select className="form-select" aria-label="Default select month" value={context.displayDate.month} onChange={e => saveState(e.target.value, 2)}>
                    <option disabled>Month</option>
                    {
                        [...Array(12)].map((e, i) =>
                            <option key={i} value={i + 1}>{i + 1}</option>
                        )
                    }
                </select>
                <select className="form-select" aria-label="Default select date" value={context.displayDate.date} onChange={e => saveState(e.target.value, 3)}>
                    <option disabled>Date</option>
                    {
                        [...Array(dayCount)].map((e, i) =>
                            <option key={i} value={i + 1}>{i + 1}</option>
                        )
                    }
                </select>
            </form>
        </div>
    )
}

export default NavBar