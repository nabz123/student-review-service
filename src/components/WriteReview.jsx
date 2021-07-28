const WriteReview = () => {
    return (
        <div className="review">
            <form>
                <label for="room">Rate the room (between 1 and 5):</label>
                <input type="range" id="room" name="room" step="1" min="1" max="5" labels="1, 2, 3, 4, 5" /><br />

                <label for="building">Rate the building (between 1 and 5):</label>
                <input type="range" id="building" name="building" min="1" max="5" /><br />

                <label for="bathroom">Rate the bathroom (between 1 and 5):</label>
                <input type="range" id="bathroom" name="bathroom" min="1" max="5" /><br />

                <label for="location">Rate the location (between 1 and 5):</label>
                <input type="range" id="location" name="location" min="1" max="5" /><br />
                
            </form>
        </div>
    );
}


 
export default WriteReview;
