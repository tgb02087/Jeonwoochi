package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Shopping;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingResponse {
    private Long id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    public static ShoppingResponse response(Shopping shopping){
        ShoppingResponse shoppingResponse = new ShoppingResponse();
        shoppingResponse.id = shopping.getId();
        shoppingResponse.name = shopping.getName();
        shoppingResponse.address = shopping.getAddress();
        shoppingResponse.lat = shopping.getLat();
        shoppingResponse.lng = shopping.getLng();
        return shoppingResponse;
    }
}
