package com.ssafy.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.Domain.Entity.Festival;
import com.ssafy.Domain.Entity.FestivalForm;
import com.ssafy.Domain.Entity.FestivalType;
import com.ssafy.Domain.Repository.FestivalFormRepo;
import com.ssafy.Domain.Repository.FestivalRepo;
import com.ssafy.Domain.Repository.FestivalTypeRepo;
import com.ssafy.Dto.FestivalCreateRequest;
import com.ssafy.Dto.FestivalResponse;
import com.ssafy.Dto.FestivalUpdateRequest;
import com.ssafy.Dto.KakaoGeoRes;
import com.ssafy.exception.NotFoundException;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FestivalServiceImpl implements FestivalService {

    @Value("${api.kakaoKey}")
    public String key;
    private final FestivalRepo festivalRepo;
    private final FestivalTypeRepo festivalTypeRepo;
    private final FestivalFormRepo festivalFormRepo;
    //축제 추가 (승인) [어드민]
    @Override
    @Transactional
    public void createFestival(FestivalCreateRequest request) {
        FestivalForm festivalForm = festivalFormRepo.findById(request.getFestivalFormId())
                .orElseThrow(()-> new NotFoundException(FESTIVAL_FORM_NOT_FOUND));
        try{
            HashMap<String, Object> map = new HashMap<>();

            String apiURL = "https://dapi.kakao.com/v2/local/search/address.json?query="
                    + URLEncoder.encode(festivalForm.getLocate(), "UTF-8");

            HttpResponse<JsonNode> response = Unirest.get(apiURL)
                    .header("Authorization", key)
                    .asJson();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);

            KakaoGeoRes bodyJson = objectMapper.readValue(response.getBody().toString(), KakaoGeoRes.class);

            double lat = bodyJson.getDocuments().get(0).getX();
            double lng = bodyJson.getDocuments().get(0).getY();
            Festival festival = Festival.create(festivalForm, lat, lng);
            festivalRepo.save(festival);
        }catch (Exception e){

        }

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
        FestivalType festivalType = festivalTypeRepo.findById(request.getFestivalTypeId())
                .orElseThrow(()-> new NotFoundException(FESTIVAL_TYPE_NOT_FOUND));
        Festival festival = festivalRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(FESTIVAL_NOT_FOUND));

        festival.update(request, festivalType);
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
