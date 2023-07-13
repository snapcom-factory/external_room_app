import * as React from 'react';

import { flexRender } from '@tanstack/react-table'

import { ButtonGroup, IconButton } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, FirstPageRounded, LastPageRounded, NavigateBeforeRounded, NavigateNextRounded } from '@mui/icons-material';
import './Basic-Table.css'


export default function BasicTable({ ...props }) {

    // const data = React.useMemo(() => props.db, [props.db])

    // const [sorting, setSorting] = React.useState<SortingState>([])
    // const [globalFilter, setGlobalFilter] = React.useState('')

    // const table = useReactTable({
    //     data,
    //     columns: props.columns,
    //     state: {
    //         sorting: sorting,
    //         globalFilter: globalFilter,
    //     },
    //     enableRowSelection: true,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     onSortingChange: setSorting,
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onGlobalFilterChange: setGlobalFilter,

    //     // debugTable: true,
    // })

    const table = React.useMemo(() => props.table, [props.table])

    return (
        <div>

            <table className='basic-table'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup: any) =>
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) =>
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
                    {table.getRowModel().rows.map((row: any) =>
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell: any) =>
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>

            </table>

            {(table.getPageCount() > 1 ?
                <ButtonGroup size='small' sx={{ position: 'fixed', bottom: '10px' }}>
                    <IconButton size='small' onClick={() => table.setPageIndex(0)}><FirstPageRounded /></IconButton>
                    <IconButton size='small' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><NavigateBeforeRounded /></IconButton>
                    {/* <input type="number" /> */}
                    <IconButton size='small' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><NavigateNextRounded /></IconButton>
                    <IconButton size='small' onClick={() => table.setPageIndex(table.getPageCount() - 1)}><LastPageRounded /></IconButton>
                </ButtonGroup>
                : null)
            }

        </div>
    )
}