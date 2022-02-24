package com.project.board.user.service.mapper;

import com.project.board.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserMapper {
    List<UserVO> userList() throws Exception;
}
