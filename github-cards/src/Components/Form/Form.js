import React from "react"

class Form extends React.Component {
    render() {
        return (
            <form action = ""> 
                <input type = "text" placeholder = "Github Username" />
                <button>Add Card</button>
            </form>
        )
    }
}

export default Form;