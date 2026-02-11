package com.mediShop.shop.application.usecase;

import com.mediShop.shop.application.dto.ShopSummaryResponseDto;
import com.mediShop.shop.domain.repository.ShopRepository;
import com.mediShop.shop.domain.repository.ShopOperatorRepository;
import com.mediShop.user.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetUserAssociatedShopsUseCase {

    private final ShopRepository shopRepository;

    public List<ShopSummaryResponseDto> execute(User currentUser) {
        // 1. Fetch shops owned by user
        Set<ShopSummaryResponseDto> ownedShops = shopRepository.findByOwnerId(currentUser.getId())
                .stream()
                .map(shop -> new ShopSummaryResponseDto(shop.getId(), shop.getName(), shop.getLocation(), "OWNER"))
                .collect(Collectors.toSet());

        // 2. Fetch shops where user is an operator (Admin/Salesman)
        Set<ShopSummaryResponseDto> operatorShops = shopRepository.findByOperatorUserId(currentUser.getId())
                .stream()
                .map(shop -> new ShopSummaryResponseDto(shop.getId(), shop.getName(), shop.getLocation(), "OPERATOR"))
                .collect(Collectors.toSet());

        // 3. Merge sets to avoid duplicates and return as list
        ownedShops.addAll(operatorShops);
        return new ArrayList<>(ownedShops);
    }
}