package com.ssafy.Domain.Repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Domain.Entity.Leports;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.ssafy.Domain.Entity.QLeports.leports;

@Repository
@RequiredArgsConstructor
public class LeportsQueryRepo {
    private final JPAQueryFactory queryFactory;

    public List<Leports> findLeportsByDistAndCategory(Double festival_lat, Double festival_lng, List<String> categories){
        return queryFactory
                .select(leports)
                .from(leports)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(leports.lat)))
                                .multiply(cos(radians(leports.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(leports.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .where(leports.category.in(categories))
                .limit(20)
                .fetch();
    }

    public List<Leports> findLeportsByDist(Double festival_lat, Double festival_lng){
        return queryFactory
                .select(leports)
                .from(leports)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(leports.lat)))
                                .multiply(cos(radians(leports.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(leports.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .limit(20)
                .fetch();
    }
}
