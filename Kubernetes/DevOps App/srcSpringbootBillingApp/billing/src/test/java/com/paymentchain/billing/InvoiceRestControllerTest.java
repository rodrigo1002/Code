package com.paymentchain.billing;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.paymentchain.billing.common.InvoiceRequestMapper;
import com.paymentchain.billing.common.InvoiceResposeMapper;
import com.paymentchain.billing.controller.InvoiceRestController;
import com.paymentchain.billing.dto.InvoiceRequest;
import com.paymentchain.billing.dto.InvoiceResponse;
import com.paymentchain.billing.entities.Invoice;
import com.paymentchain.billing.respository.InvoiceRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class InvoiceRestControllerTest {
    @Mock private InvoiceRepository repository;
    @Mock private InvoiceRequestMapper requestMapper;
    @Mock private InvoiceResposeMapper responseMapper;
    @InjectMocks private InvoiceRestController controller;

    @Test
    void getReturnsNotFoundForMissingInvoice() {
        when(repository.findById(42L)).thenReturn(Optional.empty());
        assertNotFound(() -> controller.get(42L));
    }

    @Test
    void deleteReturnsNotFoundForMissingInvoice() {
        when(repository.findById(42L)).thenReturn(Optional.empty());
        assertNotFound(() -> controller.delete(42L));
    }

    @Test
    void putUpdatesExistingInvoiceAndReturnsTheSavedEntity() {
        Invoice existing = new Invoice();
        InvoiceRequest input = new InvoiceRequest();
        InvoiceResponse output = new InvoiceResponse();
        when(repository.findById(42L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);
        when(responseMapper.InvoiceToInvoiceRespose(existing)).thenReturn(output);
        assertThat(controller.put(42L, input)).isSameAs(output);
        verify(requestMapper).updateInvoiceFromRequest(input, existing);
    }

    private void assertNotFound(org.assertj.core.api.ThrowableAssert.ThrowingCallable action) {
        assertThatThrownBy(action).isInstanceOf(ResponseStatusException.class)
                .satisfies(error -> assertThat(((ResponseStatusException) error).getStatusCode())
                        .isEqualTo(HttpStatus.NOT_FOUND));
    }
}
