package Reto3.Reto3.servicios;

import Reto3.Reto3.entidades.Bike;
import Reto3.Reto3.entidades.Client;
import Reto3.Reto3.repositorios.RepositoryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceClient {
    @Autowired
    private RepositoryClient rc;
    public List<Client> getAll(){ return rc.getAll(); }
    public Client getClient(Integer id){
        return  rc.getClient(id).get();
    }
    public Client save(Client cli){
        return rc.save(cli);
    }
    public Client update(Client cli){ return rc.update(cli); }
    public void delete(Integer doc){ rc.deleteClient(doc); }
}
