import { connect } from 'react-redux';

export default (mapState) => {  
  const mapStateToProps = (state, props) => {
    const mapped = {
      currencies: state.currencies.data,
      currenciesList: Object.values(state.currencies.data),
      currenciesLoading:state.currencies.loading,
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  
  return connect(mapStateToProps);
}
