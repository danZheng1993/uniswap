import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { getUserDetailsSelector } from 'store/selectors/users';

class UserDetail extends React.Component {
  getUserDetails = () => {
    const { location, getUserDetails } = this.props;
    const query = queryString.parse(location.search);
    const userId = query.user;
    return getUserDetails(userId);
  }

  render() {
    const userDetails = this.getUserDetails();
    console.log(userDetails);
    return false;
  }
}

const mapStateToProps = (state) => ({
  getUserDetails: getUserDetailsSelector(state),
});

export default withRouter(connect(mapStateToProps)(UserDetail));
