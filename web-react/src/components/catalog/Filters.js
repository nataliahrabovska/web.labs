import './Filters.css';

function Filters() {
    return(
        <div className="filters">
            <input className="filter-inp" placeholder={'price'} type={'text'}/>
            <input className="filter-inp" placeholder={'model'} type={'text'}/>
            <input className="filter-inp" placeholder={'screen-size'} type={'text'}/>
            <button type={"onClick"}>
                Apply
            </button>
        </div>
    )
}

export default Filters