package com.paymentchain.billing.common;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Standardized API error response")
public class StandarizedApiExceptionResponse {

    @Schema(description = "URI that categorizes the error", example = "/errors/uncategorized")
    private String type = "/errors/uncategorized";

    @Schema(description = "Brief human-readable error title", example = "Invalid request")
    private String title;

    @Schema(description = "Application error code", example = "400")
    private String code;

    @Schema(description = "Safe human-readable explanation")
    private String detail;

    @Schema(description = "URI identifying this error occurrence", example = "/errors/uncategorized/1")
    private String instance = "/errors/uncategorized";

    public StandarizedApiExceptionResponse(String title, String code, String detail) {
        this.title = title;
        this.code = code;
        this.detail = detail;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getStatus() { return code; }
    public void setStatus(String status) { this.code = status; }
    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }
    public String getInstance() { return instance; }
    public void setInstance(String instance) { this.instance = instance; }
}
