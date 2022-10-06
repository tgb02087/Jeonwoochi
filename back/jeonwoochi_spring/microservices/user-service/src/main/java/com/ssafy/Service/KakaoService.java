package com.ssafy.Service;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Entity.Type.StateType;
import com.ssafy.Domain.Entity.User;
import com.ssafy.Domain.Repository.UserRepo;
import com.ssafy.Dto.Request.UserRequest;
import com.ssafy.Dto.Response.UserLoginResponse;
import com.ssafy.Dto.Response.UserReponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import static com.ssafy.exception.NotFoundException.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoService {

    private final UserRepo userRepo;

    @Value("${client.key}")
    private String clientkey;

    // 인가코드로 토큰 받기
    public String getToken(String code) throws IOException {
        String host = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(host);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String token = "";
        try {
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true); // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + clientkey);
            sb.append("&redirect_uri=http://localhost:8000/user-service/login/kakao");
            sb.append("&code=" + code);

            bw.write(sb.toString());
            bw.flush();

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String result = "";
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("result = " + result);

            // JSON 파싱
            JSONParser parser = new JSONParser();
            JSONObject elem = (JSONObject) parser.parse(result);

            String access_token = elem.get("access_token").toString();
            String refresh_token = elem.get("refresh_token").toString();
            System.out.println("refresh_token = " + refresh_token);
            System.out.println("access_token = " + access_token);

            token = access_token;

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return token;
    }

    // 유저 정보 받기
    public UserReponse getUserInfo(String access_token) throws IOException {
        String host = "https://kapi.kakao.com/v2/user/me";
        UserReponse userReponse = null;
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + access_token);
            urlConnection.setRequestMethod("GET");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }

            System.out.println("res = " + res);

            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            JSONObject kakao_account = (JSONObject) obj.get("kakao_account");
            JSONObject properties = (JSONObject) obj.get("properties");

            String id = obj.get("id").toString();
            String nickname = properties.get("nickname").toString();
            if (kakao_account.get("age_range") == null) {
                kakao_account.put("age_range", "0");
            }
            String age_range = kakao_account.get("age_range").toString();
            String[] agearry = age_range.split("~");
            int age = Integer.parseInt(agearry[0]);

            GenderType gender = GenderType.NULL;
            if (kakao_account.get("gender") != null && kakao_account.get("gender").toString() == ("male")) {
                gender = GenderType.M;
            } else if (kakao_account.get("gender") != null && kakao_account.get("gender").toString() == ("female")) {
                gender = GenderType.F;
            }
            // String birthday = obj.get("birthday").toString();
            // System.out.println("생일"+birthday);
            userReponse = new UserReponse(id, nickname, gender, age, access_token);

            br.close();

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return userReponse;
    }

    // 회원가입 유저인지 확인
    public UserLoginResponse userchk(UserReponse userResponse) {
        //새로운 유저
        UserLoginResponse userLoginResponse = null;
        if (!userRepo.findByKakaoId(userResponse.getId()).isPresent()) {
            String kakaoid = userResponse.getId();
            String googleid = null;
            String name = userResponse.getName();
            GenderType gender = userResponse.getGender();
            int age = userResponse.getAge();
            RoleType role = RoleType.USER;
            StateType stateType = StateType.활성;
            UserRequest userRequest = new UserRequest(kakaoid, googleid, name, gender, age, role, stateType, false);
            User user = User.create(userRequest);
            userRepo.save(user);
            userLoginResponse = new UserLoginResponse(user.getId(),
                    kakaoid,googleid, name, gender, age, role, stateType, false,false);
        } else {
            User user = userRepo.findByKakaoId(userResponse.getId())
                    .orElseThrow(()-> new NotFoundException(USER_NOT_FOUND));
            userLoginResponse = new UserLoginResponse(user.getId(),
                    user.getKakaoId(),user.getGoogleId(),user.getName(),user.getGender(),user.getAge(),
                    user.getRole(),user.getStateType(),false,true);
        }
        // 토큰 재발급
        return userLoginResponse;
    }


    public String logout(String code) throws IOException {
        String host = "https://kapi.kakao.com/v1/user/logout";
        UserReponse userReponse = null;
        String id = null;
        try {
            URL url = new URL(host);

            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestProperty("Authorization", "Bearer " + code);
            urlConnection.setRequestMethod("POST");

            int responseCode = urlConnection.getResponseCode();
            System.out.println("responseCode = " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
            String line = "";
            String res = "";
            while ((line = br.readLine()) != null) {
                res += line;
            }
            System.out.println("res = " + res);
            JSONParser parser = new JSONParser();
            JSONObject obj = (JSONObject) parser.parse(res);
            id = obj.get("id").toString();

        } catch (IOException | ParseException e) {
            e.printStackTrace();
            return "로그아웃실패";
        }
        return id;
    }

    public String userDisable(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(()-> new NotFoundException(USER_NOT_FOUND));
        user.disable(StateType.비활성);
        return "회원 탈퇴 성공";
    }
}
