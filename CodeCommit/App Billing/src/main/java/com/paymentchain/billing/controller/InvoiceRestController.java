package com.paymentchain.billing.controller;

import com.paymentchain.billing.common.InvoiceRequestMapper;
import com.paymentchain.billing.common.InvoiceResposeMapper;
import com.paymentchain.billing.dto.InvoiceRequest;
import com.paymentchain.billing.dto.InvoiceResponse;
import com.paymentchain.billing.entities.Invoice;
import com.paymentchain.billing.respository.InvoiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Tag(name = "Billing API")
@RestController
@RequestMapping("/billing")
public class InvoiceRestController {

    private final InvoiceRepository billingRepository;
    private final InvoiceRequestMapper requestMapper;
    private final InvoiceResposeMapper responseMapper;

    public InvoiceRestController(
            InvoiceRepository billingRepository,
            InvoiceRequestMapper requestMapper,
            InvoiceResposeMapper responseMapper) {
        this.billingRepository = billingRepository;
        this.requestMapper = requestMapper;
        this.responseMapper = responseMapper;
    }

    @Operation(summary = "List invoices")
    @GetMapping
    public List<InvoiceResponse> list() {
        return responseMapper.InvoiceListToInvoiceResposeList(billingRepository.findAll());
    }

    @Operation(summary = "Get an invoice")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Invoice found"),
        @ApiResponse(responseCode = "404", description = "Invoice not found")
    })
    @GetMapping("/{id}")
    public InvoiceResponse get(@PathVariable Long id) {
        return responseMapper.InvoiceToInvoiceRespose(requireInvoice(id));
    }

    @Operation(summary = "Update an invoice")
    @PutMapping("/{id}")
    public InvoiceResponse put(@PathVariable Long id, @Valid @RequestBody InvoiceRequest input) {
        Invoice invoice = requireInvoice(id);
        requestMapper.updateInvoiceFromRequest(input, invoice);
        return responseMapper.InvoiceToInvoiceRespose(billingRepository.save(invoice));
    }

    @Operation(summary = "Create an invoice")
    @PostMapping
    public ResponseEntity<InvoiceResponse> post(@Valid @RequestBody InvoiceRequest input) {
        Invoice invoice = billingRepository.save(requestMapper.InvoiceRequestToInvoice(input));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(responseMapper.InvoiceToInvoiceRespose(invoice));
    }

    @Operation(summary = "Delete an invoice")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        billingRepository.delete(requireInvoice(id));
    }

    private Invoice requireInvoice(Long id) {
        return billingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invoice not found"));
    }
}
