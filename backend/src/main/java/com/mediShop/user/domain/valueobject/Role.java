package com.mediShop.user.domain.valueobject;

import io.swagger.v3.oas.annotations.media.Schema;


@Schema(description = "Role of the user", enumAsRef = true)
public enum Role {
    @Schema(description = "Manager who oversees operations")
    MANAGER("Manager"),

    @Schema(description = "Salesperson responsible for selling products")
    SALESPERSON("Salesperson");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    /**
     * A human-readable name for UIs, logs, etc.
     */
    public String getDisplayName() {
        return displayName;
    }
}
