import { useState, useMemo } from 'react';

import { flexRender } from '@tanstack/react-table'

import { ButtonGroup, IconButton } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp, FirstPageRounded, LastPageRounded, NavigateBeforeRounded, NavigateNextRounded } from '@mui/icons-material';
import './Basic-Table.css'
import { NumberInput } from '@mantine/core';


export default function BasicTable({ ...props }) {

    const table = useMemo(() => props.table, [props.table])
    const [pageValue, setPageValue] = useState<number | undefined>(undefined);

    function handleFirstPage(): void {
        table.setPageIndex(0);
        setPageValue(1);
    }

    function handlePrevPage(): void {
        table.previousPage();
        setPageValue(pageValue && pageValue - 1);
    }

    function handleNextPage(): void {
        table.nextPage();
        setPageValue(pageValue && pageValue + 1);
    }

    function handleLastPage(): void {
        table.setPageIndex(table.getPageCount() - 1);
        setPageValue(table.getPageCount());
    }

    return (
        <div>
            <table className='basic-table'>
                <thead>
                    {table.getHeaderGroups().map((headerGroup: any) =>
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) =>
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.column.columnDef.isPlaceholder ?
                                        <div className='header-cell'>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div> :
                                        <div style={{ display: 'flex', gap: '.5rem' }}{...{
                                            className: header.column.getCanSort()
                                                ? 'cursor-pointer noselect'
                                                : '',
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
            </table >
            {(table.getPageCount() > 1 ?
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '1rem' }}>
                    <p style={{ paddingRight: '1rem', fontSize: '14px' }}>
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
                    </p>
                    <ButtonGroup size='small'>
                        <IconButton size='small' onClick={handleFirstPage} disabled={!table.getCanPreviousPage()}><FirstPageRounded fontSize='small' /></IconButton>
                        <IconButton size='small' onClick={handlePrevPage} disabled={!table.getCanPreviousPage()}><NavigateBeforeRounded fontSize='small' /></IconButton>
                        <NumberInput
                            type="number"
                            styles={{ input: { width: "15ch" } }}
                            placeholder='Aller à'
                            defaultValue={undefined}
                            value={pageValue}
                            onChange={(value: number) => {
                                setPageValue(value);
                                table.setPageIndex(value - 1)
                            }}
                            min={1}
                            max={table.getPageCount()}
                            hideControls
                        />
                        <IconButton size='small' onClick={handleNextPage} disabled={!table.getCanNextPage()}><NavigateNextRounded fontSize='small' /></IconButton>
                        <IconButton size='small' onClick={handleLastPage} disabled={!table.getCanNextPage()} > <LastPageRounded fontSize='small' /></IconButton>
                    </ButtonGroup>
                </div>
                : null)
            }
        </div >
    )
}