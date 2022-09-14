package com.ssafy.Service;

import com.ssafy.Domain.Entity.FestivalEntity;
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

    @Override
    @Transactional
    public void createFestival(List<FestivalCreateRequest> requests) {
        requests.forEach(request -> {
            FestivalEntity festival = FestivalEntity.create(request);
            festivalRepo.save(festival);
        });
    }

    @Override
    @Transactional
    public FestivalResponse findFestivalDetail(Long festivalId) {
        FestivalEntity festival = festivalRepo.findById(festivalId)
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));
        return FestivalResponse.response(festival);
    }

    @Override
    @Transactional
    public List<FestivalResponse> findFestivalListAll() {
        List<FestivalResponse> festivals = festivalRepo.findAll().stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        return festivals;
    }

    @Override
    @Transactional
    public FestivalResponse updateFestival(FestivalUpdateRequest request) {
        FestivalEntity festival = festivalRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));

        festival.update(request);
        return FestivalResponse.response(festival);
    }

    @Override
    @Transactional
    public void festivalDelete(Long festivalId) {
        FestivalEntity festival = festivalRepo.findById(festivalId)
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));
        festivalRepo.delete(festival);
    }
}
