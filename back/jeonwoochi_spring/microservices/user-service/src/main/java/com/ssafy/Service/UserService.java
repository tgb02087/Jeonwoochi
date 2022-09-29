package com.ssafy.Service;

import com.ssafy.Domain.Entity.User;
import com.ssafy.Domain.Repository.UserRedisRepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRedisRepo repo;

    public void addUser(){
        //User user = new User("1", "kim");
        //repo.save(user);
    }
}
