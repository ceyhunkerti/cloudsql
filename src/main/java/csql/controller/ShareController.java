package csql.controller;

import csql.model.User;
import csql.security.CSQLUserContext;
import csql.service.ShareService;
import csql.model.util.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

@Controller
@RequestMapping("/file")
public class ShareController {

    @Autowired
    private ShareService shareService;

    @Autowired
    private CSQLUserContext CSQLUserContext;

    @RequestMapping(value="/my_files/share", method = RequestMethod.POST)
    @ResponseBody
    public void share(@RequestParam String path, @RequestParam List<String> guests) throws IOException, FileNotFoundException {
        String owner = CSQLUserContext.getCurrentUser().getUsername();

        if(guests.size() > 0) {
            shareService.share(owner,path,guests);
        }else {
            shareService.removeShare(owner,path);
        }
    }

    @RequestMapping(value="/shared/others/root", method = RequestMethod.GET)
    @ResponseBody
    public TreeNode getSharedByOthers(){
        String guest = CSQLUserContext.getCurrentUser().getUsername();
        return shareService.getSharedByOthers(guest);
    }

    @RequestMapping(value="/shared/me/root", method = RequestMethod.GET)
    @ResponseBody
    public TreeNode getSharedByMe(){
        String owner = CSQLUserContext.getCurrentUser().getUsername();
        return shareService.getSharedByOwner(owner);
    }

    @RequestMapping(value="/guests", method = RequestMethod.GET)
    @ResponseBody
    public Collection<User> getGuests(@RequestParam String path){
        String owner = CSQLUserContext.getCurrentUser().getUsername();
        return shareService.getGuests(owner, path);
    }


}
