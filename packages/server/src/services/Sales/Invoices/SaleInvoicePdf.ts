import { Inject, Service } from 'typedi';
import { ChromiumlyTenancy } from '@/services/ChromiumlyTenancy/ChromiumlyTenancy';
import { TemplateInjectable } from '@/services/TemplateInjectable/TemplateInjectable';
import HasTenancyService from '@/services/Tenancy/TenancyService';
import { CommandSaleInvoiceValidators } from './CommandSaleInvoiceValidators';

@Service()
export class SaleInvoicePdf {
  @Inject()
  private chromiumlyTenancy: ChromiumlyTenancy;

  @Inject()
  private templateInjectable: TemplateInjectable;

  @Inject()
  private validators: CommandSaleInvoiceValidators;

  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Retrieve sale invoice pdf content.
   * @param {number} tenantId - Tenant Id.
   * @param {ISaleInvoice} saleInvoice -
   * @returns {Promise<Buffer>}
   */
  public async saleInvoicePdf(
    tenantId: number,
    invoiceId: number
  ): Promise<Buffer> {
    const { SaleInvoice } = this.tenancy.models(tenantId);

    const saleInvoice = await SaleInvoice.query()
      .findById(invoiceId)
      .withGraphFetched('entries.item')
      .withGraphFetched('entries.tax')
      .withGraphFetched('customer')
      .withGraphFetched('taxes.taxRate');

    // Validates the given sale invoice existance.
    this.validators.validateInvoiceExistance(saleInvoice);

    const htmlContent = await this.templateInjectable.render(
      tenantId,
      'modules/invoice-regular',
      {
        saleInvoice,
      }
    );
    return this.chromiumlyTenancy.convertHtmlContent(tenantId, htmlContent, {
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
    });
  }
}
