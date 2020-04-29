import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import _ from "lodash";
import { FormControl, Button, Row, Col } from 'react-bootstrap';
import ModalObjectContent from '../Object/Object';
import { fetchRoomById, showModal, fetchRouteByEnterId, closeSearch, fetchSearch } from '../../../../redux/actions';
import "./styles.css";


function search(query, searchQuery) {
  if(query.length > 1){
    searchQuery(query);
  }
}

// Наш хук
function useDebounce(value, delay) {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение) 
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

function SearchBox({ searchQuery, closeSearch }) {
  // Состояние и сеттер состояния для поискового запроса
  const [searchTerm, setSearchTerm] = useState('');
  // Состояние и сеттер состояния для результатов поиска
  const [results, setResults] = useState([]);
  // Состояние для статуса поиска (есть ли ожидающий запрос API)
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      // Убедиться что у нас есть значение (пользователь ввел что-то)
      if (debouncedSearchTerm) {
        search(debouncedSearchTerm, searchQuery);
      } else {
        closeSearch();
      }
    },
    // Это массив зависимостей useEffect
    // Хук useEffect сработает только если отложенное значение изменится ...
    // ... и спасибо нашему хуку, что оно изменится только тогда ...
    // когда значение searchTerm не менялось на протяжении 500ms.
    [debouncedSearchTerm]
  );

  return (
    <FormControl type="text" placeholder="Что вы ищите?" className="mr-sm-2" onChange={e => { setSearchTerm(e.target.value); }} />
  );
}



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {

    return (
      <div>
        <Row>
          <Col>
            <SearchBox searchQuery={this.props.fetchSearch} closeSearch={this.props.closeSearch} />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="search-example">Например: 307, деканат фпк, Кафедра геодезии</p>
          </Col>
        </Row>
        <div className="search-results">
          {this.props.searchResults.length > 0 &&
            _.map(this.props.searchResults, (result, key) => {
              console.log(result);
              const actualName = result.name === null || result.name === "" ? "Ауд. " + result.numb : result.name;
              const currentBuild = _.find(this.props.allBuilds, (o) => {
                return o.id === result.build_id;
              });
              return (
                <Row key={key} className="search-result" onClick={() => {
                    this.props.fetchRoomById(result.id);
                    this.props.showModal({ header: actualName, content: ModalObjectContent, className: "modal-small", isMapboxObject: true });
                  }}>
                    <Col>
                      <Row>
                        <Col className="result-build">
                          {currentBuild.name}
                        </Col>
                        <Col className="result-floor">
                          {result.floor} этаж
                        </Col>
                      </Row>
                      <Row>
                        <Col className="result-name">
                          {actualName}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="result-number">
                        №{result.numb}
                        </Col>
                      </Row>
                    </Col>
                </Row>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.apollo.search.results,
    allBuilds: state.mapbox.builds.data,
  };
};

export default connect(
  mapStateToProps,
  { fetchRoomById, showModal, fetchRouteByEnterId, fetchSearch, closeSearch },
)(Search);