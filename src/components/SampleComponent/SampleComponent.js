import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import "./styles.css";

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const windowSize = this.props.windowSize; //так можно получить параметры из хранилища. В данном случае размеры окна. Рендер происходит при каждом изменении этих параметров
    console.log(windowSize);

    return (
      <div>
        тут пилим верстку
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //тут можно передать параметры из хранилища
  	windowSize: state.window,
  };
};

export default connect(
  mapStateToProps,
  {  }, //тут коннектятся к классу события. Вызвать в коде можно через this.props.ИмяСобытия
)(SampleComponent);