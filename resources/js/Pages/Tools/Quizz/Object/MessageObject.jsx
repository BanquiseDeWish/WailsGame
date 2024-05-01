const MessageObject = ({ data }) => {

    return (
        <>
            <div className="message">
                <div className="author">
                    {data.player.username}
                </div>
                <div className="content">
                    {data.message}
                </div>
            </div>
        </>
    )

}

export default MessageObject;
