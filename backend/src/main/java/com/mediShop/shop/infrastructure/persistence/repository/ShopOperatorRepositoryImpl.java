package com.mediShop.shop.infrastructure.persistence.repository;


import com.mediShop.shop.domain.entity.Role;
import com.mediShop.shop.domain.entity.ShopOperator;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.shop.infrastructure.persistence.entity.ShopOperatorJpaEntity;
import com.mediShop.shop.infrastructure.persistence.mapper.RoleMapper;
import com.mediShop.shop.infrastructure.persistence.mapper.ShopOperatorMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class ShopOperatorRepositoryImpl implements ShopOperatorRepository {

    @Autowired
    private ShopOperatorJpaRepository repository;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public boolean existsByUserIdAndShopIdAndRole(UUID userId, UUID shopId, Role role){
        return repository.existsByUserIdAndShopIdAndRole(userId,shopId, RoleMapper.mapToEntityUserRole(role));
    }

    @Override
    public Optional<ShopOperator> findByUserIdAndRole(UUID userId, Role role) {
        return repository.findByUserIdAndRole(userId, RoleMapper.mapToEntityUserRole(role))
                .map(ShopOperatorMapper::mapToShopOperatorDomain);
    }

    @Override
    public ShopOperator  save(ShopOperator operator) {
        return ShopOperatorMapper.mapToShopOperatorDomain(repository.save(ShopOperatorMapper.mapToShopOperatorJpaEntity(operator)));
    }


    @Override
    public List<ShopOperator> findByUserId(UUID userId) {
        List<ShopOperatorJpaEntity> entities = repository.findByUser_Id(userId);

        return entities.stream()
                .map(ShopOperatorMapper::mapToShopOperatorDomain)
                .toList();
    }


    @Override
    public void delete(ShopOperator operator) {
           repository.delete(ShopOperatorMapper.mapToShopOperatorJpaEntity(operator));

    }

    @Override
    public boolean existsByUserIdAndShopId(UUID userId, UUID shopId) {
        return repository.existsByUserIdAndShopId(userId,shopId);

    }

    @Override
    public void deleteById(UUID operatorId) {
        repository.deleteById(operatorId);

    }

    @Override
    public Optional<ShopOperator> findById(UUID operatorId) {
        return repository.findById(operatorId).map(ShopOperatorMapper::mapToShopOperatorDomain);
    }

    @Override
    public boolean existsById(UUID operatorId) {
        return repository.existsById(operatorId);
    }

    @Override
    public int countOperatorShopRelation(UUID operatorId, UUID shopId) {
        return repository.countOperatorShopRelation(operatorId,shopId);
    }

    @Override
    public void removeOperatorFromShop(UUID operatorId, UUID shopId) {
        repository.removeOperatorFromShop(operatorId,shopId);

    }

    @Override
    public int countShopsForOperator(UUID operatorId) {

        return repository.countShopsForOperator(operatorId);
    }

    @Override
    public void addOperatorToShop(UUID shopId, UUID operatorId) {

        repository.addOperatorToShop(shopId,operatorId);
    }

    @Override
    public boolean existsOperatorShopRelation(UUID operatorId, UUID shopId) {
        return repository.existsOperatorShopRelation(operatorId,shopId);
    }
}
