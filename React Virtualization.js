import React, { useEffect, useState } from "react";
import { List,AutoSizer } from "react-virtualized";
import axios from 'axios';

const ReactVirtualization = () => {
  const [data,setData]=useState()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(res.data);
        console.log('Response Data', res.data);
      } catch (error) {
        console.log(error, 'error');
      }
    };
    fetchData();
  }, []);



  const rowRenderer = ({ index, key, style }) => {
    const rowData = data[index];
    return (
      <div key={key} style={style}>
        <span>{rowData.id}</span>
      </div>
    );
  };




  return (
    <div>
      <h1>React Virtualization</h1>
      {data && (
       <AutoSizer disableHeight>
        {({ width }) => (
          <List
            height={400}
            rowCount={data.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
            width={width}
            style={{ backgroundColor: 'red', border: '1px solid #ccc' }}
          />
        )}
      </AutoSizer>
      )}
    </div>
  );


};

export default ReactVirtualization;
