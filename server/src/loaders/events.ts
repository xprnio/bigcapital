
// Here we import all events.
import 'subscribers/authentication';
import 'subscribers/organization';
import 'subscribers/inviteUser';
import 'subscribers/manualJournals';
import 'subscribers/expenses';

import 'subscribers/Bills';
import 'subscribers/Bills/SyncVendorsBalances';
import 'subscribers/Bills/WriteJournalEntries';
import 'subscribers/Bills/WriteInventoryTransactions';

import 'subscribers/SaleInvoices';
import 'subscribers/SaleInvoices/SyncCustomersBalance';
import 'subscribers/SaleInvoices/WriteInventoryTransactions';
import 'subscribers/SaleInvoices/WriteJournalEntries';

import 'subscribers/SaleReceipt';
import 'subscribers/SaleReceipt/WriteInventoryTransactions';
import 'subscribers/SaleReceipt/WriteJournalEntries';

import 'subscribers/Inventory/Inventory';
import 'subscribers/Inventory/InventoryAdjustment';

import 'subscribers/customers';
import 'subscribers/vendors';
import 'subscribers/paymentMades';
import 'subscribers/paymentReceives';
import 'subscribers/saleEstimates';
import 'subscribers/items';