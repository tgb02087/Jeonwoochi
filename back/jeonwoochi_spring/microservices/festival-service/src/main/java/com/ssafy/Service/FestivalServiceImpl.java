package com.ssafy.Service;

import com.ssafy.Domain.Entity.Festival;
import com.ssafy.Domain.Repository.FestivalRepo;
import com.ssafy.Dto.FestivalCreateRequest;
import com.ssafy.Dto.FestivalResponse;
import com.ssafy.Dto.FestivalUpdateRequest;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.FESTIVAL_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FestivalServiceImpl implements FestivalService {

    private final FestivalRepo festivalRepo;

    //축제 추가 (승인) [어드민]
    @Override
    @Transactional
    public void createFestival(List<FestivalCreateRequest> requests) {
        requests.forEach(request -> {
            Festival festival = Festival.create(request);
            festivalRepo.save(festival);
        });
    }

    //축제 상세 정보
    @Override
    @Transactional
    public FestivalResponse findFestivalDetail(Long festivalId) {
        Festival festival = festivalRepo.findById(festivalId)
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));
        return FestivalResponse.response(festival);
    }
    //축제 전체 리스트
    @Override
    @Transactional
    public List<FestivalResponse> findFestivalListAll() {
        List<FestivalResponse> festivals = festivalRepo.findAll().stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        return festivals;
    }

    //축제 수정
    @Override
    @Transactional
    public FestivalResponse updateFestival(FestivalUpdateRequest request) {
        Festival festival = festivalRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));

        festival.update(request);
        return FestivalResponse.response(festival);
    }

    // 축제 삭제
    @Override
    @Transactional
    public void deleteFestival(Long festivalId) {
        Festival festival = festivalRepo.findById(festivalId)
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));
        festivalRepo.delete(festival);
    }
}
