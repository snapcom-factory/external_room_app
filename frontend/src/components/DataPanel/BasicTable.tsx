import * as React from 'react';
import '../../styles/Basic-Table.css'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, SortingState } from '@tanstack/react-table'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';


export default function BasicTable({ ...props }) {

    const data = React.useMemo(() => props.db, [])

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns: props.columns,
        state: {
            rowSelection,
            sorting: sorting,
        },
        enableRowSelection: true,

        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),

        debugTable: true,
    })




    return (
        <table className='basic-table'>
            <thead>
                {table.getHeaderGroups().map(headerGroup =>
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header =>
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder ? null :
                                    <div style={{ display: 'flex', gap: '.5rem' }}{...{
                                        className: header.column.getCanSort()
                                            ? 'cursor-pointer noselect'
                                            : ' ',
                                        onClick: header.column.getToggleSortingHandler(),
                                    }}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {
                                            <div className='sorter-icon-container'>
                                                {{
                                                    asc: <KeyboardArrowUp />,
                                                    desc: <KeyboardArrowDown />
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        }
                                    </div>
                                }
                            </th>
                        )}
                    </tr>
                )}
            </thead>
            <tbody style={{ overflow: 'scroll' }}>
                {table.getRowModel().rows.map(row =>
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell =>
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}