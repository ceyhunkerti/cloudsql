package csql.controller;

import csql.model.ConnectionDetail;
import csql.model.Mask;
import csql.service.MaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@Controller
public class MaskController {

    @Autowired
    MaskService maskService;

    @RequestMapping(value = "/mask", method = RequestMethod.GET)
    @ResponseBody
    public Collection<Mask> getMasks() {
        return maskService.findAll();
    }

    @RequestMapping(value = "/mask", method = RequestMethod.POST)
    @ResponseBody
    public Mask saveMask(@RequestBody Mask mask) {
        ConnectionDetail connectionDetail = mask.getConnectionDetail();
        if(connectionDetail!=null && (connectionDetail.getId()==null || connectionDetail.getId()==0) ){
            mask.setConnectionDetail(null);
        }
        return maskService.createMask(mask);
    }

    @RequestMapping(value = "/mask/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteMask(@PathVariable int id) {
        maskService.deleteMask(id);
    }

    @RequestMapping(value = "/mask/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Mask updateMask(@PathVariable int id,@RequestBody Mask mask) {

        return maskService.updateMask(id, mask);
    }

}
