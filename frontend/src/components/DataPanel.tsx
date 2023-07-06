import * as React from 'react'
import { useQuery, useMutation } from 'react-query';
import { Button } from "@openfun/cunningham-react";
import { AddCircle } from '@mui/icons-material';
import FiltersContainer from "./FiltersContainer";


export default function DataPanel({ ...props }) {

  const { isLoading, error, data } = useQuery({
    queryKey: [props.queryKey],
    queryFn: () =>
      fetch(props.urlName).then(res => res.json())
  })

  if (isLoading) return 'Loading...'
  if (error) return 'An error has occurred: ' + JSON.stringify(error)

  // if (data) {
  //   console.log('Data : ', data, typeof (data))
  // }

  return (
    <div className="wrapper data-panel">

      {data.length ? <><FiltersContainer /><span style={{ margin: '1rem 0 1rem 0', border: '1px solid #cacafb' }} /></> : null}

      <div className="table-title">
        <h3>{props.tableName}</h3>
        <Button color="primary" size="small" icon={<AddCircle fontSize="small" />}>Ajouter {props.addBtnName}</Button>
      </div>

      {data.length ?
        <table>
          <thead>
            {props.columns.map(column => <th>{column.headerName}</th>)}
          </thead>
          <tbody>
            {data.map(row =>
              <tr>
                {props.columns.map(cell => {
                  return (
                    <td data-cell={cell.field}>{row[cell.field]}</td>
                  )
                })}
              </tr>




              //   return (
              //     <tr>
              //       <td data-cell="name">
              //         <a href="{% url 'room' room.id %}">{room.name}</a>
              //       </td>
              //       <td data-cell="building">
              //         <a href="{% url 'building' room.building_id.id %}">{room.building_id}</a>
              //       </td>
              //       <td data-cell="floor">{room.floor}</td>
              //       <td data-cell="capacity">{room.capacity}</td>
              //     </tr>
              //   )
            )}
          </tbody>

        </table>
        : 'Pas de salles dans la base de données'
      }
    </div>
  )

}