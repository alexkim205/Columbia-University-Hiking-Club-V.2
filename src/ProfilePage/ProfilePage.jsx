import React       from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ProfilePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        school: '',
        phoneNumber: '',
        interestInDriving: '',
        interestInHiking: '',
        medicalConditions: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount () {
    // Get id of current user
    const {user} = this.props;
    const {id} = user;
    this.props.dispatch(userActions.getById(id));
  }

  handleChange (event) {
    const {name, value} = event.target;
    const {user} = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleUpdate (submit) {

  }

  render () {
    return (
      <div></div>
    )
  }
}

function mapStateToProps (state) {
  const {user} = state.authentication;
  const {item} = state.profile;
  return {
    user,
    item, // current user profile
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };