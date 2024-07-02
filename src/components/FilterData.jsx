import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FilterData = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const [Sort, setSort] = useState("")
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filtering = (event) => {
        setFilter(event.target.value)
    }

    const sorting = (event) => {
        console.log(event.target.value)
        setSort(event.target.value)
    }

    //// filter data
    const filterData = data
        .filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase())
        })
        .filter((item) => {
            return filter ? item.address.city === filter : true
        })
        .sort((a, b) => {
            if (Sort === 'asc') {
                return a.username.localeCompare(b.username)
            } else if (Sort === 'desc') {
                return b.username.localeCompare(a.username)
            }
        })

    const cityData = data.map((item) => { return item.address.city })
    return (
        <div>
            <div className="row mb-4 mx-0">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-4">
                    <select className='form-select' onChange={filtering}>
                        <option value="">filter by city</option>
                        {
                            cityData.map((city) => (
                                <option value={city}>{city}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-control" onChange={sorting}>
                        <option value="">Sort by Username</option>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-hover table-success table-bordered border-dark text-center">
                    <thead className='table-dark'>
                        <tr>
                            <th>S.No.</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.city}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FilterData
