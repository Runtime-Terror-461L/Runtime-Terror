
import React, { useCallback } from "react";
import MaterialTable from 'material-table';
import { Link } from "@material-ui/core";
import { useState, useEffect} from "react";

var Empty = true;
function DatasetTable(){

    const [List, setList] = useState([]);
    useEffect(() => {
        CreateData().then((data)=> {setList(data)});

    }, []);

    console.log(List);

    var columns = [
        {title: "Name", field: "name", },
        {title: "File Size", field: "filesize"},
        {title: "Tags", field: "tags"},
        {title: "Download", field: "download", render:RowData=><Link href={RowData.download}>Download</Link>}
    ];

    return(
    <MaterialTable
        title="Data"
        data={List}
        columns={columns}></MaterialTable>);

}


async function CreateData() {
    const response = await fetch("http://127.0.0.1:5000/DataSetMetadata");
    const data = await response.json();
    const result = data.Metadata;
    console.log(result);
    var List = [];
    for(let i=0; i<5; i++){
        var entry = result[i];
        List[i]=entry;
    }
    return List
  }
export default DatasetTable