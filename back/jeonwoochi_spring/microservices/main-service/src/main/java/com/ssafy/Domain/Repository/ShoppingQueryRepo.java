package com.ssafy.Domain.Repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Domain.Entity.Shopping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;
import static com.ssafy.Domain.Entity.QShopping.shopping;


@Repository
@RequiredArgsConstructor
public class ShoppingQueryRepo {

    private final JPAQueryFactory queryFactory;

    public List<Shopping> findShoppingByDistAndCategory(Double festival_lat, Double festival_lng, List<String> categories){
        return queryFactory
                .select(shopping)
                .from(shopping)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(shopping.lat)))
                                .multiply(cos(radians(shopping.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(shopping.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .where(shopping.category.in(categories))
                .limit(20)
                .fetch();
    }

    public List<Shopping> findShoppingByDist(Double festival_lat, Double festival_lng){
        return queryFactory
                .select(shopping)
                .from(shopping)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(shopping.lat)))
                                .multiply(cos(radians(shopping.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(shopping.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .limit(20)
                .fetch();
    }
}
