package com.project.board.user.web;

import com.project.board.user.service.UserService;
import com.project.board.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class UserController {

    @Autowired
    public UserService userService;

    @RequestMapping(value = "/userlist", method = RequestMethod.GET, produces = "text/html")
    public String userView() {
        System.out.println("테스트");
        return "user/index";
    }

    @RequestMapping(value = "/userlist", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<UserVO> userList() throws Exception {
        System.out.println("userList");

        return userService.userList();
    }
}
