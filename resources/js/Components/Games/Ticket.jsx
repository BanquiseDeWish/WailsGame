export default function Ticket({id, number=0, ...props}) {
    return (
    <div className="ticket" id={id} {...props}>
        {number}
    </div>);
}