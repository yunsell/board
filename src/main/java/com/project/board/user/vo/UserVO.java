package com.project.board.user.vo;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserVO {

    private Integer id;
    private String userId;
    private String userName;
    private Date createdAt;
    private Integer createdUserId;
    private Date updatedAt;
    private Integer updatedUserId;
    private Date deletedAt;
    private Integer deletedUserId;
}
