package org.JKDW.user.controller;


import org.JKDW.user.model.BannedUser;
import org.JKDW.user.service.BannedUserService;
import org.JKDW.websocket.model.Shout;
import org.JKDW.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/banned")
public class BannedUserController {

    @Autowired
    private BannedUserService bannedUserService;

    @Autowired
    private WebSocketService webSocketService;

    @RequestMapping(
            value = "/create/{idUserForBan}", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<BannedUser> createBanForUser(@RequestBody BannedUser bannedUser,@PathVariable("idUserForBan") Long id) {
        BannedUser createdBanForUser = bannedUserService.createBanForUser(bannedUser, id);
        webSocketService.sendNotificationToUser(bannedUser.getUserAccount().getNick(), new Shout("ban"));
        return new ResponseEntity<>(createdBanForUser, HttpStatus.CREATED);
    }

    /** W ostatniej chwili mieniłem koncepcje i inaczej ułożyłem FE przez co ta metoda jest nie wykrzystana
     * ale zostawiam ją bo może się przyda w przyszłości
     **/
    @RequestMapping(value = "/{idUserWithBan}", method = RequestMethod.DELETE)
    public ResponseEntity deleteBanForUser(@PathVariable("idUserWithBan") Long idUserWihBan) {
        bannedUserService.deleteBanForUser(idUserWihBan);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     *
     * @param username
     * @return end date ban user prohibition
     */
    @RequestMapping(value = "/account/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BannedUser> getInfoAboutBan(@PathVariable("username") String username) {
        BannedUser ban = bannedUserService.getInfoAboutBanByUsernameBannedUser(username);
        return new ResponseEntity<>(ban, HttpStatus.OK);
    }

}
