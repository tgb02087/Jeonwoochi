package com.ssafy.Domain.Repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Domain.Entity.Culture;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.ssafy.Domain.Entity.QCulture.culture;

@Repository
@RequiredArgsConstructor
public class CultureQueryRepo {
    private final JPAQueryFactory queryFactory;

    public List<Culture> findCultureByDistAndCategory(Double festival_lat, Double festival_lng, List<String> categories){
        return queryFactory
                .select(culture)
                .from(culture)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                        .multiply(cos(radians(culture.lat)))
                        .multiply(cos(radians(culture.lng).subtract(radians(Expressions.constant(festival_lng)))))
                        .add(sin(radians(Expressions.constant(festival_lat)))
                        .multiply(sin(radians(culture.lat)))))
                        .multiply(Expressions.constant(6371))
                        .loe(5.0)
                )
                .where(culture.category.in(categories))
                .limit(20)
                .fetch();
    }

    public List<Culture> findCultureByDist(Double festival_lat, Double festival_lng){
        return queryFactory
                .select(culture)
                .from(culture)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(culture.lat)))
                                .multiply(cos(radians(culture.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(culture.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .limit(20)
                .fetch();
    }
}
