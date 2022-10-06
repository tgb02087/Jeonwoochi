package com.ssafy.Service;

import com.ssafy.Domain.Repository.*;
import com.ssafy.Dto.Response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AroundService {
    private final LodgmentQueryRepo lodgmentQueryRepo;
    private final LeportsQueryRepo leportsQueryRepo;
    private final CultureQueryRepo cultureQueryRepo;
    private final ShoppingQueryRepo shoppingQueryRepo;

    private final InterestRepo interestRepo;

    @Transactional
    public List<LodgmentResponse> findLodgment(Double festival_lat, Double festival_lng, Long userId){
        List<String> categories = interestRepo.findByUserId(userId).stream()
                .map(InterestResponse::idResponse)
                .distinct()
                .collect(Collectors.toList());
        List<LodgmentResponse> lodgmentResponses = lodgmentQueryRepo.findLodgmentByDistAndCategory(festival_lat, festival_lng, categories).stream()
                .map(LodgmentResponse::response)
                .collect(Collectors.toList());
        if(lodgmentResponses.isEmpty()){
            lodgmentResponses = lodgmentQueryRepo.findLodgmentByDist(festival_lat, festival_lng).stream()
                    .map(LodgmentResponse::response)
                    .collect(Collectors.toList());
        }
        return lodgmentResponses;
    }

    @Transactional
    public List<LeportsResponse> findLeports(Double festival_lat, Double festival_lng, Long userId){
        List<String> categories = interestRepo.findByUserId(userId).stream()
                .map(InterestResponse::idResponse)
                .distinct()
                .collect(Collectors.toList());
        List<LeportsResponse> leportsResponses = leportsQueryRepo.findLeportsByDistAndCategory(festival_lat, festival_lng, categories).stream()
                .map(LeportsResponse::response)
                .collect(Collectors.toList());
        if(leportsResponses.isEmpty()){
            leportsResponses = leportsQueryRepo.findLeportsByDist(festival_lat, festival_lng).stream()
                    .map(LeportsResponse::response)
                    .collect(Collectors.toList());
        }
        return leportsResponses;
    }

    @Transactional
    public List<CultureResponse> findCulture(Double festival_lat, Double festival_lng, Long userId){
        List<String> categories = interestRepo.findByUserId(userId).stream()
                .map(InterestResponse::idResponse)
                .distinct()
                .collect(Collectors.toList());
        List<CultureResponse> cultureResponses = cultureQueryRepo.findCultureByDistAndCategory(festival_lat, festival_lng, categories).stream()
                .map(CultureResponse::response)
                .collect(Collectors.toList());
        if(cultureResponses.isEmpty()){
            cultureResponses = cultureQueryRepo.findCultureByDist(festival_lat, festival_lng).stream()
                    .map(CultureResponse::response)
                    .collect(Collectors.toList());
        }
        return cultureResponses;
    }

    @Transactional
    public List<ShoppingResponse> findShopping(Double festival_lat, Double festival_lng, Long userId){
        List<String> categories = interestRepo.findByUserId(userId).stream()
                .map(InterestResponse::idResponse)
                .distinct()
                .collect(Collectors.toList());
        List<ShoppingResponse> shoppingResponses = shoppingQueryRepo.findShoppingByDistAndCategory(festival_lat, festival_lng, categories).stream()
                .map(ShoppingResponse::response)
                .collect(Collectors.toList());
        if(shoppingResponses.isEmpty()){
            shoppingResponses = shoppingQueryRepo.findShoppingByDist(festival_lat, festival_lng).stream()
                    .map(ShoppingResponse::response)
                    .collect(Collectors.toList());
        }
        return shoppingResponses;
    }
}
