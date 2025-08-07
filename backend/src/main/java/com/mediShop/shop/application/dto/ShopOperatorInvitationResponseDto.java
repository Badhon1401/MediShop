package com.mediShop.shop.application.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopOperatorInvitationResponseDto {

    @NotNull(message = "Invitation ID must not be null")
    private UUID invitationId;

    @NotNull(message = "Response must not be null")
    @Pattern(regexp = "accept|decline", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Response must be 'accept' or 'decline'")
    private String response;
}
