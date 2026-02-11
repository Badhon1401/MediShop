package com.mediShop.shop.domain.repository;

import com.mediShop.shop.domain.entity.ShopOperatorInvitation;

import java.util.Optional;
import java.util.UUID;

public interface ShopOperatorInvitationRepository {
    ShopOperatorInvitation save(ShopOperatorInvitation invitation);
    Optional<ShopOperatorInvitation> findById(UUID invitationId);
    void delete(ShopOperatorInvitation invitation);


    void deleteById(UUID invitationId);

    void flush();
}
