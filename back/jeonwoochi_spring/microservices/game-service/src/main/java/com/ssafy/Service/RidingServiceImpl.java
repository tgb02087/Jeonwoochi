package com.ssafy.Service;

import com.ssafy.Domain.Entity.Riding;
import com.ssafy.Domain.Repository.RidingRepo;
import com.ssafy.Dto.RidingCreateRequest;
import com.ssafy.Dto.RidingResponse;
import com.ssafy.Dto.RidingUpdateRequest;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.RIDING_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RidingServiceImpl implements RidingService{

    private final RidingRepo ridingRepo;

    @Override
    @Transactional
    public void createRiding(List<RidingCreateRequest> requests) {
        requests.forEach(request -> {
            Riding riding = Riding.create(request);
            ridingRepo.save(riding);
        });
    }

    @Override
    @Transactional
    public List<RidingResponse> findRidingListAll() {
        List<RidingResponse> ridings = ridingRepo.findAll().stream()
                .map(RidingResponse::response)
                .collect(Collectors.toList());
        return ridings;
    }

    @Override
    @Transactional
    public RidingResponse updateRiding(RidingUpdateRequest request) {
        Riding riding = ridingRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(RIDING_NOT_FOUND));
        riding.update(request);
        return RidingResponse.response(riding);
    }

    @Override
    @Transactional
    public void deleteRiding(Long ridingId) {
        Riding riding = ridingRepo.findById(ridingId)
                .orElseThrow(()-> new NotFoundException(RIDING_NOT_FOUND));
        ridingRepo.delete(riding);
    }
}
