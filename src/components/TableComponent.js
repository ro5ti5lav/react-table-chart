import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Table } from 'react-bootstrap';
import './TableComponent.css'; // Импортируем CSS файл

const data = [
    { id: 1, name: 'Выручка, руб', current: 500521, previous: 480521, week: 4805121 },
    { id: 2, name: 'Наличные', current: 300000, previous: 300000, week: 300000 },
    { id: 3, name: 'Безналичный расчет', current: 100521, previous: 100521, week: 100521 },
    { id: 4, name: 'Кредитные карты, руб', current: 100521, previous: 100521, week: 100521 },
    { id: 5, name: 'Средний чек, руб', current: 1300, previous: 900, week: 900 },
    { id: 6, name: 'Средний гость, руб', current: 1200, previous: 1100, week: 1100 },
    { id: 7, name: 'Удаления из чека (после оплаты), руб', current: 1000, previous: 1100, week: 900 },
    { id: 8, name: 'Удаления из чека (до оплаты), руб', current: 1300, previous: 1300, week: 900 },
    { id: 9, name: 'Количество чеков', current: 34, previous: 36, week: 34 },
    { id: 10, name: 'Количество гостей', current: 34, previous: 36, week: 32 },
];

const calculatePercentageChange = (current, previous) => {
    if (previous === 0) return 0; // Избегаем деления на ноль
    return Math.round(((current - previous) / previous * 100)); // Округляем до целого числа
};

const formatNumber = (number) => {
    return number.toLocaleString('ru-RU'); // Форматируем число с пробелами
};

const TableComponent = () => {
    const [selectedData, setSelectedData] = useState(null);

    const handleRowClick = (row) => {
        setSelectedData({
            title: row.name,
            series: [{
                name: row.name,
                data: [row.previous, row.current]
            }]
        });
    };

    return (
        <div className="container mt-4">
            <Table striped bordered hover className="custom-table">
                <thead>
                    <tr>
                        <th className="left-align">Показатель</th>
                        <th className="center-align">Текущий день</th>
                        <th className="center-align">Вчера</th>
                        <th className="center-align">Этот день недели</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => {
                        const changeClass = row.current < row.previous ? 'negative' : (row.current > row.previous ? 'positive' : '');
                        return (
                            <tr key={row.id} onClick={() => handleRowClick(row)} className={changeClass}>
                                <td className="left-align">{row.name}</td>
                                <td className="center-align">{formatNumber(row.current)}</td>
                                <td className={`center-align ${calculatePercentageChange(row.current, row.previous) < 0 ? 'negative' : (calculatePercentageChange(row.current, row.previous) > 0 ? 'positive' : '')}`}>
                                    {formatNumber(row.previous)} ({calculatePercentageChange(row.current, row.previous)}%)
                                </td>
                                <td className="center-align">{formatNumber(row.week)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            {selectedData && (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        title: { text: selectedData.title },
                        series: selectedData.series
                    }}
                />
            )}
        </div>
    );
};

export default TableComponent;