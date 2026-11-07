/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.paymentchain.billing.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import lombok.Data;

/**
 *
 * @author sotobotero
 */
@Data
@Schema(description = "Invoice data sent in an API request")
public class InvoiceRequest {

    @NotNull
    @Positive
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "1")
    private Long customer;

    @NotBlank
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "2548975")
    private String number;

    @Schema(example = "Professional services")
    private String detail;

    @NotNull
    @Positive
    @Digits(integer = 17, fraction = 2)
    @Schema(requiredMode = Schema.RequiredMode.REQUIRED, example = "3659.23")
    private BigDecimal amount;
}
