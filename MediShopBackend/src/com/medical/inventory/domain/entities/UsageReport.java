
// Usage Report Entity
package com.medical.inventory.domain.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "usage_reports")
public class UsageReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Enumerated(EnumType.STRING)
    @Column(name = "report_type", nullable = false)
    private ReportType reportType;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "medicine_id", nullable = false)
    private Long medicineId;

    @Column(name = "quantity_used", nullable = false)
    private Integer quantityUsed;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Constructors
    public UsageReport() {}

    public UsageReport(ReportType reportType, LocalDate date, Long medicineId, Integer quantityUsed) {
        this.reportType = reportType;
        this.date = date;
        this.medicineId = medicineId;
        this.quantityUsed = quantityUsed;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getReportId() { return reportId; }
    public void setReportId(Long reportId) { this.reportId = reportId; }

    public ReportType getReportType() { return reportType; }
    public void setReportType(ReportType reportType) { this.reportType = reportType; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Long getMedicineId() { return medicineId; }
    public void setMedicineId(Long medicineId) { this.medicineId = medicineId; }

    public Integer getQuantityUsed() { return quantityUsed; }
    public void setQuantityUsed(Integer quantityUsed) { this.quantityUsed = quantityUsed; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
