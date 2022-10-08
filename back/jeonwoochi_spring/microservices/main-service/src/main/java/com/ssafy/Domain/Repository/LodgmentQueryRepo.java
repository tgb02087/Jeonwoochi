package com.ssafy.Domain.Repository;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.Domain.Entity.Lodgment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.MathExpressions.*;
import static com.querydsl.core.types.dsl.MathExpressions.radians;
import static com.ssafy.Domain.Entity.QLodgment.lodgment;

@Repository
@RequiredArgsConstructor
public class LodgmentQueryRepo {
    private final JPAQueryFactory queryFactory;

    public List<Lodgment> findLodgmentByDistAndCategory(Double festival_lat, Double festival_lng, List<String> categories){
        return queryFactory
                .select(lodgment)
                .from(lodgment)
                .where(//acos(cos(radians(127.3943459429))
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                //*cos(radians(lodgment.lat))
                                .multiply(cos(radians(lodgment.lat)))
                                //*cos(radians(lodgment.lng)-radians(37.605535025))
                                .multiply(cos(radians(lodgment.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                //+sin(radians(127.3943459429))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                //*sin(radians(lodgment.lat))))
                                .multiply(sin(radians(lodgment.lat)))))
                                // *6371
                                .multiply(Expressions.constant(6371))
                                // <= 5.0
                                .loe(5.0)
                )
                .where(lodgment.category.in(categories))
                .limit(20)
                .fetch();
    }

    public List<Lodgment> findLodgmentByDist(Double festival_lat, Double festival_lng){
        return queryFactory
                .select(lodgment)
                .from(lodgment)
                .where(
                        acos(cos(radians(Expressions.constant(festival_lat)))
                                .multiply(cos(radians(lodgment.lat)))
                                .multiply(cos(radians(lodgment.lng).subtract(radians(Expressions.constant(festival_lng)))))
                                .add(sin(radians(Expressions.constant(festival_lat)))
                                .multiply(sin(radians(lodgment.lat)))))
                                .multiply(Expressions.constant(6371))
                                .loe(5.0)
                )
                .limit(20)
                .fetch();
    }
}
