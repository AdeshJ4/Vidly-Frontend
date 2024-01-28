import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'


// data = customer data / movie data /genre data / rental data
// columns = columns contain CRUD Operation and Fields Names
// sortColumns = initially how data should be sorted like asc or desc
// onSort = if you click on field name then data should be reversed

const Table = ({columns, data, sortColumn, onSort}) => {
  return (
    <>
        <table className='table table-bordered'>
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody columns={columns} data={data}/>
        </table>
    </>
  )
}

export default Table