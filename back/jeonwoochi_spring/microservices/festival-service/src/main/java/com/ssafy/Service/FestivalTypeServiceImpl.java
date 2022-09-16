package com.ssafy.Service;

import com.ssafy.Domain.Entity.FestivalType;
import com.ssafy.Domain.Repository.FestivalTypeRepo;
import com.ssafy.Dto.FestivalTypeCreateRequest;
import com.ssafy.Dto.FestivalTypeResponse;
import com.ssafy.Dto.FestivalTypeUpdateRequest;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.FESTIVAL_TYPE_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FestivalTypeServiceImpl implements FestivalTypeService{
    private final FestivalTypeRepo festivalTypeRepo;

    // 축제 유형 추가
    @Override
    public void createFestivalType(List<FestivalTypeCreateRequest> requests) {
        requests.forEach(request -> {
            FestivalType festivalType = FestivalType.create(request);
            festivalTypeRepo.save(festivalType);
        });
    }
    // 축제 유형 전체 목록 조회
    @Override
    public List<FestivalTypeResponse> findFestivalTypeListAll() {
        List<FestivalTypeResponse> festivalTypes = festivalTypeRepo.findAll().stream()
                .map(FestivalTypeResponse::response)
                .collect(Collectors.toList());
        return festivalTypes;
    }
    // 축제 유형 수정
    @Override
    public FestivalTypeResponse updateFestivalType(FestivalTypeUpdateRequest request) {
        FestivalType festivalType = festivalTypeRepo.findById(request.getId())
                .orElseThrow(()-> new NotFoundException(FESTIVAL_TYPE_NOT_FOUND));
        festivalType.update(request);
        return FestivalTypeResponse.response(festivalType);
    }
    // 축제 유형 삭제
    @Override
    public void deleteFestivalType(Long festivalTypeId) {
        FestivalType festivalType = festivalTypeRepo.findById(festivalTypeId)
                .orElseThrow(()-> new NotFoundException(FESTIVAL_TYPE_NOT_FOUND));
        festivalTypeRepo.delete(festivalType);
    }
}
