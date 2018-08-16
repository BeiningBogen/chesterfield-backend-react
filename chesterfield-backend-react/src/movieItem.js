import React from 'react';

const MovieItem = (props) => {

    return (
        <div className="name-form">
              <div className="name-form">
                <input className="name-form" type="text" 
                value={props.question.name}
                onChange={(event) => {
                    const value = event.target.value;
                    props.onChange(value, props.question.questionId)
                }}/>
            </div>
            <div className="name-form">
                <input className="name-form" type="text" value={props.question.alternative1}/>
            </div>
            <div className="name-form">
                <input className="name-form"  type="text" value={props.question.alternative2}/>
            </div>
            <div className="name-form">
                <input className="name-form" type="text" value={props.question.alternative3}/>
            </div>
            <div className="name-form">
                <input className="name-form" type="text" value={props.question.alternative4}/>
            </div>
        </div>
    );
}

export default MovieItem;