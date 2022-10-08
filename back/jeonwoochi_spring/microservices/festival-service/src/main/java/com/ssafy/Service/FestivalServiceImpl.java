package com.ssafy.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.Domain.Entity.Festival;
import com.ssafy.Domain.Entity.FestivalForm;
import com.ssafy.Domain.Repository.FestivalFormRepo;
import com.ssafy.Domain.Repository.FestivalRepo;
import com.ssafy.Dto.*;
import com.ssafy.exception.NotFoundException;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FestivalServiceImpl implements FestivalService {

    @Value("${api.kakaoKey}")
    public String key;
    private final FestivalRepo festivalRepo;
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
                    + URLEncoder.encode(festivalForm.getAddress(), "UTF-8");

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
            festivalFormRepo.delete(festivalForm);
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

    @Override
    public List<FestivalResponse> findFestivalListEd() {
        Date now = new Date();
        List<FestivalResponse> festivals = festivalRepo.findByEndDateBefore(now).stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        return festivals;
    }

    @Override
    public List<FestivalResponse> findFestivalListIng() {
        Date now = new Date();
        List<FestivalResponse> festivals = festivalRepo.findByStartDateBeforeAndEndDateAfter(now, now).stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        return festivals;
    }

    @Override
    public List<FestivalResponse> findFestivalListWill() {
        Date now = new Date();
        List<FestivalResponse> festivals = festivalRepo.findByStartDateAfter(now).stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        return festivals;
    }

    @Override
    public List<FestivalResponse> findFestivalListTop3() {
        Date now = new Date();
        List<FestivalResponse> festivals = festivalRepo.findTop3ByEndDateAfterOrderByEndDate(now).stream()
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

    //축제 커스텀 조회
    @Override
    public List<FestivalResponse> findFestivalCustom() {
        List<FestivalResponse> festivals = festivalRepo.findAll().stream()
                .map(FestivalResponse::response)
                .collect(Collectors.toList());
        Collections.sort(festivals, new Comparator<FestivalResponse>() {
            @Override
            public int compare(FestivalResponse f1, FestivalResponse f2) {
                return Double.compare(f1.getLat(), f2.getLat());
            }
        });
        double cur_lat = 0.0;
        //double cur_lng = 0.0;
        List<FestivalCustom> list = new ArrayList<>();
        List<FestivalResponse> newlist = new ArrayList<>();
        for(int i=festivals.size()-1; i>=0;i--){
            double lat = festivals.get(i).getLat();
            double lng = festivals.get(i).getLng();
            if(Math.abs(lat-cur_lat)<=0.035){
                list.add(new FestivalCustom(lat,lng,i));
                //festivals.remove(i);
                if(i==0) newlist = sortlng(list,festivals,newlist);
            }
            else {
                cur_lat = lat;
                newlist = sortlng(list,festivals,newlist);
                list.clear();
            }
        }
        System.out.println(newlist.size());
        festivals = newlist;
        newlist = new ArrayList<>();
        Collections.sort(festivals, new Comparator<FestivalResponse>() {
            @Override
            public int compare(FestivalResponse f1, FestivalResponse f2) {
                return Double.compare(f1.getLng(), f2.getLng());
            }
        });
        //cur_lat = 0.0;
        double cur_lng = 0.0;
        for(int i=festivals.size()-1; i>=0;i--){
            double lat = festivals.get(i).getLat();
            double lng = festivals.get(i).getLng();
            if(Math.abs(lng-cur_lng)<=0.035){
                list.add(new FestivalCustom(lat,lng,i));
                //festivals.remove(i);
                if(i==0) newlist = sortlat(list,festivals,newlist);
            }
            else {
                cur_lng = lng;
                newlist = sortlat(list,festivals,newlist);
                list.clear();
            }
        }
        System.out.println(newlist.size());
        return newlist;
    }
    //lng정렬
    private List<FestivalResponse> sortlng(List<FestivalCustom> list, List<FestivalResponse> festivals, List<FestivalResponse> newlist){
        Collections.sort(list, new Comparator<FestivalCustom>() {
            @Override
            public int compare(FestivalCustom f1, FestivalCustom f2) {
                return Double.compare(f1.getLng(), f2.getLng());
            }
        });
        double cur_lng=0.0;
        for(int j=list.size()-1; j>=0; j--){
            double lng2 = list.get(j).getLng();
            if(Math.abs(lng2-cur_lng)<=0.35){
                //festivals.remove(list.get(j).idx);
                list.remove(j);
            }
            else {
                cur_lng = lng2;
            }
        }
        for(int j=0; j< list.size(); j++){
            newlist.add(festivals.get(list.get(j).getIdx()));
        }
        return newlist;
    }
    //lat정렬
    private List<FestivalResponse> sortlat(List<FestivalCustom> list, List<FestivalResponse> festivals, List<FestivalResponse> newlist){
        Collections.sort(list, new Comparator<FestivalCustom>() {
            @Override
            public int compare(FestivalCustom f1, FestivalCustom f2) {
                return Double.compare(f1.getLat(), f2.getLat());
            }
        });
        double cur_lat=0.0;
        for(int j=list.size()-1; j>=0; j--){
            double lat2 = list.get(j).getLat();
            if(Math.abs(lat2-cur_lat)<=0.35){
                //festivals.remove(list.get(j).idx);
                list.remove(j);
            }
            else {
                cur_lat = lat2;
            }
        }
        for(int j=0; j< list.size(); j++){
            newlist.add(festivals.get(list.get(j).getIdx()));
        }
        return newlist;
    }

}
