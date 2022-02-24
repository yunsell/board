package com.project.board.user.web;

import com.project.board.user.service.UserService;
import com.project.board.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    public UserService userService;

    @RequestMapping(value = "/user")
    @ResponseBody
    public List<UserVO> userList() throws Exception {

        return userService.userList();
    }
}
