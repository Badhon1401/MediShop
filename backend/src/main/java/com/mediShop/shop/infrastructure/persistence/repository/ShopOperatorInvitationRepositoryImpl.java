package com.mediShop.shop.infrastructure.persistence.repository;

import com.mediShop.shop.domain.entity.ShopOperatorInvitation;
import com.mediShop.shop.domain.repository.ShopOperatorInvitationRepository;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopOperatorInvitationMapper;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopOperatorMapper;
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
        return ShopOperatorInvitationMapper.mapToShopOperatorInvitationDomain(repository.save(ShopOperatorInvitationMapper.mapToShopOperatorInvitationJpaEntity(invitation)));
    }

    @Override
    public Optional<ShopOperatorInvitation> findById(UUID invitationId) {
        return repository.findById(invitationId).map(ShopOperatorInvitationMapper::mapToShopOperatorInvitationDomain);
    }



    @Override
    public void delete(ShopOperatorInvitation invitation) {
            repository.delete(ShopOperatorInvitationMapper.mapToShopOperatorInvitationJpaEntity(invitation));
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
