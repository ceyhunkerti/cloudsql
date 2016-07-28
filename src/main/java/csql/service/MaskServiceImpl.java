package csql.service;

import csql.model.ConnectionDetail;
import csql.model.Mask;
import csql.repository.ConnectionRepository;
import csql.repository.MaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class MaskServiceImpl implements MaskService {


    private MaskRepository maskRepository;
    private ConnectionRepository connectionRepository;

    @Autowired
    public MaskServiceImpl(MaskRepository maskRepository,
                           ConnectionRepository connectionRepository)
    {
        this.maskRepository = maskRepository;
        this.connectionRepository = connectionRepository;
    }

    @Override
    public List<Mask> findMasksByConnectionId(Integer connectionId) {
        return maskRepository.findMasksByConnectionId(connectionId);
    }

    @Override
    public Collection<Mask> findAll() {
        Collection<Mask> masks =  maskRepository.findAllMasks();
        return masks;
    }

    @Override
    public Mask createMask(Mask mask) {
        Mask m = maskRepository.save(mask);
        return m;
    }

    @Override
    public void deleteMask(int id) {
        maskRepository.delete(id);
    }

    @Override
    public Mask updateMask(int id, Mask mask) {
        mask.setId(id);
        Mask m = maskRepository.save(mask);
        return m;
    }


}
