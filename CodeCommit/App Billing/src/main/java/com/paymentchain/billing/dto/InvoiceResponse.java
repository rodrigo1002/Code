/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.paymentchain.billing.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @author sotobotero
 */
@Data
@Schema(description = "Invoice data returned by the API")
public class InvoiceResponse {
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "2548975")
    private long invoiceId;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private long customer;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "TFS2548975")
    private String number;
    @Schema(example = "Professional services")
    private String detail;
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "3659.23")
    private BigDecimal amount;
}
