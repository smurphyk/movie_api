import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';
import './visibility-filter-input.scss';

function VisibilityFilterInput(props) {
  return <div className="filter-div">
    <Form.Control
      className="filter-field"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Filter Movies"
    /></div>;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);