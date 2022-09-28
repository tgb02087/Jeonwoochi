package com.ssafy.Service;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Entity.User;
import com.ssafy.Domain.Repository.UserRepo;
import com.ssafy.Dto.Request.UserRequest;
import com.ssafy.Dto.Response.UserReponse;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoService {

    private final UserRepo userrepo;

    @Value("${client.key}")
    private String clientkey;

    public String getToken(String code) throws IOException {
        //인가코드로 토큰 받기
        String host = "https://kauth.kakao.com/oauth/token";
        URL url = new URL(host);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        String token = "";
        try {
            urlConnection.setRequestMethod("POST");
            urlConnection.setDoOutput(true);    // 데이터 기록 알려주기

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+clientkey);
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
        } catch (IOException e){
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return token;
    }

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
            if (kakao_account.get("gender")!=null && kakao_account.get("gender").toString()==("male")) {
                gender = GenderType.M;
            } else if (kakao_account.get("gender")!=null && kakao_account.get("gender").toString()==("female")) {
                gender = GenderType.F;
            }
            //String birthday = obj.get("birthday").toString();
            //System.out.println("생일"+birthday);
            userReponse = new UserReponse(id, nickname, gender, age,access_token);

            br.close();

        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        return userReponse;
    }
    public void userchk(UserReponse userReponse) {
        List<User> list = findById(userReponse.getId());
        User user = null;
        if(list.size()==0) {
            String kakaoid = userReponse.getId();
            String googleid = null;
            String name = userReponse.getName();
            GenderType gender = userReponse.getGender();
            int age = userReponse.getAge();
            RoleType role = RoleType.USER;
            UserRequest userRequest = new UserRequest(kakaoid,googleid,name,gender,age,role,null,false);
            user=User.create(userRequest);
            save(user);
        }
        // 토큰 재발급

    }

    public void save(User user){
        userrepo.save(user);
    }
    public User findOne(Long id){
        return userrepo.findOne(id);
    }

    public List<User> findById(String kakao_id){
        return userrepo.findById(kakao_id);
    }

    public String logout(String code) throws IOException{
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

        } catch (IOException e){
            e.printStackTrace();
        } catch (ParseException e){
            e.printStackTrace();
        }
        return id;
    }
}
