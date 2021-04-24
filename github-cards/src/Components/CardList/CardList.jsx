import React, { Profiler } from "react";
import Card from "../Card/Card";

class CardList extends React.Component {
    render() {
        return (
            <div>
                {this.props.testData.map(profile => <Card key = {profile.id} {...profile} />)}
            </div>
        )
    }
}


export default CardList;