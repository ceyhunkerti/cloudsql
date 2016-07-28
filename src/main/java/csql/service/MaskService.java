package csql.service;

import csql.model.Mask;

import java.util.Collection;
import java.util.List;

public interface MaskService {

    public List<Mask> findMasksByConnectionId(Integer connectionId);
    public Collection<Mask> findAll();


    public Mask createMask(Mask mask);

    public void deleteMask(int id);

    public Mask updateMask(int id, Mask mask);


}
