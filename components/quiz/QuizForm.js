import React from 'react'
import Input from 'react-toolbox/input';
import { Button } from 'react-toolbox/button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as QuizActions from '../../actions/quiz-actions'

import * as CONFIG from '../../constants/config'

import reduxApi, {transformers} from "redux-api";
import rest from '../../api/rest'

class QuizForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    title: ''
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleSubmit = (e) => {
    this.props.post(null, {
      body: JSON.stringify({
        title: this.state.title
      }),
      headers: {
        "Content-type": "application/json"
      }
    }, (err, data)=> {
      console.log(err, data);
    });

  }

  render() {
    return (
      <section>
        <Input type='text' label='Quiz Title' name='title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')} maxLength={64}/>
        <Button icon='add' label='Add this' flat primary onClick={this.handleSubmit.bind(this)}/>
      </section>
    );
  }
}


function select(state) {
  return {
    quiz: state.quiz
  }
}

function bindDispatchToProps(dispatch) {
  return {
    post: bindActionCreators(rest.actions.apiQuiz.post, dispatch)
  }
}

export default connect(select, bindDispatchToProps)(QuizForm);
