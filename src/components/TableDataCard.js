import React from 'react';
import '../css/styles.css';
import '../css/TableDataCard.css';

class TableDataCard extends React.Component {
    state = {
        currency: '$',
    };

    render() {
        const { tableData, graphData, showTableData } = this.props;

        // Helper function for determining the price class
        const getPriceClass = (current, previous) => 
            current > previous ? 'green-text font-weight-bold' : 'red-text font-weight-bold';

        const tableDataDOM = tableData
            .filter(table => table !== "Symbol not supported") // Filter out unsupported symbols
            .map((table, index) => {
                const stockValue = graphData[index]?.stockValue;
                const lastUpdated = new Date(table.t * 1000).toISOString().split('T')[0];
                
                return (
                    <tr key={index}>
                        <th scope="row">{stockValue}</th>
                        <td>{lastUpdated}</td>
                        <td className={getPriceClass(table.o, table.pc)}>{this.state.currency + table.o.toFixed(2)}</td>
                        <td className={getPriceClass(table.l, table.pc)}>{this.state.currency + table.l.toFixed(2)}</td>
                        <td className={getPriceClass(table.h, table.pc)}>{this.state.currency + table.h.toFixed(2)}</td>
                        <td className={getPriceClass(table.pc, table.pc)}>{this.state.currency + table.pc.toFixed(2)}</td>
                        <td className={getPriceClass(table.c, table.pc)}>{this.state.currency + table.c.toFixed(2)}</td>
                        <td className={getPriceClass(table.c, table.pc)}>{(100 - (table.pc / table.c) * 100).toFixed(2) + '%'}</td>
                    </tr>
                );
            });

        return (
            <div className="card card-container table-data">
                <div className="card-body">
                    <h2 className="h6 mb-3">Latest available data:</h2>
                    {showTableData ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Stock Code</th>
                                    <th scope="col">Last Updated Data</th>
                                    <th scope="col">Open Price</th>
                                    <th scope="col">Low Price</th>
                                    <th scope="col">High Price</th>
                                    <th scope="col">Previous Close Price</th>
                                    <th scope="col">Current Price</th>
                                    <th scope="col">% From Yesterday</th>
                                </tr>
                            </thead>
                            <tbody>{tableDataDOM}</tbody>
                        </table>
                    ) : (
                        <p className="mb-0 no-data-message">There are currently no available data. Please search stock code for more details.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default TableDataCard;
