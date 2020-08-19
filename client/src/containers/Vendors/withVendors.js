import { connect } from 'react-redux';
import { getResourceViews } from 'store/customViews/customViews.selectors';

import {
  getVendorCurrentPageFactory,
  getVendorsTableQuery,
  getVendorsPaginationMetaFactory,
} from 'store/vendors/vendors.selectors';

export default (mapState) => {
  const getVendorsItems = getVendorCurrentPageFactory();
  const getVendorsPaginationMeta = getVendorsPaginationMetaFactory();
  const mapStateToProps = (state, props) => {
    const query = getVendorsTableQuery(state, props);

    const mapped = {
      vendorsCurrentPage: getVendorsItems(state, props, query),
      vendorViews: getResourceViews(state, props, 'vendors'),
      vendorItems: state.vendors.items,
      vendorTableQuery: query,
      vendorsPageination: getVendorsPaginationMeta(state, props, query),
      vendorsLoading: state.vendors.loading,
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
