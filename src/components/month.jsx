//Dependencies
import React from 'react';
//Styles
import "./scss/month.scss";

export default class Month extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            //Selecting
            selecting: false
        }

        this.timer = null;
        //Height of the background based on prop
        this.styles = {height: props.percent + "%"}

        this.select_month = this.select_month.bind(this);
    }

    select_month(event) {
        //Click fires after mouseup has fired so props.selected that's set in parent <calendar> will be false
        //Handles click on single month
        if(event.type === "click" && !this.props.selecting) {
            this.props.select_month(this.props.name);

        //When mouse is down parent passes "selecting" as true, only consider drag when mouse is down
        } else if(event.type === "mousemove" && this.props.selecting) {
            //Throttle on the single month instance, it'll take up every instance but on a per case basis it'll throttle
            if (this.timer) {
                clearTimeout(this.timer);
            } 
            this.timer = setTimeout( () => {
                this.props.add_month(this.props.name);
            },50);
            
        }
    }


    render() {
        return (
            //Add dynamic classes if it's selected or being selected
            <div className={`month_container ${this.props.selected ? "selected": ""} 
                 ${((this.props.selecting && this.props.selected) || this.state.selecting) ? "selecting": ""}`} 
                 //mdown, mup, and mout are used to handle clicks with same animation
                 onMouseDown={() => this.setState({selecting: true})}
                 onMouseUp={ () => this.setState({selecting: false})}
                 onMouseOut={ () => this.setState({selecting: false})}
                 //Same handler for both operations
                 onClick={this.select_month} 
                 onMouseMove={this.select_month}
                 >
                <div className="name">{this.props.name}</div>
                <div className="month">
                    <div className="percent" style={this.styles}></div>
                    <div className="documents">{this.props.documenti} doc.</div>
                    <div className="value">{this.props.importo} &euro;</div>
                </div>
            </div>
        )
    }
}