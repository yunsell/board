package com.project.board.user.service;

import com.project.board.user.service.mapper.UserMapper;
import com.project.board.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserMapper userMapper;

    public List<UserVO> userList() throws Exception {
        return userMapper.userList();
    }
}
