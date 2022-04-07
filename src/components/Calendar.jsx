function Calendar() {
    function generateWeeks() {
        const arr = []

        for (let i = 0; i < 52; i++) {
            arr.push(
                <div className="week">
                    {i}
                    <div className="day monday"   >M</div>
                    <div className="day tuesday"  >T</div>
                    <div className="day wednesday">W</div>
                    <div className="day thursday" >T</div>
                    <div className="day fridayday">F</div>
                    <div className="day saturday" >S</div>
                    <div className="day sunday"   >S</div>
                </div>
            )
        }

        return arr
    }

    return (
        <div>
            {arr}
        </div>
    )
}

export default Calendar