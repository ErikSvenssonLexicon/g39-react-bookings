
const Table = props =>{
    return <table className={`table ${props.className}`}>
        <thead>{props.thead}</thead>
        <tbody>{props.tbody}</tbody>
    </table>
}

export default Table;