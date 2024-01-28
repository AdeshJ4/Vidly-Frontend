import React from "react";
import _ from 'lodash';

const TableBody = ({ columns, data }) => {
  console.log(data);

  const renderCell = (item, column) => {
    if(column.content) return column.content(item);
    return _.get(item, column.path)
  }

  // creating unique key
  const createKey = (item, column) => {  
    return item.id + (column.path || column.key);
  }
  return (
    
    <tbody>
      {data.map((item) => (   // item = movie, customer
        <tr key={item._id}>
            {columns.map(column=>(
                <td key={createKey(item, column)}>
                    {renderCell(item, column)}
                </td>
            ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
