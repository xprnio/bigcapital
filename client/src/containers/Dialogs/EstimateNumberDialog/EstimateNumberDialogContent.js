import React from 'react';
import { DialogContent } from 'components';
import { useQuery, queryCache } from 'react-query';

import ReferenceNumberForm from 'containers/JournalNumber/ReferenceNumberForm';
import withDialogActions from 'containers/Dialog/withDialogActions';
import withSettingsActions from 'containers/Settings/withSettingsActions';
import withSettings from 'containers/Settings/withSettings';

import { compose, optionsMapToArray } from 'utils';

/**
 * Estimate number dialog's content.
 */

function EstimateNumberDialogContent({
  // #withSettings
  nextNumber,
  numberPrefix,
  // #withSettingsActions
  requestFetchOptions,
  requestSubmitOptions,

  // #withDialogActions
  closeDialog,
}) {
  const fetchSettings = useQuery(['settings'], () => requestFetchOptions({}));

  const handleSubmitForm = (values, { setSubmitting }) => {
    const options = optionsMapToArray(values).map((option) => {
      return { key: option.key, ...option, group: 'sales_estimates' };
    });
    requestSubmitOptions({ options })
      .then(() => {
        setSubmitting(false);
        closeDialog('estimate-number-form');

        setTimeout(() => {
          queryCache.invalidateQueries('settings');
        }, 250);
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  const handleClose = () => {
    closeDialog('estimate-number-form');
  };

  return (
    <DialogContent isLoading={fetchSettings.isFetching}>
      <ReferenceNumberForm
        initialNumber={nextNumber}
        initialPrefix={numberPrefix}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
      />
    </DialogContent>
  );
}

export default compose(
  withDialogActions,
  withSettingsActions,
  withSettings(({ estimatesSettings }) => ({
    nextNumber: estimatesSettings?.next_number,
    numberPrefix: estimatesSettings?.number_prefix,
  })),
)(EstimateNumberDialogContent);
