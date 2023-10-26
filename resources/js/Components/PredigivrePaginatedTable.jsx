import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import GreenButton from './Buttons/GreenButton';

function PredigivrePaginatedTable({ data, itemsPerPage }) {

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='w-full mx-32'>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>
                        Position
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Pseudo
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Points
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    {currentData.map((player, i) => {
                        return (
                            <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    #{player.position}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.user.userName}
                                </Table.Cell>
                                <Table.Cell>
                                    {player.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
            <div className="pagination">
                <GreenButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Précédent
                </GreenButton>
                <GreenButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Suivant
                </GreenButton>
            </div>
            <style>
                {`
                    html,body {
                        overflow-y: auto;
                    }
                `}
            </style>
        </div>

    )


}

export default PredigivrePaginatedTable;
