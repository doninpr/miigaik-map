import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
//import { тут можно импортировать те или иные события для вызова } from '../../redux/actions';
import "./styles.css";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div>
        <p>Проект находится в режиме beta-тестирования. Если вы обнаружили недоработки или у вас есть идеи и пожелания, то напишите нам об этом по адресу info@datamaplab.ru.</p>
        <p>Карта была разработана сотрудниками Лаборатории геоданных DataMap и студентами МИИГАиК при поддержке аппарата ректора.</p>
        <p>В разработке принимали участие:</p>
        <ul>
          <li>Бандуркина Ксения: сбор и обработка данных</li>
          <li>Семененко Александр: BackEnd разработка</li>
          <li>Жуков Кирилл: сбор и обработка данных</li>
          <li>Андрей Иванов: FrontEnd разработка</li>
          <li>Павел Донин: FrontEnd разработка</li>
          <li>Гамова Анна: сбор и обработка данных</li>
          <li>Канаев Кирилл: сбор и обработка данных</li>
          <li>Коршунова Мария: сбор и обработка данных</li>
          <li>Смертин Кирилл: сбор и обработка данных</li>
          <li>Кашурников Денис: сбор и обработка данных</li>
        </ul>
        <p>Отдельная благодарность аппарату ректора за поддержку проекта.</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(
  mapStateToProps,
  {  },
)(Info);