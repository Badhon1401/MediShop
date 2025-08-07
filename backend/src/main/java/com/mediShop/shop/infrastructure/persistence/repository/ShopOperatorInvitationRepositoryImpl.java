package com.mediShop.shop.infrastructure.persistence.repository;

import com.mediShop.shop.domain.entity.ShopOperatorInvitation;
import com.mediShop.shop.domain.repository.ShopOperatorInvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class ShopOperatorInvitationRepositoryImpl implements ShopOperatorInvitationRepository {

    @Autowired
    private ShopOperatorInvitationJpaRepository repository;

    @Override
    public ShopOperatorInvitation save(ShopOperatorInvitation invitation) {
        return DomainMapperService.mapToShopOperatorInvitationDomain(repository.save(DomainMapperService.mapToShopOperatorInvitationJpaEntity(invitation)));
    }

    @Override
    public Optional<ShopOperatorInvitation> findById(UUID invitationId) {
        return repository.findById(invitationId).map(DomainMapperService::mapToShopOperatorInvitationDomain);
    }



    @Override
    public void delete(ShopOperatorInvitation invitation) {
            repository.delete(DomainMapperService.mapToShopOperatorInvitationJpaEntity(invitation));
    }

    @Override
    public void deleteById(UUID invitationId) {
        repository.deleteById(invitationId);
    }

    @Override
    public void flush() {
        repository.flush();
    }
}
